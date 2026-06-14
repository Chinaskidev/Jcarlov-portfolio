import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      {/* La home visual se muestra siempre en modo oscuro (look minimalista) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('dark')`,
        }}
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <Footer />
      </main>
    </>
  )
}
