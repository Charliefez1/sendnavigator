import { ExternalLink } from "lucide-react";
import smartphoneFreeImg from "@/assets/resource-smartphone-free.png";
import awbpImg from "@/assets/resource-awbp.png";

const resources = [
  {
    href: "https://smartphonefree.neurodiversityglobal.com/",
    title: "The Day We Gave Children Dopamine on Demand",
    description: "Then wondered why they couldn't cope",
    tag: "Smartphone Free",
    image: smartphoneFreeImg,
  },
  {
    href: "https://awbp.neuro.support/",
    title: "It's Time to Be Educated by a Clown",
    description: "One social media comment. One tired accusation. And the reality of parenting a neurodivergent child.",
    tag: "Open Letter",
    image: awbpImg,
  },
];

export function MoreResources() {
  return (
    <section className="content-section py-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        More from Neurodiversity Global
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r) => (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-border bg-card shadow-lg overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all"
          >
            <div className="h-36 overflow-hidden">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {r.tag}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {r.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
