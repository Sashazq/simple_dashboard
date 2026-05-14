import { NotificationProvider } from "@/app/features/notifications/context/NotificationContext";
import { NotificationContainer } from "@/app/features/notifications/components/NotificationContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationProvider>
        <div className="flex h-full">
          <aside className="w-64 bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
            <nav className="space-y-4">
              <a
                href="/transactions"
                className="block hover:text-blue-400 transition-colors"
              >
                Transactions
              </a>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
        <NotificationContainer />
      </NotificationProvider>
    </>
  );
}
