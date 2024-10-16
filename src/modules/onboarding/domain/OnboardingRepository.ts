export interface OnboardingRepository {
  createCompany: (name: string, size: number) => Promise<{ id: number } | null>;
  createEmployee: (
    firstName: string,
    lastName: string,
    email: string,
    userId: string,
    companyId: number
  ) => Promise<void>;
}
