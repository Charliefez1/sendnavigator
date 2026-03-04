import { useState, useRef, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { PageOrientation } from "@/components/templates";
import { UserRound } from "lucide-react";
import { ChildProfileProvider, useChildProfile, ChildProfileState, SECTION_TITLES } from "@/contexts/ChildProfileContext";
import { sectionContent } from "@/config/child-profile-sections";
import { childVoiceQuestions } from "@/config/child-voice-questions";
import { OpeningScreen } from "@/components/child-profile/OpeningScreen";
import { SetupFlow } from "@/components/child-profile/SetupFlow";
import { ModeSelectScreen } from "@/components/child-profile/ModeSelectScreen";
import { ProfileBuilder } from "@/components/child-profile/ProfileBuilder";
import { ProfileDashboard } from "@/components/child-profile/ProfileDashboard";
import { ProfileCompactHeader } from "@/components/child-profile/ProfileCompactHeader";
import { FinalScreen } from "@/components/child-profile/FinalScreen";
import { ReportDashboard } from "@/components/child-profile/ReportDashboard";
import { SectionRegenConfirm } from "@/components/child-profile/SectionRegenConfirm";
import { ReportLoadingScreen } from "@/components/child-profile/ReportLoadingScreen";
import { generateProfilePDF } from "@/lib/generate-profile-pdf";
import { isStructuredReport } from "@/types/ai-report";
import { MINI_SECTIONS } from "@/config/mini-profile-sections";
import type { ReportMode } from "@/config/mini-profile-sections";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { normaliseCopyObject } from "@/lib/copy-standards";
import { checkReflectionIntegrity } from "@/lib/reflection-parser";

type Stage = "opening" | "setup" | "mode-select" | "builder" | "dashboard" | "final" | "report-loading" | "report-preview";

const TEST_DATA: ChildProfileState = {
  reportMode: "full",
  setup: {
    childName: "Jake",
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO"],
    reason: "Preparing for an EHCP assessment or review",
  },
  sections: {
    // ── Section 1: Environment — MODERATE ──
    0: {
      answers: {
        classroom_description: "His classroom is open plan with about 30 children. He sits near the door which helps him feel less boxed in.",
        after_school: "Usually quiet and withdrawn for about an hour after school. Needs a snack and some screen time before he can talk about his day.",
        transitions: "Sometimes difficult",
        settled_environment: "Grandma's house — quiet, predictable, one-to-one attention. He also does well in the car.",
        home_predictability: "Generally predictable and calm",
        cv_classroom_feel: "It is really loud sometimes and I cannot think properly.",
        cv_calm_place: "The library. It is quiet and no one bothers me there.",
      },
      reflection: "School environment clearly affects him but he has found some coping strategies. Home is generally predictable.",
    },
    // ── Section 2: People — LOW-MODERATE (brief answers) ──
    1: {
      answers: {
        safe_person: "His teaching assistant, Mrs Davies. She speaks quietly and gives him space.",
        friendships: "He has one close friend, Tom. Other friendships come and go.",
        age_preference: "Older children or adults",
        cv_comfortable_person: "Mrs Davies. She does not shout.",
      },
      reflection: "",
    },
    // ── Section 3: Settings — LOW (sparse) ──
    2: {
      answers: {
        structure_preference: "Better in structured time",
        academic_pace: "Varies significantly",
        cv_favourite_part: "DT. I get to build things.",
      },
      reflection: "",
    },
    // ── Section 4: Nervous System — HIGH (keep extreme) ──
    3: {
      answers: {
        dysregulation_description: "When overwhelmed he shuts down completely — goes nonverbal, hides under furniture, covers ears. Can last 20 minutes to 2 hours. Afterwards he is exhausted and often tearful.",
        early_warning_signs: "Starts humming loudly, pacing, picking at skin on fingers. Gets very rigid about small things.",
        recovery_time: "Several hours",
        dysregulation_patterns: "Worse on Mondays and after PE. Better on days with art or music. Much worse when routine changes without warning.",
        helps_or_worsens: "Pressure (weighted blanket), dim lights, and being left alone help. Talking to him, touching him, or asking questions makes it worse.",
        shame_response: "He apologises repeatedly afterwards, says he is broken, asks if we still love him.",
        cv_upset_body: "My chest gets really tight and my hands go tingly. Sometimes I cannot see properly.",
        cv_calmer: "Being under my blanket with my cat. Nobody talking to me.",
      },
      reflection: "His nervous system is clearly under significant strain. The school day depletes him and recovery takes the whole evening.",
    },
    // ── Section 5: Trauma — EMPTY (no data path) ──
    4: {
      answers: {},
      reflection: "",
    },
    // ── Section 6: Sensory — MODERATE ──
    5: {
      answers: {
        noise_sensitivity: "Assembly is uncomfortable. Hand dryers bother him. The dinner hall can be hard on noisy days.",
        texture_distress: "Prefers soft fabrics. Tags need to be removed. School uniform can be a struggle some mornings.",
        pain_temperature: "Sometimes",
        fidgeting: "He moves around a fair amount — rocks on his chair, chews his collar. It seems to help him concentrate.",
        movement_seeking: "Both at different times",
        interoception: "Sometimes",
        cv_bothering_sound: "The hand dryer. And when lots of people talk at the same time in the dinner hall.",
      },
      reflection: "",
    },
    // ── Section 7: Executive Function — MODERATE-HIGH ──
    6: {
      answers: {
        task_initiation: "He struggles to start tasks independently, especially ones he finds boring. Needs a prompt or someone sitting with him.",
        knowing_doing_gap: "Yes, frequently",
        multi_step_instructions: "Struggles with more than two steps",
        time_blindness: "Sometimes",
        variable_ability: "Some days he can write a whole page easily. Other days he can barely write his name. Teachers find this confusing.",
        cv_lots_instructions: "I forget what I am supposed to do and then I just sit there.",
        cv_cannot_start: "I want to do it but nothing happens.",
      },
      reflection: "The gap between what he knows and what he can do is noticeable. School sometimes interprets this as laziness.",
    },
    // ── Section 8: Sleep — LOW (sparse) ──
    7: {
      answers: {
        sleep_onset: "About 30 minutes",
        sleep_hours: "About eight hours most nights.",
        busy_mind: "Sometimes",
      },
      reflection: "",
    },
    // ── Section 9: Dopamine — EMPTY (insufficient data path) ──
    8: {
      answers: {},
      reflection: "",
    },
    // ── Section 10: Masking — VERY HIGH (keep extreme) ──
    9: {
      answers: {
        school_home_difference: "Yes, significantly different",
        after_school_collapse: "Complete meltdown within 10 minutes of getting home. Throws bag, screams, sometimes hits. This is the real him — school gets the performance.",
        post_school_exhaustion: "Yes, they need significant time to recover",
        teacher_discrepancy: "Yes, regularly",
        suppressed_distress: "He holds everything in all day. Teachers say he is fine. He is not fine.",
        compliance_avoidance: "Yes, frequently",
        cv_act_differently: "I pretend to be normal at school. It is really tiring.",
        cv_tiring_school: "By the end of the day I feel like I have run a marathon but nobody can tell.",
      },
      reflection: "The school keeps telling us he is fine. He is not fine. He is performing.",
    },
    // ── Section 11: Communication — LOW ──
    10: {
      answers: {
        response_time: "Sometimes",
        reading_emotions: "Sometimes",
        literal_language: "Takes things quite literally sometimes — idioms can confuse him.",
        cv_extra_time: "Sometimes I need to think for a long time before I can answer.",
      },
      reflection: "",
    },
    // ── Section 12: Behaviour — MODERATE ──
    11: {
      answers: {
        recent_incident: "Threw a chair in class last week after being told to redo his work. Teacher saw defiance. I saw a child who had been masking all day and reached his limit.",
        before_incident: "It was after lunch. He had already been told off twice for fidgeting. The work redo was the final straw.",
        child_intent: "He was not trying to hurt anyone. He was overwhelmed.",
        behaviour_patterns: "Almost always in the afternoon, almost always on days with changes to routine or after PE.",
        cv_what_starts_it: "When people keep telling me to do things and I cannot do any more.",
      },
      reflection: "",
    },
    // ── Section 13: Identity — EMPTY ──
    12: {
      answers: {},
      reflection: "",
    },
    // ── Section 14: Strengths — MODERATE (positive, not extreme) ──
    13: {
      answers: {
        genuine_strengths: "Incredibly kind and empathetic. Notices when other children are upset before anyone else does.",
        deep_focus: "Can spend 3 hours building complex Lego sets without a break. Knows a lot about marine biology.",
        lights_them_up: "The ocean, sharks, David Attenborough, building things with his hands.",
        cv_really_good_at: "I am really good at knowing about sharks and I can build anything with Lego.",
        cv_lose_track_time: "When I am reading about the ocean I forget about everything else.",
      },
      reflection: "",
    },
    // ── Section 15: Developmental History — LOW (sparse) ──
    14: {
      answers: {
        early_concerns: "Speech was slightly delayed. He did not walk until 16 months.",
        early_play: "He played alone mostly. Elaborate imaginative worlds with his toys.",
      },
      reflection: "",
    },
    // ── Section 16: Family System — EMPTY ──
    15: {
      answers: {},
      reflection: "",
    },
    // ── Section 17: Physical Health — EMPTY ──
    16: {
      answers: {},
      reflection: "",
    },
    // ── Section 18: School Fit — LOW ──
    17: {
      answers: {
        adjustments_followed_through: "Suggested but inconsistently applied",
        school_clarity: "Vaguely",
      },
      reflection: "",
    },
    // ── Section 19: Time and Transitions — MODERATE ──
    18: {
      answers: {
        time_management: "Sometimes",
        transition_difficulty: "Yes, often",
        change_warning: "Yes, usually",
      },
      reflection: "",
    },
    // ── Section 20: Demand Avoidance — LOW (sparse) ──
    19: {
      answers: {
        demand_avoidance: "Sometimes",
        choices_vs_instructions: "Yes, somewhat better",
      },
      reflection: "",
    },
    // ── Section 21: Hyperfocus — MODERATE ──
    20: {
      answers: {
        hyperfocus_subject: "Lego. He can build for a couple of hours without noticing the time.",
        interest_driven_focus: "Yes, noticeably",
        cv_hours_not_bored: "Lego. I could do it for hours.",
      },
      reflection: "",
    },
    // ── Section 22: Emotional Intensity — MODERATE ──
    21: {
      answers: {
        emotional_intensity: "Sometimes",
        anger_speed: "Sometimes",
        reaction_to_criticism: "He can get upset by feedback but usually recovers within half an hour.",
        cv_anger_nowhere: "Sometimes it feels like it comes from nowhere but usually something happened earlier.",
      },
      reflection: "",
    },
  },
  finalStatement: "Jake is a kind, creative boy who needs the people around him to see beyond the behaviour. We are not asking for special treatment — just understanding.",
};

function buildProfileText(state: ChildProfileState): string {
  const lines: string[] = [];
  lines.push(`Child's name: ${state.setup.childName || "Not provided"}`);
  lines.push(`Reason for building this profile: ${state.setup.reason || "Not provided"}`);
  lines.push(`Who this will be shared with: ${state.setup.sharedWith.length > 0 ? state.setup.sharedWith.join(", ") : "Not specified"}`);
  lines.push("");

  SECTION_TITLES.forEach((title, index) => {
    const section = state.sections[index];
    if (!section) return;
    const content = sectionContent[index];
    const parentAnswers: string[] = [];
    const childAnswers: string[] = [];

    if (content) {
      content.questions.forEach((q) => {
        const val = section.answers?.[q.id];
        const displayValue = Array.isArray(val) ? val.join(", ") : val;
        if (displayValue && displayValue.trim()) {
          parentAnswers.push(`${q.label}\n${displayValue.trim()}`);
        }
      });
    }

    const cvQuestions = childVoiceQuestions[index];
    if (cvQuestions) {
      cvQuestions.forEach((q) => {
        const val = section.answers?.[q.id];
        const strVal = Array.isArray(val) ? val.join(", ") : val;
        if (strVal && strVal.toString().trim()) {
          childAnswers.push(`${q.label}\n${strVal.toString().trim()}`);
        }
      });
    }

    const hasContent = parentAnswers.length > 0 || childAnswers.length > 0 || section.reflection.trim().length > 0;
    if (!hasContent) return;

    lines.push(`Section ${index + 1}: ${title}`);
    if (parentAnswers.length > 0) {
      lines.push("Parent answers:");
      lines.push(parentAnswers.join("\n\n"));
    }
    if (childAnswers.length > 0) {
      lines.push("Child answers (in the child's own words):");
      lines.push(childAnswers.join("\n\n"));
    }
    if (section.reflection.trim()) {
      lines.push(`Closing reflection: ${section.reflection.trim()}`);
    }
    lines.push("");
  });

  if (state.finalStatement.trim()) {
    lines.push(`Final closing statement from the parent: ${state.finalStatement.trim()}`);
  }
  return lines.join("\n");
}

function ProfileContent({ stage, setStage }: { stage: Stage; setStage: (s: Stage) => void }) {
  const [initialSection, setInitialSection] = useState(0);
  const { loadState, state, updateAiReport, clearAiReport, setReportMode, setAccessCode, markClean } = useChildProfile();
  const pendingEmailRef = useRef<string | undefined>();

  // Section regeneration state
  const [regenState, setRegenState] = useState<{
    sectionIndex: number;
    loading: boolean;
    oldReflection: string;
    newReflection?: string;
  } | null>(null);

  // Get the active section indices based on report mode
  const activeSections = state.reportMode === "mini"
    ? [...MINI_SECTIONS]
    : SECTION_TITLES.map((_, i) => i);

  const handleRestore = (data: { profile_data: any; stage: string; active_section: number; report_mode?: string; ai_report?: any; access_code?: string }) => {
    const profileData = { ...data.profile_data, reportMode: data.report_mode || data.profile_data?.reportMode || "full" };
    loadState(profileData);
    if (data.ai_report) {
      updateAiReport(data.ai_report);
    }
    if (data.access_code) {
      setAccessCode(data.access_code);
    }
    markClean();
    setInitialSection(data.active_section || 0);
    if (data.stage === "builder") {
      setStage("builder");
    } else {
      setStage("setup");
    }
  };

  const handleLoadTestData = () => {
    loadState(TEST_DATA);
    setStage("builder");
  };

  const handleModeSelect = (mode: ReportMode) => {
    setReportMode(mode);
    setStage("builder");
  };

  const handleDownloadPDF = async () => {
    if (!state.aiReport) return;
    const aiReport = state.aiReport.structured && isStructuredReport(state.aiReport.structured)
      ? state.aiReport.structured
      : state.aiReport.report;
    await generateProfilePDF({ state, aiReport });
  };

  const handleGenerateReport = async (email?: string) => {
    // If report is already cached, skip straight to preview
    if (state.aiReport) {
      setStage("report-preview");
      return;
    }

    pendingEmailRef.current = email;
    setStage("report-loading");

    try {
      const profileText = buildProfileText(state);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180_000);

      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-profile-report",
        { body: { profileText }, signal: controller.signal as any }
      );

      clearTimeout(timeoutId);

      if (fnError) throw new Error(fnError.message || "Failed to generate report");
      if (data?.error) throw new Error(data.error);

      const structured = data.structured && isStructuredReport(data.structured)
        ? normaliseCopyObject(data.structured)
        : undefined;

      updateAiReport(normaliseCopyObject({
        generatedAt: new Date().toISOString(),
        model: "google/gemini-3-flash-preview",
        report: data.report,
        structured,
      }));

      // Dev-mode integrity check for section heading completeness
      if (import.meta.env.DEV && structured?.sectionInsights) {
        const warnings = checkReflectionIntegrity(structured.sectionInsights);
        if (warnings.length > 0) {
          console.warn("[Report Integrity]", warnings.length, "issues found:");
          warnings.forEach((w) => console.warn("  •", w));
        }
      }

      setStage("report-preview");

      // Send email in background if provided
      if (pendingEmailRef.current) {
        supabase.functions
          .invoke("email-profile-report", {
            body: {
              email: pendingEmailRef.current,
              childName: state.setup.childName || "your child",
              report: data.report,
              structured,
            },
          })
          .then(({ error }) => {
            if (error) {
              console.error("Email send failed:", error);
              toast({ title: "Email could not be sent", description: "Your report is still available to download.", variant: "destructive" });
            } else {
              toast({ title: "Report sent to your email", description: `A copy has been sent to ${pendingEmailRef.current}.` });
            }
          });
      }
    } catch (e) {
      console.error("Report generation failed:", e);
      setStage("final");
      toast({
        title: "Report generation failed",
        description: e instanceof Error ? e.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateSection = async (sectionIndex: number) => {
    if (!state.aiReport?.structured) return;

    const structured = state.aiReport.structured as any;
    const existingInsight = structured.sectionInsights?.find(
      (s: any) => s.sectionIndex === sectionIndex
    );
    const oldReflection = existingInsight?.reflection || "";

    setRegenState({ sectionIndex, loading: true, oldReflection });

    try {
      // Build section text from the profile data
      const section = state.sections[sectionIndex];
      const content = sectionContent[sectionIndex];
      const lines: string[] = [];

      if (content && section) {
        content.questions.forEach((q) => {
          const val = section.answers?.[q.id];
          const displayValue = Array.isArray(val) ? val.join(", ") : val;
          if (displayValue?.trim()) lines.push(`${q.label}: ${displayValue.trim()}`);
        });
      }

      const cvQuestions = childVoiceQuestions[sectionIndex];
      if (cvQuestions && section) {
        cvQuestions.forEach((q) => {
          const val = section.answers?.[q.id];
          const strVal = Array.isArray(val) ? val.join(", ") : val;
          if (strVal?.toString().trim()) lines.push(`Child voice - ${q.label}: ${strVal.toString().trim()}`);
        });
      }

      if (section?.reflection?.trim()) lines.push(`Closing reflection: ${section.reflection.trim()}`);

      const childContext = `Child: ${state.setup.childName || "Not named"}. Reason: ${state.setup.reason || "Not provided"}.`;

      const { data, error: fnError } = await supabase.functions.invoke("regenerate-section", {
        body: {
          sectionIndex,
          sectionTitle: SECTION_TITLES[sectionIndex],
          sectionText: lines.join("\n"),
          childContext,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setRegenState({
        sectionIndex,
        loading: false,
        oldReflection,
        newReflection: data.reflection || "",
      });
    } catch (e) {
      console.error("Section regeneration failed:", e);
      setRegenState(null);
      toast({
        title: "Regeneration failed",
        description: e instanceof Error ? e.message : "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleAcceptRegen = () => {
    if (!regenState?.newReflection || !state.aiReport?.structured) {
      setRegenState(null);
      return;
    }

    const structured = { ...state.aiReport.structured } as any;
    const insights = [...(structured.sectionInsights || [])];
    const idx = insights.findIndex((s: any) => s.sectionIndex === regenState.sectionIndex);
    if (idx !== -1) {
      insights[idx] = { ...insights[idx], reflection: normaliseCopyObject(regenState.newReflection) };
    }
    structured.sectionInsights = insights;

    updateAiReport({
      ...state.aiReport,
      structured,
    });

    setRegenState(null);
    toast({ title: "Section updated", description: "The new AI insight has been applied." });
  };

  // Hide dashboard button during report loading
  const showDashboard = stage !== "report-loading";

  return (
    <>
      {/* Compact header when past opening */}
      {stage !== "opening" && (
        <ProfileCompactHeader
          childName={state.setup?.childName}
          onViewDashboard={() => setStage("dashboard")}
          showDashboard={showDashboard}
        />
      )}

      {stage === "opening" && (
        <OpeningScreen
          onStart={() => setStage("setup")}
          onRestore={handleRestore}
          onLoadTestData={handleLoadTestData}
        />
      )}
      {stage === "setup" && <SetupFlow onComplete={() => setStage("mode-select")} />}
      {stage === "mode-select" && <ModeSelectScreen onSelect={handleModeSelect} />}
      {stage === "builder" && (
        <ProfileBuilder
          initialSection={initialSection}
          activeSections={activeSections}
          onViewDashboard={() => setStage("dashboard")}
          onShowFinal={() => setStage("final")}
          onUpgradeToFull={() => {
            setReportMode("full");
          }}
        />
      )}
      {stage === "dashboard" && (
        <ProfileDashboard
          onBack={() => setStage("builder")}
          onNavigateToSection={(index) => {
            setInitialSection(index);
            setStage("builder");
          }}
          onGenerateReport={() => setStage("final")}
        />
      )}
      {stage === "final" && (
        <FinalScreen
          onGenerate={handleGenerateReport}
          onViewDashboard={() => setStage("dashboard")}
          onBackToBuilder={() => setStage("builder")}
        />
      )}
      {stage === "report-loading" && (
        <ReportLoadingScreen />
      )}
      {stage === "report-preview" && (
        <ReportDashboard
          onDownloadPDF={handleDownloadPDF}
          onBackToEdit={() => setStage("final")}
          onRegenerate={() => {
            clearAiReport();
            setStage("final");
          }}
          onEditSection={(sectionIndex) => {
            setInitialSection(sectionIndex);
            setStage("builder");
          }}
          onRegenerateSection={handleRegenerateSection}
        />
      )}

      {/* Section regeneration confirm dialog */}
      {regenState && (
        <SectionRegenConfirm
          sectionTitle={SECTION_TITLES[regenState.sectionIndex]}
          oldReflection={regenState.oldReflection}
          newReflection={regenState.newReflection || ""}
          loading={regenState.loading}
          onAccept={handleAcceptRegen}
          onReject={() => setRegenState(null)}
        />
      )}
    </>
  );
}

const MyChildProfile = () => {
  const [stage, setStageRaw] = useState<Stage>("opening");

  const setStage = useCallback((s: Stage) => {
    setStageRaw(s);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, []);

  return (
    <Layout>
      <SEOHead
        title="My Child: A Profile - SEND Reform Navigator"
        description="Build a personalised profile document about your neurodivergent child. Download as PDF. Nothing is stored."
        path="/my-child-profile"
      />
      {stage === "opening" && (
        <PageOrientation
          icon={UserRound}
          sectionLabel="My Child: A Profile"
          title="My Child: A Profile"
          description="22 guided sections, an at-a-glance dashboard, a structured AI report you can preview in your browser, and a downloadable PDF. Nothing is stored."
          accentColor="hsl(42 87% 50%)"
          showSearch={false}
        />
      )}
      <ChildProfileProvider>
        <ProfileContent stage={stage} setStage={setStage} />
      </ChildProfileProvider>
    </Layout>
  );
};

export default MyChildProfile;
