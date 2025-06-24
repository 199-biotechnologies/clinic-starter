"use client"

import * as React from "react"
import { useState } from "react"

import Link from "next/link"

import { Menu } from "lucide-react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useTranslations, useLocale } from "@/i18n/client"
import { createLocalizedHref, usePathname } from "@/i18n/navigation"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { applyScrollbarPadding } from "@/lib/scrollbar-gutter-fallback"
import { cn } from "@/lib/utils"

// ListItem component for navigation dropdowns
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()

  return (
    <nav className="fixed top-0 w-screen bg-background bg-opacity-80 backdrop-blur-md z-50 border-b">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo - Always left */}
        <Link href={createLocalizedHref("/", locale)} className="font-display text-2xl">
          {t("site_name")}
        </Link>

        {/* Desktop Navigation with NavigationMenu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav_services")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={createLocalizedHref("/services", locale)}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {t("services_title")}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {t("services_description")}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href={createLocalizedHref("/services#general-health", locale)} title={t("service_general_health")}>
                    {t("service_general_health_desc")}
                  </ListItem>
                  <ListItem href={createLocalizedHref("/services#urgent-care", locale)} title={t("service_urgent_care")}>
                    {t("service_urgent_care_desc")}
                  </ListItem>
                  <ListItem href={createLocalizedHref("/services#preventive-care", locale)} title={t("service_preventive_care")}>
                    {t("service_preventive_care_desc")}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Mega Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav_about")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem
                    title={t("about_our_mission")}
                    href={createLocalizedHref("/about", locale)}
                  >
                    {t("about_mission_desc")}
                  </ListItem>
                  <ListItem
                    title={t("about_our_team")}
                    href={createLocalizedHref("/about#team", locale)}
                  >
                    {t("about_team_desc")}
                  </ListItem>
                  <ListItem
                    title={t("about_facilities")}
                    href={createLocalizedHref("/about#facilities", locale)}
                  >
                    {t("about_facilities_desc")}
                  </ListItem>
                  <ListItem
                    title={t("about_technology")}
                    href={createLocalizedHref("/about#technology", locale)}
                  >
                    {t("about_technology_desc")}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Simple Links */}
            <NavigationMenuItem>
              <Link href={createLocalizedHref("/pricing", locale)} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t("nav_pricing")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Contact Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav_contact")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px]">
                  <ListItem
                    title={t("contact_book_appointment")}
                    href={createLocalizedHref("/contact", locale)}
                  >
                    {t("contact_book_desc")}
                  </ListItem>
                  <ListItem
                    title={t("contact_location")}
                    href={createLocalizedHref("/contact#location", locale)}
                  >
                    {t("contact_location_desc")}
                  </ListItem>
                  <ListItem
                    title={t("contact_emergency")}
                    href={createLocalizedHref("/contact#emergency", locale)}
                  >
                    {t("contact_emergency_desc")}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Theme Toggle and Language Switcher - Right */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Menu - Right */}
        <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open)
          applyScrollbarPadding(open)
        }}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("nav_toggle_menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-display text-xl">{t("nav_menu")}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-1 mt-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={createLocalizedHref(item.href, locale)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Theme Toggle and Language Switcher - Bottom of sheet */}
            <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </nav>
  )
}