import { supabase } from "@/config/clients";
import { OnboardingRepository } from "../domain/OnboardingRepository";

export const createSupabaseOnboardinRepository = (): OnboardingRepository => {
  return { createCompany, createEmployee };
};

const createCompany = async (name: string, size: number) => {
  const { data, error } = await supabase.from("companies").insert({
    name,
    size
  });

  const company = data as { id: number } | null;

  if (error || !company) return null;

  return { id: company.id };
};

const createEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  userId: string,
  companyId: number
) => {
  const { data, error } = await supabase.from("employees").insert({
    firstName,
    lastName,
    email,
    userId
  });
};
