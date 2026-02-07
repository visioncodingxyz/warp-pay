"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TransactionsPage } from "@/components/dashboard/transactions-page"

export default function TransactionsPageRoute() {
  return (
    <DashboardLayout>
      <TransactionsPage />
    </DashboardLayout>
  )
}
