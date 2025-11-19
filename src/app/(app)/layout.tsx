import { SiteHeader } from "@/components/layouts/site-header";

const user = null;

export default function AppLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="">
      <SiteHeader user={user} />
      <main>
        {children}
      </main>
      
    </div>
  );
}
