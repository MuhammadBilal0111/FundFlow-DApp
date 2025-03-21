import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-transparent border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Link href="/" className="flex justify-start items-center gap-3">
              <Image
                src="/assets/images/logo.png"
                alt="FlowFund"
                width="40"
                height="40"
                priority
                className="object-cover mt-2"
              />
              <h1 className="text-2xl font-sans font-bold">FundFlow</h1>
            </Link>
            <p className="max-w-xs mt-4 text-sm text-muted-foreground">
              Empowering innovators through decentralized crowdfunding. Connect,
              fund, and build the future together.
            </p>
            <div className="flex mt-8 space-x-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-800"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-800"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-800"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-800"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-purple-800"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Platform
              </h3>
              <div className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  How It Works
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Browse Projects
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Start a Project
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Supported Tokens
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Resources
              </h3>
              <div className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Tutorials
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  FAQs
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Legal
              </h3>
              <div className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-purple-800 block"
                >
                  Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FlowFund. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
