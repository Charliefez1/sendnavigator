import { Layout } from "@/components/Layout";
import { PageOrientation } from "@/components/templates";
import { ContactDetails } from "@/components/ContactDetails";
import childhoodPhoto from "@/assets/rich-ferriman-childhood.jpeg";

export default function RichFerriman() {
  return (
    <Layout>
      <PageOrientation
        title="Rich Ferriman"
        description="Author of SEND Reform Navigator."
        lastUpdated="7th February 2026"
      />

      <section className="content-section py-8 border-t border-border">
        <div className="prose-calm space-y-6">
          <p className="text-lg leading-relaxed">
            I do not work in theory. I have lived the realities behind the statistics. Late diagnosis. Systems that did not work. The personal cost of pushing through anyway. That experience drives the clarity, urgency, pragmatism, and strategic insight I bring to my work, shaped by more than 30 years in senior executive roles.
          </p>

          <figure className="my-8">
            <img 
              src={childhoodPhoto} 
              alt="Rich Ferriman as a child in a classroom, writing at a desk with a wooden toy train beside him" 
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </figure>

          <p>
            I am the child who was in the system and never seen. I was assessed only on the challenges others noticed, not on the strengths I carried. That was 45 years ago. Much has changed, but far too much has not.
          </p>

          <p>
            Children who experience the world differently have been isolated, punished, or chastised for generations. Not because they were broken, but because systems could not see them. Those children grew up without support, without understanding, and without being recognised for who they were. This is not a new problem. It is a long running failure whose consequences we are now living with.
          </p>

          <p>
            We need to ask hard questions. Why the UK faces a mental health crisis. Why the NHS struggles to cope. Why so many people reach adulthood before receiving a neurodivergent diagnosis. These outcomes did not appear overnight. They are the result of decades of inaction, misunderstanding, and a refusal to accept that humans are not all the same, and were never meant to be.
          </p>

          <p>
            We are now at a crunch point. We can invest in our settings, our understanding, and our long term capability. Or we can retreat into conversations about budgets, blame, and who is supposedly gaming the system. The choice is strategic, not ideological.
          </p>

          <p>
            I am an award winning neuroinclusion consultant and trainer, and a father of four neurodivergent children. One of my children lives with acute co-occurring neurodivergent conditions and the long term impact and trauma of childhood cancer. Over the past decade, I have spent as much time in boardrooms as I have on the floors of hospital wards. That dual perspective matters. It keeps strategy anchored in reality and decision making connected to human consequence.
          </p>

          <p>
            I have always advocated for voices that struggle to be heard inside systems that resist change. I bring both executive accountability and lived experience into every conversation.
          </p>

          <p>
            I am not here to sell a playbook, a tool, or a silver bullet. I support organisations to lead with clarity, design with difference in mind, and recognise that culture underpins growth, sustainability, innovation, and retention.
          </p>

          <p>
            As co founder of Neurodiversity Global, I work to ensure neuroinclusion is strategic, not sentimental. We advise and are trusted by organisations including the NHS, NASA, University of Warwick, the London School of Economics, University of Birmingham, University of Brighton, University of Oxford, the Engineering Council, the Foreign Commonwealth and Development Office, ACAS, ASLEF, Kyndryl, Virgin Media, FareShare, and local education settings including my son's primary school.
          </p>

          <p>
            Neuroinclusion is not something you bolt onto a strategy or tick off through HR training. It is a strategic lever. When done properly, it delivers measurable return on investment, often quickly and at relatively low cost. It focuses on long term capability, not surface level awareness.
          </p>

          <p>
            My work sits at the intersection of inclusion and business strategy. This is where culture meets accountability, and where leaders take ownership of empathy. I help organisations move beyond performative gestures and deliver real progress with integrity, urgency, and measurable outcomes.
          </p>
        </div>
      </section>

      <ContactDetails />

      <div className="content-section pb-16" />
    </Layout>
  );
}
