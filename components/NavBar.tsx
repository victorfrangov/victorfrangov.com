"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { ScrollProgress } from "./ui/scroll-progress"
import { TypingAnimation } from "./ui/typing-animation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Dim backdrop behind the dropdown; nav and menu stay readable */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <Navbar
        isBordered
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur"
        classNames={{
          wrapper: "px-4 sm:px-6",
          // Limit mobile menu height and make it opaque
          menu: "top-[var(--navbar-height)] max-h-[55vh] overflow-auto bg-background border-b border-border/60 shadow-lg",
        }}
      >
        <ScrollProgress barClassName="bg-blue-500" />

        <NavbarContent justify="start">
          <NavbarBrand className="min-w-0">
            <Link href={`/${locale}`} className="truncate">
              <TypingAnimation
                className="text-sm sm:text-base text-muted-foreground"
                words={[
                  t("nav.greeting"),
                  t("nav.greeting1"),
                  t("nav.greeting2"),
                  t("nav.greeting3"),
                  t("nav.greeting4"),
                ]}
                loop={false}
                cursorStyle="underscore"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop links */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link href="#expertise" className="hover:text-foreground">
              {t("nav.expertise")}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#projects" className="hover:text-foreground">
              {t("nav.projects")}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#contact" className="hover:text-foreground">
              {t("nav.contact")}
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3">
          {/* Mobile toggle with icons */}
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            icon={isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          />
          <LanguageSwitcher />
          <AnimatedThemeToggler />
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href="#expertise" onClick={() => setIsMenuOpen(false)} className="text-base">
              {t("nav.expertise")}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#projects" onClick={() => setIsMenuOpen(false)} className="text-base">
              {t("nav.projects")}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-base">
              {t("nav.contact")}
            </Link>
          </NavbarMenuItem>

          <div className="mt-4 flex items-center gap-3 px-2">
            <LanguageSwitcher />
            <AnimatedThemeToggler />
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  )
}