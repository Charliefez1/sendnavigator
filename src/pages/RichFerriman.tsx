import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { ContactDetails } from "@/components/ContactDetails";
import { User } from "lucide-react";
import childhoodPhoto from "@/assets/rich-ferriman-childhood.jpeg";

export default function RichFerriman() {
  return (
    <Layout>
      <PageOrientation icon={User}
        sectionLabel="About"
        title="Rich Ferriman"
        description="Author of SEND Reform Navigator."
        lastUpdated="7th February 2026"
      />

      <section className="content-section py-8 border-t border-border">
        <div className="prose-calm space-y-6">
          <p className="text-lg leading-relaxed">
            I do not work in theory. I have <strong>lived the realities behind the statistics</strong>. Late diagnosis. Systems that did not work. The personal cost of pushing through anyway. That experience drives the clarity, urgency, pragmatism, and strategic insight I bring to my work, shaped by <strong>more than 30 years in senior executive roles</strong>.
          </p>

          <figure className="my-8">
            <img 
              src={childhoodPhoto} 
              alt="Rich Ferriman as a child in a classroom, writing at a desk with a wooden toy train beside him" 
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </figure>

          <p>
            I am the child who was in the system and <strong>never seen</strong>. I was assessed only on the challenges others noticed, not on the strengths I carried. That was 45 years ago. Much has changed, but <strong>far too much has not</strong>.
          </p>

          <p>
            Children who experience the world differently have been <strong>isolated, punished, or chastised</strong> for generations. Not because they were broken, but because systems could not see them. Those children grew up without support, without understanding, and without being recognised for who they were. This is not a new problem. It is a <strong>long running failure whose consequences we are now living with</strong>.
          </p>

          <p>
            We need to ask hard questions. Why the UK faces <strong>a mental health crisis</strong>. Why the NHS struggles to cope. Why so many people reach adulthood before receiving a neurodivergent diagnosis. These outcomes did not appear overnight. They are the result of <strong>decades of inaction, misunderstanding, and a refusal to accept that humans are not all the same</strong>, and were never meant to be.
          </p>

          <p>
            We are now at <strong>a crunch point</strong>. We can invest in our settings, our understanding, and our long term capability. Or we can retreat into conversations about budgets, blame, and who is supposedly gaming the system. The choice is <strong>strategic, not ideological</strong>.
          </p>

          <p>
            I am an <strong>award winning neuroinclusion consultant and trainer</strong>, and a father of four neurodivergent children. One of my children lives with acute co-occurring neurodivergent conditions and the long term impact and trauma of childhood cancer. Over the past decade, I have spent as much time in boardrooms as I have on the floors of hospital wards. That <strong>dual perspective</strong> matters. It keeps strategy anchored in reality and decision making connected to human consequence.
          </p>

          <p>
            I have always advocated for <strong>voices that struggle to be heard</strong> inside systems that resist change. I bring both executive accountability and lived experience into every conversation.
          </p>

          <p>
            I am not here to sell a playbook, a tool, or a silver bullet. I support organisations to <strong>lead with clarity, design with difference in mind</strong>, and recognise that culture underpins growth, sustainability, innovation, and retention.
          </p>

          <p>
            As co founder of <strong>Neurodiversity Global</strong>, I work to ensure neuroinclusion is strategic, not sentimental. We advise and are trusted by organisations including the NHS, NASA, University of Warwick, the London School of Economics, University of Birmingham, University of Brighton, University of Oxford, the Engineering Council, the Foreign Commonwealth and Development Office, ACAS, ASLEF, Kyndryl, Virgin Media, FareShare, and local education settings including my son's primary school.
          </p>

          <p>
            Neuroinclusion is not something you bolt onto a strategy or tick off through HR training. It is <strong>a strategic lever</strong>. When done properly, it delivers <strong>measurable return on investment</strong>, often quickly and at relatively low cost. It focuses on long term capability, not surface level awareness.
          </p>

          <p>
            My work sits at the <strong>intersection of inclusion and business strategy</strong>. This is where culture meets accountability, and where leaders take ownership of empathy. I help organisations move beyond performative gestures and deliver <strong>real progress with integrity, urgency, and measurable outcomes</strong>.
          </p>
        </div>

        <p className="mt-6">
          <Link to="/richs-take" className="text-[hsl(var(--accent-violet))] font-medium hover:underline">
            Read my take on the white paper
          </Link>
        </p>
      </section>

      <ContactDetails />

      <div className="content-section pb-16" />
    </Layout>
  );
}
