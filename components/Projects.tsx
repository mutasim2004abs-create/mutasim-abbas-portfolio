import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { SmallProjects } from "@/components/SmallProjects";
import { STAR_PROJECTS } from "@/lib/content";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-content px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,3rem+8vw,10rem)]"
    >
      <SectionHeading eyebrow="// 03 — Selected Work" title="Selected {work}." />

      {/* Sticky-stacking star cards */}
      <div className="flex flex-col gap-8">
        {STAR_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            total={STAR_PROJECTS.length}
          />
        ))}
      </div>

      {/* Compact grid for smaller uni/group work */}
      <SmallProjects />
    </section>
  );
}
