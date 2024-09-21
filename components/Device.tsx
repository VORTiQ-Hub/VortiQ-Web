/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WhiuJr6JfGf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComputerIcon, File, LaptopIcon, NetworkIcon, SmartphoneIcon, TabletIcon } from "lucide-react"

export default function Device() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
          <NetworkIcon className="w-6 h-6" />
          <span>Device Dashboard</span>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <File className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter Devices</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>Desktops</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Laptops</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Mobiles</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Tablets</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value="latest">
              <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ip">IP Address</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ComputerIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Desktop 1</CardTitle>
                <CardDescription>192.168.1.100</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>2h 15m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Desktop</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <LaptopIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Laptop 1</CardTitle>
                <CardDescription>192.168.1.101</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>1h 45m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Laptop</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <SmartphoneIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Mobile 1</CardTitle>
                <CardDescription>192.168.1.102</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>30m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Mobile</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <TabletIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Tablet 1</CardTitle>
                <CardDescription>192.168.1.103</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>1h 10m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Tablet</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ComputerIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Desktop 2</CardTitle>
                <CardDescription>192.168.1.104</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>3h 5m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Desktop</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <LaptopIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Laptop 2</CardTitle>
                <CardDescription>192.168.1.105</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>2h 20m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Laptop</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <SmartphoneIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Mobile 2</CardTitle>
                <CardDescription>192.168.1.106</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>45m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Mobile</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <TabletIcon className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>Tablet 2</CardTitle>
                <CardDescription>192.168.1.107</CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection Time</span>
                <span>1h 35m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type</span>
                <span>Tablet</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}