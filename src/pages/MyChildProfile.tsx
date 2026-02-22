import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ChildProfileProvider, useChildProfile, ChildProfileState } from "@/contexts/ChildProfileContext";
import { OpeningScreen } from "@/components/child-profile/OpeningScreen";
import { SetupFlow } from "@/components/child-profile/SetupFlow";
import { ProfileBuilder } from "@/components/child-profile/ProfileBuilder";

type Stage = "opening" | "setup" | "builder";

const TEST_DATA: ChildProfileState = {
  setup: {
    childName: "Jake",
    filledBy: "His mum, Sarah",
    sharedWith: ["School SENCO", "Class teacher", "GP"],
    reason: "Jake is being assessed for ADHD and we want to make sure the school understands what we see at home. He was excluded twice last term and we feel like no one is seeing the full picture.",
  },
  sections: {
    0: {
      answers: {
        classroom_description: "His classroom is open plan with about 30 children. The noise level is high, especially during transitions. Fluorescent lights. He sits near the door which means constant movement past him.",
        after_school: "He comes home like a coiled spring. Sometimes he is silent and goes straight to his room. Other days he explodes within minutes of walking through the door. There is no in between.",
        transitions: "Almost always difficult",
        settled_environment: "He is calmest in his bedroom with the curtains drawn and his weighted blanket. He also does well in small quiet spaces like the car.",
        home_predictability: "Generally predictable and calm",
      },
      reflection: "We have tried to make home as calm as possible but the school environment seems to undo all of it by 3pm.",
    },
    1: {
      answers: {
        safe_person: "His Year 3 teaching assistant, Mrs Davies. She speaks quietly, gives him space, and does not make a big deal of things. He says she gets it.",
        trigger_adult: "The head of year. Jake says he shouts a lot and makes examples of children in front of the class. Jake shuts down completely around him.",
        friendships: "He has one close friend, Tom. They have been friends since reception. Other friendships come and go. He finds groups overwhelming.",
        age_preference: "Older children or adults",
        friendship_breakdown: "He had a falling out with a group of boys last year. They excluded him from games for weeks. He stopped eating lunch and started hiding in the toilets.",
        compliance_in_friendships: "Yes, often",
      },
      reflection: "",
    },
    3: {
      answers: {
        dysregulation_description: "It starts with pacing. Then he gets louder. His voice goes higher. He starts repeating himself. If no one intervenes at that point he throws things, hits walls, and screams. Afterwards he is exhausted and deeply ashamed.",
        early_warning_signs: "He picks at his fingers. He starts talking very fast. He gets fixated on something being unfair. His face goes red before anything else happens.",
        recovery_time: "Several hours",
        dysregulation_patterns: "Almost always after school. Rarely at weekends unless plans change unexpectedly. Much worse on Mondays and after PE.",
        helps_or_worsens: "Space helps. Silence helps. His weighted blanket. What makes it worse is being told to calm down, being touched, or being asked what is wrong before he is ready.",
        shame_response: "He cries afterwards and says he is broken. He has said he wishes he was not alive. We take that very seriously.",
      },
      reflection: "This is the thing that worries us most. He is not a violent child. He is a child in pain.",
    },
    5: {
      answers: {
        noise_sensitivity: "He cannot tolerate hand dryers, assembly hall noise, or the dinner hall. He covers his ears and hunches over.",
        texture_distress: "He will only wear soft joggers. Tags must be removed from everything. He gags at certain food textures.",
        pain_temperature: "Yes, clearly",
        fidgeting: "Constantly. He rocks on his chair, chews his collar, clicks pens. Teachers tell him to stop but it gets worse when he tries.",
        movement_seeking: "Seeks movement actively",
        interoception: "Yes, regularly",
        sensory_seeking: "He loves his weighted blanket, tight hugs, trampolining, and very loud music through headphones.",
      },
      reflection: "",
    },
    6: {
      answers: {
        task_initiation: "He cannot start anything without someone sitting next to him. Even brushing his teeth needs a prompt most days.",
        knowing_doing_gap: "Yes, frequently",
        multi_step_instructions: "Struggles with more than two steps",
        time_blindness: "Yes, regularly",
        variable_ability: "Massively. Some days he writes a whole page. Other days he cannot pick up the pencil. Same child, same task, completely different outcome.",
        procrastination: "Homework is a battle every single night. He knows what he needs to do. He just cannot start.",
      },
      reflection: "The school sees inconsistency as a choice. We see it as evidence that something else is going on.",
    },
    8: {
      answers: {
        novelty_seeking: "Yes, frequently",
        screen_removal: "It triggers the worst meltdowns. It is as if someone has physically taken something from him. The reaction is immediate and intense.",
        effortful_tasks: "Yes, frequently",
        risk_taking: "He climbs everything. He has fallen from height three times. He does not seem to register danger until after the fact.",
        stimulation_need: "He needs noise or movement constantly. Silence makes him anxious. He hums, taps, or moves even in his sleep.",
      },
      reflection: "",
    },
    9: {
      answers: {
        school_home_difference: "Yes, significantly different",
        after_school_collapse: "Every single day. The moment he sees me his face changes. By the time we are in the car he is either sobbing or screaming. It has been like this since Year 1.",
        post_school_exhaustion: "Yes, they need significant time to recover",
        teacher_discrepancy: "Yes, regularly",
        suppressed_distress: "Yes. At school he is quiet and compliant. At home he tells us he spent all day trying not to cry.",
        compliance_avoidance: "Yes, frequently",
      },
      reflection: "The school keeps telling us he is fine. He is not fine. He is performing.",
    },
    11: {
      answers: {
        behaviour_triggers: "Usually transitions or being told no without warning. Or when he feels something is unfair.",
        behaviour_function: "It is communication. He does not have the words in the moment so his body takes over.",
        consequences_response: "They make everything worse. He feels more ashamed, more angry, more disconnected. He has never once responded to a consequence by improving his behaviour.",
        school_behaviour_response: "They use a traffic light system. He gets moved to red. Everyone sees. He says it makes him want to disappear.",
        behaviour_pattern_change: "It is getting worse. He used to recover quickly. Now the shame lasts for days.",
      },
      reflection: "We need people to stop seeing behaviour and start seeing distress.",
    },
    12: {
      answers: {
        self_identity: "He says he is stupid and broken. He compares himself to other children constantly.",
        diagnosis_understanding: "We have told him his brain works differently. He asked if that means something is wrong with him.",
        peer_comparison: "Yes, significantly",
        confidence_trajectory: "It has dropped off a cliff since Year 2. He used to be confident and curious. Now he tries to be invisible.",
      },
      reflection: "",
    },
    13: {
      answers: {
        core_strengths: "He is incredibly creative. He builds extraordinary things with Lego. He understands mechanical systems intuitively.",
        passionate_interests: "Lego, engineering, how things work, space, and dinosaurs. He can talk about these for hours with genuine expertise.",
        strengths_at_school: "Rarely. The curriculum does not play to his strengths. He shines in DT and science but those are limited.",
        underestimated_abilities: "His verbal reasoning is exceptional when he is calm. His memory for facts he cares about is extraordinary.",
      },
      reflection: "Everyone focuses on what he cannot do. No one asks what he can.",
    },
    20: {
      answers: {
        hyperfocus_description: "Lego. He can build for five or six hours without eating, drinking, or going to the toilet. He does not hear us when we call him.",
        interest_motivation: "Total. If he is interested he is unstoppable. If he is not interested it is as if the task does not exist.",
        zoning_out: "Yes, regularly",
        creative_output: "He designs his own Lego sets with instructions. He has drawn plans for machines that actually make mechanical sense.",
      },
      reflection: "",
    },
    21: {
      answers: {
        emotional_intensity: "His emotions are extreme. Joy is total. Anger is volcanic. Sadness is all-consuming. There is no middle ground.",
        anger_triggers: "Perceived unfairness. Being misunderstood. Plans changing without warning. Being told he is wrong when he believes he is right.",
        rejection_sensitivity: "Yes, significantly",
        recovery_from_upset: "Hours. Sometimes the rest of the day. He replays events over and over and cannot let them go.",
        emotional_vocabulary: "Limited in the moment. Afterwards he can sometimes explain but during an episode he has no words at all.",
      },
      reflection: "He feels everything at full volume. The world is not built for that.",
    },
  },
  finalStatement: "Jake is a brilliant, creative, sensitive boy who is being broken by a system that does not understand him. We are not asking for special treatment. We are asking for people to see him. All of him. Not just the bit that happens when he is overwhelmed. He deserves to go to school without it costing him his mental health. We need help and we need it now.",
};

function ProfileContent() {
  const [stage, setStage] = useState<Stage>("opening");
  const [initialSection, setInitialSection] = useState(0);
  const { loadState } = useChildProfile();

  const handleRestore = (data: { profile_data: any; stage: string; active_section: number }) => {
    loadState(data.profile_data);
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

  return (
    <>
      {stage === "opening" && (
        <OpeningScreen
          onStart={() => setStage("setup")}
          onRestore={handleRestore}
          onLoadTestData={handleLoadTestData}
        />
      )}
      {stage === "setup" && <SetupFlow onComplete={() => setStage("builder")} />}
      {stage === "builder" && <ProfileBuilder initialSection={initialSection} />}
    </>
  );
}

const MyChildProfile = () => {
  return (
    <Layout>
      <SEOHead
        title="My Child: A Profile - SEND Reform Navigator"
        description="Build a personalised profile document about your neurodivergent child. Download as PDF. Nothing is stored."
        path="/my-child-profile"
      />
      <ChildProfileProvider>
        <ProfileContent />
      </ChildProfileProvider>
    </Layout>
  );
};

export default MyChildProfile;
