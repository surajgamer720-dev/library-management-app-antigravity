import AppLayout from "@/components/layout/app-layout"

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
