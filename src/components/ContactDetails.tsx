import { Mail, Phone, Linkedin } from "lucide-react";

interface ContactPerson {
  name: string;
  role: string;
  organisation: string;
  email: string;
  phone: string;
  linkedin: string;
}

const contacts: ContactPerson[] = [
  {
    name: "Rich Ferriman",
    role: "Lead Trainer & Managing Partner",
    organisation: "Neurodiversity Global",
    email: "rich@neurodiversityglobal.com",
    phone: "+44 (0) 7508 242212",
    linkedin: "https://www.linkedin.com/in/richferriman",
  },
  {
    name: "Charlie Ferriman",
    role: "Partner & Global Account Director",
    organisation: "Neurodiversity Global",
    email: "charlie@neurodiversityglobal.com",
    phone: "+44 (0) 7535 696880",
    linkedin: "https://www.linkedin.com/in/charlieferriman",
  },
];

interface ContactDetailsProps {
  showTitle?: boolean;
}

export function ContactDetails({ showTitle = true }: ContactDetailsProps) {
  return (
    <section className="content-section py-8 border-t border-border">
      {showTitle && (
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Contact us
        </h2>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <div 
            key={contact.email} 
            className="p-4 rounded-xl bg-card border border-border shadow-lg space-y-3"
          >
            <div>
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.role}</p>
              <p className="text-sm text-muted-foreground">{contact.organisation}</p>
            </div>
            <div className="space-y-2 text-sm">
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                {contact.email}
              </a>
              <a 
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                {contact.phone}
              </a>
              <a 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
