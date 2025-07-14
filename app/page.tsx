"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Server,
  TrendingUp,
  Users,
  Database,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  Zap,
  Monitor,
  Cloud,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Facebook,
  Play,
  Sparkles,
  Settings,
} from "lucide-react"
import Image from "next/image"
import {SiWhatsapp} from "react-icons/si"
import Link from "next/link"

// Composant de particules flottantes
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${
              i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#8B5CF6"
            }, ${i % 3 === 0 ? "#1D4ED8" : i % 3 === 1 ? "#059669" : "#7C3AED"})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Composant de morphing entre les rôles
const RoleMorpher = () => {
  const roles = [
    { text: "Professionnel Marketing Digital", color: "#10B981", icon: TrendingUp },
    { text: "Développeur Full Stack", color: "#3B82F6", icon: Code2 },
    { text: "Data analyste", color: "#8B5CF6", icon: Database },
    { text: "Technicien Informatique", color: "#8B5CF6", icon: Server },
  ]

  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRole}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center space-x-3"
        >
          <motion.div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${roles[currentRole].color}20` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {React.createElement(roles[currentRole].icon, {
              className: "w-6 h-6",
              style: { color: roles[currentRole].color },
            })}
          </motion.div>
          <span className="text-2xl font-bold" style={{ color: roles[currentRole].color }}>
            {roles[currentRole].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Composant de compétence avec animation fluide
const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(skill.level)
      }, index * 100)
      return () => clearTimeout(timer)
    }
  }, [isInView, skill.level, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${skill.color}15` }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                <p className="text-sm text-gray-500">{skill.category}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {skill.level}%
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Maîtrise</span>
              <span className="font-medium" style={{ color: skill.color }}>
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1">
            {skill.tools?.map((tool: string, i: number) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Composant de projet avec hover effects avancés
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="h-full overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-3">
              <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button size="sm" className="backdrop-blur-sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </div>
          </motion.div>

          <div className="absolute top-4 left-4">
            <Badge
              className={`${project.type === "Marketing" ? "bg-green-500" : project.type === "Dev" ? "bg-blue-500" : "bg-purple-500"}`}
            >
              {project.type}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex space-x-1">
              {project.domains.map((domain: string, i: number) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    domain === "Marketing" ? "bg-green-400" : domain === "Dev" ? "bg-blue-400" : "bg-purple-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {project.metrics && (
              <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                {Object.entries(project.metrics).map(([key, value], i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-blue-600">{value as string}</div>
                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ExpertPortfolio() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const expertiseAreas = [
    {
      title: "Marketing Digital",
      icon: TrendingUp,
      color: "#10B981",
      description: "Stratégies digitales, campagnes publicitaires, génération de leads",
      skills: ["LinkedIn Ads", "Facebook Ads", "Google Analytics", "Marketing Automation"],
      projects: 5,
      clients: 5,
    },
    {
      title: "Développement",
      icon: Code2,
      color: "#3B82F6",
      description: "Applications web, mobile, systèmes de gestion sur mesure",
      skills: ["React/Next.js", "Node.js", "Python", "Bases de données"],
      projects: 10,
      clients: 5,
    },
    {
      title: "Support IT",
      icon: Server,
      color: "#8B5CF6",
      description: "Administration système, maintenance, infrastructure cloud",
      skills: ["Windows/Linux", "Cloud AWS/Azure", "Réseau", "Sécurité"],
      projects: 5,
      clients: 5,
    },
  ]

  const skills = [
    // Marketing
    {
      name: "Marketing Digital",
      level: 85,
      category: "Marketing",
      color: "#10B981",
      icon: TrendingUp,
      tools: ["LinkedIn Ads", "Facebook Ads", "Google Ads"],
    },
    {
      name: "Community Management",
      level: 80,
      category: "Marketing",
      color: "#10B981",
      icon: Users,
      tools: ["LinkedIn", "Facebook", "WhatsApp"],
    },
    {
      name: "Marketing Automation",
      level: 75,
      category: "Marketing",
      color: "#10B981",
      icon: Zap,
      tools: ["HubSpot", "Mailchimp", "Zapier"],
    },
    {
      name: "Analytics & Data",
      level: 65,
      category: "Marketing",
      color: "#10B981",
      icon: BarChart3,
      tools: ["Google Analytics", "Facebook Insights", "LinkedIn Analytics"],
    },

    // Développement
    {
      name: "React/Next.js",
      level: 90,
      category: "Développement",
      color: "#3B82F6",
      icon: Code2,
      tools: ["React", "Next.js", "TypeScript"],
    },
    {
      name: "Backend Development",
      level: 85,
      category: "Développement",
      color: "#3B82F6",
      icon: Server,
      tools: ["Node.js", "Python", "Django"],
    },
    {
      name: "Bases de Données",
      level: 88,
      category: "Développement",
      color: "#3B82F6",
      icon: Database,
      tools: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      name: "Mobile Development",
      level: 50,
      category: "Développement",
      color: "#3B82F6",
      icon: Smartphone,
      tools: ["React Native", "Flutter"],
    },

    // IT Support
    {
      name: "Administration Système",
      level: 78,
      category: "IT Support",
      color: "#8B5CF6",
      icon: Settings,
      tools: ["Windows Server", "Linux", "Active Directory"],
    },
    {
      name: "Cloud Computing",
      level: 60,
      category: "IT Support",
      color: "#8B5CF6",
      icon: Cloud,
      tools: ["AWS", "Azure", "Google Cloud"],
    },
    {
      name: "Cybersécurité",
      level: 65,
      category: "IT Support",
      color: "#8B5CF6",
      icon: Shield,
      tools: ["Firewall", "Antivirus", "VPN"],
    },
    {
      name: "Support Technique",
      level: 85,
      category: "IT Support",
      color: "#8B5CF6",
      icon: Monitor,
      tools: ["Help Desk", "Remote Support", "Troubleshooting"],
    },
  ]

  const projects = [
    {
      title: "ArtiVisio Platform",
      description:
        "Plateforme complète de RH avec marketing automation, gestion des candidatures et campagnes publicitaires intégrées.",
      image: "/arti.png",
      type: "Hybrid",
      domains: ["Marketing", "Dev", "IT"],
      technologies: ["React", "Node.js", "PostgreSQL", "LinkedIn API", "Facebook Ads"],
    },
    {
      title: "KS+ DistributionPro",
      description:
        "Application Desktop complète dédiée à la gestion des stocks, des commandes, des clients et des fournisseurs dans le secteur des dépôts de boissons.",
      image: "/cave.jpg",
      type: "Dev",
      domains: ["Data Analyste", "IT"],
      technologies: ["Java Swing", "Mysql"],
      metrics: { agents: "12+", accuracy: "98%", sync: "99.9%" },
    },
    {
      title: "PEGGY DERICK Digital",
      description: "Transformation digitale complète : site web, CRM, automatisation marketing et infrastructure IT.",
      image: "/peggy.png",
      type: "Hybrid",
      domains: ["Marketing", "Dev", "IT"],
      technologies: ["Next.js", "PostgreSQL", "Marketing Automation", "Cloud Infrastructure"],
    },
    {
      title: "PORTFOLIO",
      description: "Portfolio professionnel.",
      image: "/portf.jpg",
      type: "Dev",
      domains: ["Dev"],
      technologies: ["html", "css", "javascript"],
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />

      {/* Navigation flottante */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed  transform -translate-x-1/2 z-40 left-8 top-8"
      >
      <div className="8bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20 w-full max-w-fit mx-auto">
       <div className="flex w-full justify-center sm:justify-start items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src="/images/profiler.png" alt="KSAEV" width={32} height={32} className="object-cover" />
            </div>
            <span className="font-semibold text-gray-800">KSAEV</span>
          </div>
            <div className="flex space-x-4">
              {["Accueil", "Expertise", "Projets", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors sm:text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingParticles />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Photo avec effet morphing */}
            <motion.div
              className="relative w-40 h-40 mx-auto mb-8"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full p-1 animate-pulse">
                <div className="w-full h-full bg-white rounded-full p-2">
                  <Image
                    src="/images/profile.jpg"
                    alt="KOUASSI SIEBE ADELPHE EYMARD VIANNEY"
                    fill
                    className="rounded-full "
                  />
                </div>
              </div>
              <motion.div
                className="absolute -inset-4 border-2 border-dashed border-blue-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                KOUASSI SIEBE
                <br />
                ADELPHE EYMARD VIANNEY
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:mb-8"
              >
                <RoleMorpher />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Expert polyvalent combinant <span className="text-green-600 font-semibold">marketing digital</span>,{" "}
                <span className="text-blue-600 font-semibold">développement</span> et{" "}
                <span className="text-purple-600 font-semibold">support IT</span> pour des solutions complètes et
                innovantes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {/* 
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                 <Play className="mr-2 h-5 w-5" />
                  Voir mes réalisations
                </Button>
                */}
                <Button size="lg" variant="outline" className="border-2 hover:bg-blue-500"
                onClick={()=>window.open("/CV_Kouassi_Siebe_Adelphe_Eymard_Vianney.pdf")}>
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger CV
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Section Expertise */}
      <section id="expertise" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Triple Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche unique combinant marketing, développement et support IT pour des solutions complètes
            </p>
          </motion.div>

          {/* Domaines d'expertise */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${area.color}15` }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <area.icon className="w-10 h-10" style={{ color: area.color }} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{area.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{area.description}</p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {area.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: area.color }}>
                            {area.projects}+
                          </div>
                          <div className="text-sm text-gray-500">Projets</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: area.color }}>
                            {area.clients}+
                          </div>
                          <div className="text-sm text-gray-500">Clients</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Compétences détaillées */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Compétences Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projets" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
              Projets Réalisés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes alliant marketing, développement et infrastructure IT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-green-600 bg-clip-text text-transparent">
                Collaborons Ensemble
              </h2>
              <p className="text-xl text-gray-600">Prêt à transformer vos idées en solutions digitales complètes ?</p>
            </div>

            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Informations de Contact</h3>

                    {[
                      { icon: Phone, label: "Téléphone", value: "+225 07 58 98 80 04", color: "#10B981" },
                      { icon: Mail, label: "Email", value: "kouassisiebe@gmail.com", color: "#3B82F6" },
                      { icon: MapPin, label: "Localisation", value: "Abidjan, Côte d'Ivoire", color: "#8B5CF6" },
                    ].map((contact, index) => (
                      <motion.div
                        key={contact.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4 group"
                      >
                        <div
                          className="p-3 rounded-xl group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${contact.color}15` }}
                        >
                          <contact.icon className="w-6 h-6" style={{ color: contact.color }} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{contact.label}</p>
                          <p className="text-gray-600">{contact.value}</p>
                        </div>
                      </motion.div>
                    ))}

                    <div className="pt-6 border-t">
                      <h4 className="font-semibold text-gray-800 mb-4">Réseaux Sociaux</h4>
                      <div className="flex space-x-4">
                        {[
                          {
                            icon: Linkedin,
                            href: "https://www.linkedin.com/in/siebe-adelphe-eymard-vianney-kouassi-686b97217",
                            color: "#0077B5",
                          },
                          {icon:SiWhatsapp,href:"https://wa.me/2250758988004",color: "#10B981" },
                          {icon:Facebook,href:"https://www.facebook.com/siebeadelphe.kouassi/",color: "#8B5CF6" },
                          { icon: Github, href: "https://github.com/ksaev", color: "#059669" },
                        ].map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl hover:scale-110 transition-all duration-300"
                            style={{ backgroundColor: `${social.color}15` }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <social.icon className="w-6 h-6" style={{ color: social.color }} />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Services Proposés</h3>

                    {[
                      {
                        title: "Stratégie Marketing Digital",
                        desc: "Campagnes publicitaires, génération de leads",
                        color: "#10B981",
                      },
                      {
                        title: "Développement Sur Mesure",
                        desc: "Applications web, mobile, systèmes de gestion",
                        color: "#3B82F6",
                      },
                      { title: "Support IT Complet", desc: "Infrastructure, maintenance, sécurité", color: "#8B5CF6" },
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-xl border-l-4 bg-gray-50"
                        style={{ borderColor: service.color }}
                      >
                        <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm">{service.desc}</p>
                      </motion.div>
                    ))}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                      <Button
                        onClick={() => window.location.href = "mailto:kouassisiebe@gmail.com"}
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600"
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Démarrer un Projet
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">KOUASSI SIEBE ADELPHE EYMARD VIANNEY</h3>
            <p className="text-gray-300 mb-6">Expert Marketing Digital • Développeur Full Stack • Technicien IT</p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} KSAEV. Tous droits réservés. |
                <span className="text-blue-400"> Conçu avec passion et expertise</span>
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
