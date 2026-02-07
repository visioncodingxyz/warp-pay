"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  )
}
