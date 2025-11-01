import { Logout } from "@/components/logout";
import { Notebooks } from "@/components/notebooks";
import { PageWrapper } from "@/components/page-wrapper";
import { getUserNotebooks } from "@/server/notebook";


export default async function DashboardPage() {

  const notebooks = await getUserNotebooks()

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {notebooks.success &&
        notebooks.notebooks?.map((notebook) => (
          <div key={notebook.id}>
            <h2>{notebook.name}</h2>
          </div>
        ))}
      
      {notebooks.success && notebooks.notebooks.length === 0 && (
        <p>You have no notebooks. Start by creating one!</p>
      )}

      {!notebooks.success && (
        <p>Error loading notebooks: {notebooks.message}</p>
      )}
    </PageWrapper>
  );
}