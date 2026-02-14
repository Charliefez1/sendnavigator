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
    <div className="bg-primary/5 border-t border-primary/10">
      <div className="content-wide py-6">
        <p className="text-sm font-display font-semibold text-foreground mb-4">Get in touch</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.email}
              className="bg-card rounded-2xl p-4 border border-border/60 shadow-lg"
            >
              <p className="font-bold text-foreground text-sm">{contact.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{contact.role}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{contact.email}</span>
                  <span className="md:hidden">Email</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{contact.phone}</span>
                  <span className="lg:hidden">Call</span>
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
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
