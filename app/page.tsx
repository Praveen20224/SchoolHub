import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { School, Plus, Eye, BookOpen, ArrowRight, Shield, Database, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="container mx-auto px-4 py-16 text-center relative">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center mb-6 animate-in zoom-in-50 duration-700">
              <div className="p-4 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300 hover:scale-110 transform">
                <School className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance animate-in slide-in-from-bottom-4 duration-700 delay-200">
              School Management System
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-300">
              A comprehensive digital platform designed to streamline educational institution management, featuring
              secure data storage, intuitive interfaces, and robust administrative tools for modern educational
              environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in slide-in-from-bottom-4 duration-700 delay-500">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-200 group"
              >
                <Link href="/schools">
                  <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  View All Schools
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-200 group bg-transparent"
              >
                <Link href="/add-school">
                  <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                  Add New School
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">About Our Platform</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Our School Management System is a state-of-the-art web application built with modern technologies to
              provide educational administrators with powerful tools for institutional data management. Featuring
              responsive design, comprehensive validation, secure file storage, and intuitive user interfaces, this
              platform serves as a centralized hub for managing school information across multiple locations and
              administrative levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with robust data validation and secure file storage systems.",
              },
              {
                icon: Database,
                title: "Comprehensive Database",
                description: "Complete school information management with advanced search and filtering capabilities.",
              },
              {
                icon: Users,
                title: "User-Friendly Interface",
                description: "Intuitive design with responsive layouts optimized for all devices and user types.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`text-center space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-${(index + 1) * 100}`}
                >
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Core Features</h2>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Powerful tools designed to streamline educational institution management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Plus,
                title: "Institution Registration",
                description:
                  "Comprehensive school registration with detailed information capture, validation, and secure image storage",
                href: "/add-school",
                color: "primary",
                delay: "delay-100",
              },
              {
                icon: Eye,
                title: "School Directory",
                description:
                  "Advanced browsing interface with search functionality and responsive grid layouts for optimal viewing",
                href: "/schools",
                color: "accent",
                delay: "delay-200",
              },
              {
                icon: BookOpen,
                title: "Data Management",
                description:
                  "Real-time database operations with comprehensive validation, error handling, and data integrity assurance",
                href: "/schools",
                color: "secondary",
                delay: "delay-300",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className={`border-border/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 group animate-in slide-in-from-bottom-4 duration-700 ${feature.delay}`}
                >
                  <CardHeader>
                    <div
                      className={`p-2 bg-${feature.color}/10 rounded-lg w-fit group-hover:bg-${feature.color}/20 transition-colors duration-300`}
                    >
                      <Icon
                        className={`h-6 w-6 text-${feature.color} group-hover:scale-110 transition-transform duration-200`}
                      />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 hover:scale-105"
                    >
                      <Link href={feature.href}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Platform Statistics</h2>
          <p className="text-muted-foreground text-pretty">Real-time metrics showcasing our platform's capabilities</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "Unlimited", label: "School Registrations", delay: "delay-100" },
            { number: "Real-time", label: "Data Synchronization", delay: "delay-200" },
            { number: "24/7", label: "System Availability", delay: "delay-300" },
          ].map((stat, index) => (
            <div key={stat.label} className={`space-y-2 animate-in slide-in-from-bottom-4 duration-700 ${stat.delay}`}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
