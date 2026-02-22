import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ChildProfileProvider } from "@/contexts/ChildProfileContext";
import { OpeningScreen } from "@/components/child-profile/OpeningScreen";
import { SetupFlow } from "@/components/child-profile/SetupFlow";
import { ProfileBuilder } from "@/components/child-profile/ProfileBuilder";

type Stage = "opening" | "setup" | "builder";

function ProfileContent() {
  const [stage, setStage] = useState<Stage>("opening");

  return (
    <>
      {stage === "opening" && <OpeningScreen onStart={() => setStage("setup")} />}
      {stage === "setup" && <SetupFlow onComplete={() => setStage("builder")} />}
      {stage === "builder" && <ProfileBuilder />}
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
