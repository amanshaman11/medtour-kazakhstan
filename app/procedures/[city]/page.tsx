import { notFound } from "next/navigation";
import { isProcedureCity } from "@/lib/data/procedures";
import { ProceduresCityView } from "@/components/procedures/ProceduresCityView";

interface PageProps {
  params: Promise<{ city: string }>;
}

export default async function ProceduresCityPage({ params }: PageProps) {
  const { city } = await params;
  if (!isProcedureCity(city)) notFound();
  return <ProceduresCityView city={city} />;
}
