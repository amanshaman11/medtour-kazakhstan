import { notFound } from "next/navigation";
import {
  isProcedureCity,
  isProcedureCategory,
  getProcedure,
} from "@/lib/data/procedures";
import { ProcedureDetailView } from "@/components/procedures/ProcedureDetailView";

interface PageProps {
  params: Promise<{ city: string; category: string; slug: string }>;
}

export default async function ProcedureDetailPage({ params }: PageProps) {
  const { city, category, slug } = await params;
  if (!isProcedureCity(city) || !isProcedureCategory(category)) notFound();
  const procedure = getProcedure(category, slug);
  if (!procedure) notFound();
  return (
    <ProcedureDetailView city={city} categoryId={category} procedureId={slug} />
  );
}
