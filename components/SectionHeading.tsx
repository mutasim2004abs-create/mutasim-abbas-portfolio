import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  /** Heading text; wrap one word in {…} to render it as a serif-italic accent. */
  title: string;
  id?: string;
};

/** Eyebrow + H2 with an optional single serif-italic accent word (§2 usage rule). */
export function SectionHeading({ eyebrow, title, id }: SectionHeadingProps) {
  const parts = title.split(/(\{[^}]+\})/g).filter(Boolean);
  return (
    <Reveal className="mb-12">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="h2-section text-text">
        {parts.map((part, i) =>
          part.startsWith("{") ? (
            <span key={i} className="serif-accent text-accent">
              {part.slice(1, -1)}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </h2>
    </Reveal>
  );
}
