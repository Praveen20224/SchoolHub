"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SchoolGridSkeleton } from "@/components/loading-skeleton"
import { MapPin, Phone, Mail, Search, Plus, Filter, School } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { OtpVerificationDialog } from "@/components/otp-verification-dialog"

interface SchoolType {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: number
  email_id: string
  image: string | null
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolType[]>([])
  const [filteredSchools, setFilteredSchools] = useState<SchoolType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  const supabase = createClient()

  useEffect(() => {
    fetchSchools()
  }, [])

  useEffect(() => {
    filterSchools()
  }, [schools, searchTerm, selectedCity, selectedState])

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase.from("schools").select("*").order("name", { ascending: true })

      if (error) {
        console.error("Error fetching schools:", error)
        toast({
          title: "Error",
          description: "Failed to load schools. Please try again.",
          variant: "destructive",
        })
        return
      }

      setSchools(data || [])
    } catch (error) {
      console.error("Fetch error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading schools.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterSchools = () => {
    let filtered = schools

    if (searchTerm) {
      filtered = filtered.filter(
        (school) =>
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.state.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCity) {
      filtered = filtered.filter((school) => school.city === selectedCity)
    }

    if (selectedState) {
      filtered = filtered.filter((school) => school.state === selectedState)
    }

    setFilteredSchools(filtered)
  }

  const handleAddSchoolClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    try {
      setIsVerifying(true)
      // Get the current user's email from Supabase auth
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // If user is not logged in, redirect to login page
        toast({
          title: "Authentication Required",
          description: "Please sign in to add a new school.",
          variant: "destructive",
        })
        // You might want to redirect to login page here
        return
      }
      
      if (!user.email) {
        toast({
          title: "Email Required",
          description: "Your account doesn't have an email address.",
          variant: "destructive",
        })
        return
      }
      
      setUserEmail(user.email)
      
      // Send OTP to user's email
      await sendOtp(user.email)
      
      // Show OTP dialog
      setShowOtpDialog(true)
    } catch (error) {
      console.error("Error initiating OTP flow:", error)
      toast({
        title: "Error",
        description: "Failed to initiate verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOtpVerified = () => {
    // Redirect to add school page after successful verification
    window.location.href = "/add-school"
  }

  const uniqueCities = [...new Set(schools.map((school) => school.city))].sort()
  const uniqueStates = [...new Set(schools.map((school) => school.state))].sort()

  // Mock function - replace with actual implementation
  const sendOtp = async (email: string): Promise<void> => {
    // Implement your OTP sending logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${email}`,
        })
        resolve()
      }, 1000)
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-card border-b border-border/50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Educational Institutions</h1>
                <p className="text-muted-foreground text-pretty">Discover and explore schools in your area</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/add-school">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New School
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search schools by name, city, or state..." className="pl-10" disabled />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  disabled
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground opacity-50"
                >
                  <option>All Cities</option>
                </select>
                <select
                  disabled
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground opacity-50"
                >
                  <option>All States</option>
                </select>
              </div>
            </div>
          </div>
          <SchoolGridSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* OTP Verification Dialog */}
      <OtpVerificationDialog
        open={showOtpDialog}
        onOpenChange={setShowOtpDialog}
        onVerified={handleOtpVerified}
        email={userEmail}
      />
      
      {/* Header Section */}
      <div className="bg-card border-b border-border/50 animate-in fade-in-0 duration-500">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-in slide-in-from-left-4 duration-700">
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Educational Institutions</h1>
              <p className="text-muted-foreground text-pretty">Discover and explore schools in your area</p>
            </div>
            <div className="animate-in slide-in-from-right-4 duration-700">
              <Button
                onClick={handleAddSchoolClick}
                disabled={isVerifying}
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-200"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New School
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 animate-in slide-in-from-top-4 duration-500 delay-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
              <Input
                placeholder="Search schools by name, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:scale-[1.01]"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-primary/50"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-primary/50"
              >
                <option value="">All States</option>
                {uniqueStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground animate-in fade-in-0 duration-300 delay-300">
              Showing {filteredSchools.length} of {schools.length} schools
            </p>
            {(searchTerm || selectedCity || selectedState) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCity("")
                  setSelectedState("")
                }}
                className="animate-in slide-in-from-right-2 duration-300 hover:scale-105 transition-all"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-12 animate-in fade-in-0 zoom-in-95 duration-500">
            <div className="animate-bounce">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No schools found</h3>
            <p className="text-muted-foreground mb-4">
              {schools.length === 0 ? "No schools have been added yet." : "Try adjusting your search criteria."}
            </p>
            <Button 
              onClick={handleAddSchoolClick}
              disabled={isVerifying}
              className="hover:scale-105 transition-all duration-200"
            >
              {isVerifying ? "Verifying..." : "Add First School"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school, index) => (
              <Card
                key={school.id}
                className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 border-border/50 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "600ms",
                }}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {school.image ? (
                    <img
                      src={school.image || "/placeholder.svg"}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500">
                      <School className="h-12 w-12 text-primary/60 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* School Name */}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 text-balance group-hover:text-primary transition-colors duration-300">
                        {school.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                        >
                          {school.city}
                        </Badge>
                        <Badge variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
                          {school.state}
                        </Badge>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors duration-300" />
                      <p className="text-pretty">{school.address}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                        <a
                          href={`tel:${school.contact}`}
                          className="text-foreground hover:text-primary transition-colors duration-200 hover:underline"
                        >
                          {school.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                        <a
                          href={`mailto:${school.email_id}`}
                          className="text-foreground hover:text-primary transition-colors duration-200 truncate hover:underline"
                        >
                          {school.email_id}
                        </a>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent hover:scale-105"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
