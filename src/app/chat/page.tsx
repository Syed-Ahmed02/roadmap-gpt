"use client"
import { Chat } from "@/components/Chat"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { Sidebar, SidebarBody, SidebarLink, Logo, LogoIcon } from "@/components/ui/sidebar"
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

function ChatContent() {
  const params = useSearchParams()
  const skill = params.get("skill")
  const skillLevel = params.get("skillLevel")
  const time = params.get("time")

  const initialPrompt = `Generate a roadmap to learn ${skill} at a ${skillLevel} level in ${time}. The roadmap should be easy to follow and should be able to be completed in the given time frame.`

  return <Chat initialPrompt={initialPrompt} />
}

export default function ChatPage() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SidebarBody>
      </Sidebar>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  )
}

