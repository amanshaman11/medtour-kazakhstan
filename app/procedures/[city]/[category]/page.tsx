import { notFound } from "next/navigation";
import {
  isProcedureCity,
  isProcedureCategory,
} from "@/lib/data/procedures";
import { ProceduresCategoryView } from "@/components/procedures/ProceduresCategoryView";

interface PageProps {
  params: Promise<{ city: string; category: string }>;
}

export default async function ProceduresCategoryPage({ params }: PageProps) {
  const { city, category } = await params;
  if (!isProcedureCity(city) || !isProcedureCategory(category)) notFound();
  return <ProceduresCategoryView city={city} categoryId={category} />;
}
