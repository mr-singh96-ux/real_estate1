import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PropertyManagement } from "@/components/admin/property-management"

export default function AdminPropertiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <PropertyManagement />
        </main>
      </div>
    </div>
  )
}
