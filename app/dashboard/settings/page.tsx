"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SettingsPage } from "@/components/dashboard/settings-page"

export default function SettingsPageRoute() {
  return (
    <DashboardLayout>
      <SettingsPage />
    </DashboardLayout>
  )
}
