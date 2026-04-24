"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function ProjectsSection() {
  const sectionRef = useScrollAnimation();

  const projects = [
    {
      title: "SKINNER",
      description:
        "Software de gestión administrativa inteligente que combina IA avanzada con gestión de talento humano. Optimiza procesos administrativos y fortalece la infraestructura tecnológica de las organizaciones.",
      tags: [
        "Python",
        "Transformer",
        "FastAPI",
        "Docker",
        "Nest.js",
        "Next.js",
        "Prisma",
        "Tailwind.css",
      ],
      image: "skinner-logo.png",
      imageContain: true,
      github: "https://github.com/Skinner-SAS-de-CV",
      demo: "https://www.skinnersv.net/companies",
    },
    {
      title: "Sistema de predicción de ventas para un petshop",
      description:
        "Desarrollé un sistema inteligente de predicción de ventas orientado a pequeños y medianos negocios del sector Alimento para mascotas, diseñado para transformar datos históricos en decisiones comerciales accionables. El modelo principal, basado en XGBoost para series temporales, alcanza aproximadamente un 77 % de precisión (R²).",
      tags: ["Python", "FastAPI", "MLflow", "Docker", "XGBoost"],
      image: "petshop.jpg",
      github: "https://github.com/yultic",
      demo: "https://github.com/yultic/Petshop-dashboard",
    },
    {
      title: "ETL Climático Automatizado para El Salvador",
      description:
        "Pipeline ETL completo de datos meteorológicos que automatiza la extracción, transformación y carga de información del clima para El Salvador usando Apache Airflow, Docker y Google Cloud.",
      tags: [
        "Apache Airflow",
        "Python",
        "Google Cloud Storage",
        "PostgreSQL",
        "OpenWeatherMap API",
      ],
      image: "lluvias.jpg",
      github: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
      demo: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
    },
    {
      title: "Agente-en-X-ElizaOs",
      description:
        "Desarrollé un agente de IA basado en ElizaOS, diseñado para operar en X (Twitter) y generar conversaciones especializadas sobre Blockchain y Web3.",
      tags: ["TypeScript", "PLpgSQL (para base de datos)", "Shell", "Docker"],
      image: "eliza_banner.jpg",
      github: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
      demo: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
    },
    {
      title: "Dapp-SivarETH",
      description:
        "Es un proyecto que integra contratos inteligentes Ethereum con una interfaz web, para crear y gestionar NFTs (Tokens No Fungibles) y una Integración con Wagmi - Librería web3 para conectar wallets.",
      tags: ["Next.js", "TypeScript", "Solidity", "IPFS"],
      image: "sivar.png",
      github: "https://github.com/Chinaskidev/Sivar-ETH",
      demo: "https://github.com/Chinaskidev/Sivar-ETH",
    },
    {
      title: "Raymapu Web",
      description:
        "Plataforma web moderna enfocada en digitalizar y posicionar un negocio de apicultura.Permite presentar información institucional, catálogo de productos y servicios, con una arquitectura frontend limpia y orientada a escalabilidad",
      tags: ["TypeScript", "Tailwind CSS", "shadcn/ui", "ESLint"],
      image: "raymapu2.png",
      github: "https://github.com/yultic/Raymapu-web",
      demo: "https://raymapu.cl/",
    },
    {
      title: "Your Mindz",
      description:
        "Aplicación web que permite a los clientes contratar y agendar sesiones de bienestar mental de forma autónoma: seleccionan el tipo de sesión, realizan el pago y reciben un enlace de confirmación con su cita, sin intermediarios.",
      tags: ["TypeScript", "Tailwind CSS", "shadcn/ui", "ESLint"],
      image: "LOGO_2.png",
      github: "https://github.com/yultic/your-mindz",
      demo: "https://your-mindz-web.vercel.app/",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-on-scroll">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-balance tracking-tight">
              Proyectos Destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Soluciones de IA y ML aplicadas a problemas reales
            </p>
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => {
              const isFeature = index < 3;
              const isReversed = index % 2 === 1;

              if (isFeature) {
                return (
                  <div
                    key={index}
                    className={`animate-on-scroll stagger-${(index % 3) + 1} grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden rounded-xl bg-muted group ${isReversed ? "lg:order-2" : ""}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img
                        src={project.image || "placeholder.svg"}
                        alt={project.title}
                        loading="lazy"
                        className={`w-full aspect-video group-hover:scale-105 transition-transform duration-700 ${
                          project.imageContain
                            ? "object-contain p-6"
                            : "object-cover"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-5">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs tracking-wide font-mono border border-gold/30 text-primary px-3 py-1 rounded-full hover:border-gold/60 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-gold/30 hover:border-gold/60"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Código
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                          asChild
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Smaller projects in grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(3).map((project, index) => (
                <Card
                  key={index + 3}
                  className={`animate-on-scroll stagger-${index + 1} border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden group hover:border-gold/40 transition-all duration-500`}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden aspect-video bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img
                        src={project.image || "placeholder.svg"}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs tracking-wide font-mono border border-gold/30 text-primary px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-gold/30 hover:border-gold/60"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Código
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
