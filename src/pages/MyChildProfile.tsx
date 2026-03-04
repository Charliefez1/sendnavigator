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

type Stage = "opening" | "setup" | "mode-select" | "builder" | "dashboard" | "final" | "report-loading" | "report-preview";

const TEST_DATA: ChildProfileState = {
  reportMode: "full",
  setup: {
    childName: "Jake",
    filledBy: "A parent or carer",
    sharedWith: ["Class teacher", "SENCO", "GP or paediatrician"],
    reason: "Preparing for an EHCP assessment or review",
  },
  sections: {
    // Section 1: Environment
    0: {
      answers: {
        classroom_description: "His classroom is open plan with about 30 children. The noise level is high, especially during transitions. Fluorescent lights. He sits near the door which means constant movement past him.",
        after_school: "He comes home like a coiled spring. Sometimes he is silent and goes straight to his room. Other days he explodes within minutes of walking through the door.",
        transitions: "Almost always difficult",
        settled_environment: "He is calmest in his bedroom with the curtains drawn and his weighted blanket. He also does well in small quiet spaces like the car.",
        home_predictability: "Generally predictable and calm",
        // Child voice
        cv_classroom_feel: "It feels like everyone is shouting even when they are not. My head gets really buzzy and I cannot think properly.",
        cv_calm_place: "The library. It is quiet and no one bothers me there.",
        cv_hardest_moving: "When the bell goes and everyone rushes. I do not know where to go and people bump into me.",
      },
      reflection: "We have tried to make home as calm as possible but the school environment seems to undo all of it by 3pm.",
    },
    // Section 2: People
    1: {
      answers: {
        safe_person: "His Year 3 teaching assistant, Mrs Davies. She speaks quietly, gives him space, and does not make a big deal of things. He says she gets it.",
        trigger_adult: "The head of year. Jake says he shouts a lot and makes examples of children in front of the class. Jake shuts down completely around him.",
        friendships: "He has one close friend, Tom. They have been friends since reception. Other friendships come and go. He finds groups overwhelming.",
        age_preference: "Older children or adults",
        friendship_breakdown: "He had a falling out with a group of boys last year. They excluded him from games for weeks. He stopped eating lunch and started hiding in the toilets.",
        compliance_in_friendships: "Yes, often",
        // Child voice
        cv_comfortable_person: "Mrs Davies. She does not shout and she lets me have my fidget without telling me off.",
        cv_nervous_person: "Yes. I do not want to say who but they make me feel like I am always in trouble.",
      },
      reflection: "The adults around Jake make a bigger difference than any strategy or programme.",
    },
    // Section 3: Settings
    2: {
      answers: {
        school_match: "The academic expectations are fine but the behavioural expectations are rigid. There is no flexibility for children who process differently. He thrives in DT and science but struggles with the pace of literacy lessons.",
        structure_preference: "Better in structured time",
        academic_pace: "Varies significantly",
        outside_activities: "He goes to a Lego club on Wednesdays and swimming on Saturdays. He is exhausted after swimming but Lego club energises him.",
        home_school_consistency: "At home we use low demand approaches. School uses consequences and traffic light systems. The gap is enormous.",
        // Child voice
        cv_favourite_part: "DT. I get to build things and no one tells me I am doing it wrong.",
        cv_change_one_thing: "The noise. I would make it quieter.",
      },
      reflection: "The school is not a bad school. It is just not the right fit for Jake right now.",
    },
    // Section 4: Nervous System and Dysregulation
    3: {
      answers: {
        dysregulation_description: "It starts with pacing. Then he gets louder. His voice goes higher. He starts repeating himself. If no one intervenes at that point he throws things, hits walls, and screams. Afterwards he is exhausted and deeply ashamed.",
        early_warning_signs: "He picks at his fingers. He starts talking very fast. He gets fixated on something being unfair. His face goes red before anything else happens.",
        recovery_time: "Several hours",
        dysregulation_patterns: "Almost always after school. Rarely at weekends unless plans change unexpectedly. Much worse on Mondays and after PE.",
        helps_or_worsens: "Space helps. Silence helps. His weighted blanket. What makes it worse is being told to calm down, being touched, or being asked what is wrong before he is ready.",
        shame_response: "He cries afterwards and says he is broken. He has said he wishes he was not alive. We take that very seriously.",
        // Child voice
        cv_upset_body: "My chest goes tight and my hands feel like they are buzzing. Everything goes loud inside my head.",
        cv_calmer: "My weighted blanket. Being on my own. Sometimes squeezing something really hard.",
      },
      reflection: "This is the thing that worries us most. He is not a violent child. He is a child in pain.",
    },
    // Section 5: Trauma
    4: {
      answers: {
        medical_experiences: "He had grommets fitted at age 3. The hospital experience was frightening for him and he still becomes distressed in medical settings.",
        school_trauma: "He was shouted at in front of the whole class in Year 2 for not sitting still. He still talks about it. He was also excluded for a day in Year 3 which he experienced as abandonment.",
        bullying: "A group of boys called him weird for two terms. The school said it was just teasing. He stopped wanting to go to school.",
        family_change: "His parents separated when he was 5. He handled it quietly at the time but his sleep deteriorated significantly and has never fully recovered.",
        hypervigilance: "Yes, clearly",
      },
      reflection: "These experiences have shaped how he responds to the world. They need to be part of the picture.",
    },
    // Section 6: Sensory Processing
    5: {
      answers: {
        noise_sensitivity: "He cannot tolerate hand dryers, assembly hall noise, or the dinner hall. He covers his ears and hunches over.",
        texture_distress: "He will only wear soft joggers. Tags must be removed from everything. He gags at certain food textures.",
        pain_temperature: "Yes, clearly",
        fidgeting: "Constantly. He rocks on his chair, chews his collar, clicks pens. Teachers tell him to stop but it gets worse when he tries.",
        movement_seeking: "Seeks movement actively",
        interoception: "Yes, regularly",
        sensory_seeking: "He loves his weighted blanket, tight hugs, trampolining, and very loud music through headphones.",
        // Child voice
        cv_bothering_sound: "The hand dryer in the boys toilets. It sounds like it is inside my head. I hold it until I get home sometimes.",
        cv_hate_wearing: "Anything scratchy. School trousers are the worst. And socks with seams.",
        cv_fidget: "Yes. If I cannot fidget I feel like I am going to burst. My body needs to move.",
      },
      reflection: "His sensory needs are significant and mostly unmet at school.",
    },
    // Section 7: Executive Function
    6: {
      answers: {
        task_initiation: "He cannot start anything without someone sitting next to him. Even brushing his teeth needs a prompt most days.",
        knowing_doing_gap: "Yes, frequently",
        multi_step_instructions: "Struggles with more than two steps",
        time_blindness: "Yes, regularly",
        variable_ability: "Massively. Some days he writes a whole page. Other days he cannot pick up the pencil. Same child, same task, completely different outcome.",
        procrastination: "Homework is a battle every single night. He knows what he needs to do. He just cannot start.",
        // Child voice
        cv_lots_instructions: "I forget the first thing by the time they say the last thing. Then I just sit there because I do not know which bit to do.",
        cv_cannot_start: "Yes. All the time. I know what I need to do but my body will not do it. It is really annoying.",
      },
      reflection: "The school sees inconsistency as a choice. We see it as evidence that something else is going on.",
    },
    // Section 8: Sleep
    7: {
      answers: {
        sleep_onset: "Over an hour",
        night_waking: "He wakes two or three times a week. Usually between 2 and 4am. Sometimes he is awake for over an hour.",
        bedtime_anxiety: "Yes, regularly",
        sleep_hours: "About six to seven hours on a school night. Sometimes less.",
        sleep_impact: "After a good night he is a different child. Calmer, funnier, more flexible. After a bad night everything is harder.",
        busy_mind: "Yes, regularly",
      },
      reflection: "Sleep is the foundation and it is crumbling. Everything else gets worse when he is tired.",
    },
    // Section 9: Dopamine Regulation
    8: {
      answers: {
        novelty_seeking: "Yes, frequently",
        screen_removal: "It triggers the worst meltdowns. It is as if someone has physically taken something from him. The reaction is immediate and intense.",
        effortful_tasks: "Yes, frequently",
        risk_taking: "He climbs everything. He has fallen from height three times. He does not seem to register danger until after the fact.",
        stimulation_need: "He needs noise or movement constantly. Silence makes him anxious. He hums, taps, or moves even in his sleep.",
        // Child voice
        cv_bored_quickly: "Yes. So quickly. My brain needs something to do or it starts making stuff up. That is when I get in trouble.",
        cv_hard_to_stop: "Lego. And my tablet. Once I start I cannot stop even if I want to.",
      },
      reflection: "His need for stimulation is not greed or bad behaviour. It is his brain trying to regulate itself.",
    },
    // Section 10: Masking
    9: {
      answers: {
        school_home_difference: "Yes, significantly different",
        after_school_collapse: "Every single day. The moment he sees me his face changes. By the time we are in the car he is either sobbing or screaming.",
        post_school_exhaustion: "Yes, they need significant time to recover",
        teacher_discrepancy: "Yes, regularly",
        suppressed_distress: "Yes. At school he is quiet and compliant. At home he tells us he spent all day trying not to cry.",
        compliance_avoidance: "Yes, frequently",
        // Child voice
        cv_act_differently: "Yes. At school I pretend to be normal. At home I can be me. Being normal is really tiring.",
        cv_tiring_school: "Yes. It is like my brain is running really fast all day and when I get home it just stops.",
      },
      reflection: "The school keeps telling us he is fine. He is not fine. He is performing.",
    },
    // Section 11: Communication
    10: {
      answers: {
        response_time: "Yes, noticeably",
        literal_language: "He takes everything literally. Sarcasm confuses him. He once got very upset when a teacher said it is raining cats and dogs because he thought she was being stupid.",
        expressing_feelings: "He cannot name feelings in the moment. They come out as behaviour. Hours later he can sometimes explain what happened.",
        reading_emotions: "Sometimes",
        social_cues: "He does not notice when someone wants to end a conversation. He will keep talking about Lego until someone physically walks away.",
        social_misunderstanding: "He told a joke that the other children found offensive. He genuinely did not understand why they were upset. He thought it was funny because it rhymed.",
        // Child voice
        cv_extra_time: "Yes. Sometimes people talk really fast and I am still thinking about the thing before.",
        cv_right_words: "Yes. The feelings are there but the words are not. It is like they are stuck.",
      },
      reflection: "His language is strong but his social communication is a completely separate challenge.",
    },
    // Section 12: Behaviour
    11: {
      answers: {
        recent_incident: "Last Tuesday he threw a chair in class. The teacher had moved him away from his friend without warning during a group task. He felt singled out and humiliated.",
        before_incident: "He had PE that morning which always dysregulates him. He had not eaten his lunch. The classroom was noisy.",
        child_intent: "He was trying to say this is not fair and I cannot cope. He did not have the words so his body took over.",
        behaviour_patterns: "Almost always after PE, during literacy, or when routines change without warning. Always worse on Mondays.",
        adult_response: "He gets moved to red on the traffic light. Everyone sees. He says it makes him want to disappear.",
        makes_sense_to_you: "The chair throwing makes complete sense to us. He was overwhelmed, hungry, dysregulated, and then publicly shamed. Of course he reacted.",
        // Child voice
        cv_what_starts_it: "Usually when something feels unfair or when someone shouts. I feel hot inside and then I cannot stop.",
        cv_adults_better_worse: "When they talk quietly and do not make everyone look at me it helps. When they shout or put me on red it makes everything worse.",
      },
      reflection: "We need people to stop seeing behaviour and start seeing distress.",
    },
    // Section 13: Identity and Self Concept
    12: {
      answers: {
        awareness_of_difference: "Yes, clearly aware",
        shame_frustration: "He says he is stupid and broken. He compares himself to other children constantly. He has asked why he cannot just be normal.",
        strengths_belief: "He knows he is good at building things but he does not think that counts because it is not academic.",
        belonging: "He feels like he belongs at home and with Tom. He does not feel like he belongs at school or in his class.",
        self_talk: "He calls himself dumb, weird, and annoying. We try to counter it but school reinforces it daily.",
        // Child voice
        cv_brain_different: "Yes. My brain is like a browser with too many tabs open. Everyone else seems to only have one.",
        cv_good_at: "Building things. I can look at something and know how it works. I made a working crane out of Lego last week.",
      },
      reflection: "His self-concept is being damaged and that worries us more than any academic outcome.",
    },
    // Section 14: Strength Profile
    13: {
      answers: {
        genuine_strengths: "He is incredibly creative. He builds extraordinary things with Lego. He understands mechanical systems intuitively. He has an exceptional memory for facts he cares about.",
        deep_focus: "Engineering, mechanics, and spatial reasoning. He can look at a flat-pack furniture diagram and build it faster than most adults.",
        lights_them_up: "Lego, engineering, how things work, space, and dinosaurs. He can talk about these for hours with genuine expertise.",
        others_notice: "His grandfather says he has the mind of an engineer. His Lego club leader says he is the most creative child she has ever worked with.",
        unrecognised_strength: "His verbal reasoning is exceptional when he is calm. But school never sees him calm.",
        // Child voice
        cv_really_good_at: "Building things. I can make anything out of Lego. I designed my own set with proper instructions and everything.",
        cv_lose_track_time: "Lego. I can do it for hours and hours. Mum has to tell me to eat.",
        cv_teachers_knew: "I wish they knew I am not stupid. I just cannot do things the way they want me to.",
      },
      reflection: "Everyone focuses on what he cannot do. No one asks what he can.",
    },
    // Section 15: Developmental History
    14: {
      answers: {
        early_concerns: "Speech was slightly delayed. He did not walk until 16 months. Feeding was difficult, he was very selective from weaning. Sleep has always been a challenge.",
        language_development: "First words at 14 months. Sentences by 2. Language itself was not the issue. It was the social use of language that was different.",
        early_play: "He played alone mostly. Elaborate imaginative worlds with his toys. He lined things up a lot. He did not engage in cooperative play until school.",
        early_medical: "Grommets at 3. Febrile convulsions at 18 months. Otherwise physically healthy.",
        early_concerns_raised: "Health visitor noted he was not pointing at 12 months. Nursery flagged difficulty with group activities at 3. No referral was made at either point.",
      },
      reflection: "Looking back the signs were there very early. We just did not know what we were looking at.",
    },
    // Section 16: Family System
    15: {
      answers: {
        stress_level: "Significantly high",
        family_neurodivergence: "His dad has ADHD diagnosed in adulthood. His maternal grandmother is almost certainly autistic. His younger sister is being monitored for similar traits.",
        child_awareness_pressures: "He picks up on everything. If I am stressed he knows before I do. He tries to look after me which breaks my heart.",
        support_network: "My mum helps with school pickups. I have one friend who truly understands. Beyond that it is just me.",
        family_context: "We are a single parent household. I work part time. The financial pressure is significant. I am doing my best.",
      },
      reflection: "This family is holding together through sheer determination. We need support, not judgement.",
    },
    // Section 17: Physical Health
    16: {
      answers: {
        blood_tests: "Yes, recently checked",
        chronic_conditions: "He has constipation which is partly linked to interoception difficulties. He also has eczema which flares with stress.",
        puberty_hormones: "Not yet in puberty but we are monitoring for early signs given the emotional intensity.",
        ongoing_pain: "He sometimes complains of stomach aches which we think are anxiety-related. The GP agrees.",
        vision_hearing: "Within the last year",
      },
      reflection: "His physical health is mostly managed but the constipation and stomach aches need to be understood as part of the bigger picture.",
    },
    // Section 18: School Fit vs Child Deficit
    17: {
      answers: {
        adjustments_tried: "They tried a visual timetable for two weeks then stopped. He had a wobble cushion for a term. A quiet space was mentioned but never materialised.",
        adjustments_followed_through: "Suggested but inconsistently applied",
        school_clarity: "Vaguely",
        assessment_motivation: "Both",
        child_voice: "No",
      },
      reflection: "The school has tried a few things but nothing has been sustained or properly evaluated.",
    },
    // Section 19: Time, Transitions, and Future Blindness
    18: {
      answers: {
        time_management: "Yes, regularly",
        transition_difficulty: "Yes, almost always",
        change_warning: "Yes, always",
        school_day_rhythm: "Assembly is hard. The transition from break to class is hard. The end of the day is hard because he knows the collapse is coming.",
        future_preparation: "He cannot pack his bag the night before. He cannot prepare for a test. The future does not feel real to him until it arrives.",
      },
      reflection: "Time is genuinely different for him. It is not laziness. It is neurology.",
    },
    // Section 20: Demand Avoidance
    19: {
      answers: {
        demand_avoidance: "Yes, frequently",
        resistance_to_wanted: "Yes, frequently",
        choices_vs_instructions: "Yes, significantly better",
        reaction_to_authority: "He freezes or becomes oppositional. Direct instructions feel like threats to him. The more you push the more he resists.",
        control_environment: "Night and day. In low demand environments he is cooperative, creative, and calm. In high control environments he shuts down or explodes.",
      },
      reflection: "Reducing demands does not mean lowering expectations. It means changing the approach.",
    },
    // Section 21: Hyperfocus
    20: {
      answers: {
        hyperfocus_subject: "Lego. He can build for five or six hours without eating, drinking, or going to the toilet. He does not hear us when we call him.",
        hyperfocus_problems: "Yes, regularly",
        interest_driven_focus: "Yes, dramatically",
        zoning_out: "He zones out in lessons he finds unstimulating. His body is there but he has left. Teachers think he is choosing not to listen.",
        interrupted_hyperfocus: "Very distressed, significant reaction",
        // Child voice
        cv_hours_not_bored: "Lego. I could do it forever. My brain goes quiet when I am building and that is the best feeling.",
        cv_zone_out: "Yes. I go somewhere else in my head. I do not mean to. It just happens when things are boring or too much.",
      },
      reflection: "His attention is not broken. It is interest-based. That is a feature, not a fault.",
    },
    // Section 22: Emotional Intensity
    21: {
      answers: {
        emotional_intensity: "Yes, clearly",
        anger_speed: "Yes, regularly",
        reaction_to_criticism: "He crumbles. Even gentle feedback feels like an attack. He has cried for an hour after being told his handwriting needs to be neater.",
        perceived_rejection: "Constantly. If a friend does not wave back he assumes they hate him. If a teacher does not smile he thinks he is in trouble.",
        emotional_carrying: "Yes, regularly",
        anger_preceded_by: "Almost always. The anger is never random. It follows perceived rejection, injustice, or loss of control. Every single time.",
        // Child voice
        cv_anger_nowhere: "It feels like it comes from nowhere but actually it has been building all day. By the time it comes out it is too big to stop.",
        cv_feel_better: "A long time. Sometimes the whole day. Sometimes I still feel bad the next day.",
      },
      reflection: "He feels everything at full volume. The world is not built for that.",
    },
  },
  finalStatement: "Jake is a brilliant, creative, sensitive boy who is being broken by a system that does not understand him. We are not asking for special treatment. We are asking for people to see him. All of him. Not just the bit that happens when he is overwhelmed. He deserves to go to school without it costing him his mental health. We need help and we need it now.",
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
  const { loadState, state, updateAiReport, clearAiReport, setReportMode } = useChildProfile();
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

  const handleRestore = (data: { profile_data: any; stage: string; active_section: number; report_mode?: string; ai_report?: any }) => {
    const profileData = { ...data.profile_data, reportMode: data.report_mode || data.profile_data?.reportMode || "full" };
    loadState(profileData);
    if (data.ai_report) {
      updateAiReport(data.ai_report);
    }
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
      const timeoutId = setTimeout(() => controller.abort(), 120_000);

      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-profile-report",
        { body: { profileText }, signal: controller.signal as any }
      );

      clearTimeout(timeoutId);

      if (fnError) throw new Error(fnError.message || "Failed to generate report");
      if (data?.error) throw new Error(data.error);

      const structured = data.structured && isStructuredReport(data.structured)
        ? data.structured
        : undefined;

      updateAiReport({
        generatedAt: new Date().toISOString(),
        model: "openai/gpt-5",
        report: data.report,
        structured,
      });

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
      insights[idx] = { ...insights[idx], reflection: regenState.newReflection };
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
