import { Mail, Phone, Linkedin } from "lucide-react";

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
}

const contacts: ContactPerson[] = [
  {
    name: "Rich Ferriman",
    role: "Lead Trainer & Managing Partner",
    email: "rich@neurodiversityglobal.com",
    phone: "+44 (0) 7508 242212",
    linkedin: "https://www.linkedin.com/in/richferriman",
  },
  {
    name: "Charlie Ferriman",
    role: "Partner & Global Account Director",
    email: "charlie@neurodiversityglobal.com",
    phone: "+44 (0) 7535 696880",
    linkedin: "https://www.linkedin.com/in/charlieferriman",
  },
];

export function ContactBanner() {
  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="content-wide py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {contacts.map((contact) => (
            <div key={contact.email} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="font-medium text-foreground">{contact.name}</div>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{contact.email}</span>
                  <span className="md:hidden">Email</span>
                </a>
                <a 
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{contact.phone}</span>
                  <span className="lg:hidden">Call</span>
                </a>
                <a 
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
