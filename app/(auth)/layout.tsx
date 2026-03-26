import SiteHeader from "@/components/site-header";

export default function AuthGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="relative min-h-0 flex-1 pt-14">
        <div className="fixed inset-0 flex items-center justify-center pt-14">
          <div className="flex w-full max-w-md flex-col items-center gap-6 px-4 text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
