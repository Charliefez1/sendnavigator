import { Mail, Phone, Linkedin } from "lucide-react";
import richBio from "@/assets/rich-ferriman-bio.png";
import charlieBio from "@/assets/charlie-ferriman-bio.png";

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  linkedin: string;
  bioImage?: string;
}

const contacts: ContactPerson[] = [
  {
    name: "Rich Ferriman",
    role: "Lead Trainer & Managing Partner",
    email: "rich@neurodiversityglobal.com",
    phone: "tel:+447508242212",
    phoneDisplay: "+44 (0) 7508 242212",
    linkedin: "https://www.linkedin.com/in/richferriman",
    bioImage: richBio,
  },
  {
    name: "Charlie Ferriman",
    role: "Partner & Global Account Director",
    email: "charlie@neurodiversityglobal.com",
    phone: "tel:+447535696880",
    phoneDisplay: "+44 (0) 7535 696880",
    linkedin: "https://www.linkedin.com/in/charlieferriman",
    bioImage: charlieBio,
  },
];

function ContactCard({ person, showBioImage }: { person: ContactPerson; showBioImage?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-lg flex-1 min-w-[260px] space-y-4">
      <div>
        <h3 className="text-base font-bold text-foreground">{person.name}</h3>
        <p className="text-sm text-primary mb-4">{person.role}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <a href={`mailto:${person.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Mail className="h-4 w-4 shrink-0" />
            <span>{person.email}</span>
          </a>
          <a href={person.phone} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{person.phoneDisplay}</span>
          </a>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Linkedin className="h-4 w-4 shrink-0" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface NeurodiversityGlobalCTAProps {
  showBioImages?: boolean;
}

export function NeurodiversityGlobalCTA({ showBioImages = false }: NeurodiversityGlobalCTAProps) {
  return (
    <div className="content-section py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 font-display">Get in touch</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {contacts.map((person) => (
          <ContactCard key={person.name} person={person} showBioImage={showBioImages} />
        ))}
      </div>
    </div>
  );
}
