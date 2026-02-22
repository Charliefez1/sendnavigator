import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ChildProfileProvider, useChildProfile } from "@/contexts/ChildProfileContext";
import { OpeningScreen } from "@/components/child-profile/OpeningScreen";
import { SetupFlow } from "@/components/child-profile/SetupFlow";
import { ProfileBuilder } from "@/components/child-profile/ProfileBuilder";

type Stage = "opening" | "setup" | "builder";

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

  return (
    <>
      {stage === "opening" && (
        <OpeningScreen
          onStart={() => setStage("setup")}
          onRestore={handleRestore}
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
