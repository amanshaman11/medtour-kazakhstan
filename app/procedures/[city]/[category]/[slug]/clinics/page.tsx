import { notFound } from "next/navigation";
import {
  isProcedureCity,
  isProcedureCategory,
  getProcedure,
} from "@/lib/data/procedures";
import { ProcedureClinicSelectView } from "@/components/procedures/ProcedureClinicSelectView";

interface PageProps {
  params: Promise<{ city: string; category: string; slug: string }>;
}

export default async function ProcedureClinicsPage({ params }: PageProps) {
  const { city, category, slug } = await params;
  if (!isProcedureCity(city) || !isProcedureCategory(category)) notFound();
  const procedure = getProcedure(category, slug);
  if (!procedure) notFound();
  return (
    <ProcedureClinicSelectView
      city={city}
      categoryId={category}
      procedureId={slug}
    />
  );
}
