import Link from "next/link"
import { School, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <School className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">SchoolHub</h3>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              A comprehensive platform for managing and discovering educational institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/schools"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                View Schools
              </Link>
              <Link
                href="/add-school"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Add School
              </Link>
            </nav>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">About</h4>
            <p className="text-sm text-muted-foreground text-pretty">
               Efficient school data management and discovery. 
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using Next.js & Supabase</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SchoolHub Management System. Built for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
