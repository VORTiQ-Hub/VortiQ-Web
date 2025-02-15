import { LayoutDashboard, Users, Menu, Settings, MonitorSpeaker, BarChart } from "lucide-react";

export const navItems = {
    "Admin": [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Devices", href: "/dashboard/devices", icon: MonitorSpeaker },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    "User": [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Device Dashboard", href: "/dashboard/devices", icon: MonitorSpeaker },
        { name: "Analytics", href: "/dashboard/user/analytics", icon: BarChart },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        // { name: 'Help', href: '/user/help', icon: HelpCircle },
    ],
}