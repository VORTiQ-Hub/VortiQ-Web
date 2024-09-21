import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingCart, Users, BarChart, Settings, HelpCircle, Menu } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export default function UserSidePanel() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
        pathname === item.href ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  )

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <LayoutDashboard className="h-6 w-6" />
          <span className="">Admin Dashboard</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-1">
          {navItems.map((item, index) => (
            <NavLink key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <Image
            alt="Avatar"
            className="rounded-full"
            height="40"
            src="/placeholder.svg?height=40&width=40"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">john@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
        <SidebarContent />
      </div>
    </>
  )
}   