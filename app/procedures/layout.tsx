import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageAmbience } from "@/components/ui/PageAmbience";

export default function ProceduresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageAmbience />
      <Navbar />
      <main className="relative z-10 min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  );
}
