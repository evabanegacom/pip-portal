import { z } from 'zod';

export const createPipSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Role is required'),
  group: z.string().min(1, 'Group is required'),
  supervisor: z.string().min(1, 'Supervisor is required'),
  pipType: z.string().min(1, 'PIP Type is required'),
  expectation: z.string().min(10, 'Expectation must be at least 10 characters'),
  kpis: z
    .array(
      z.object({
        description: z.string().min(5, 'KPI description must be at least 5 characters'),
      })
    )
    .min(1, 'At least one KPI is required'),
});

export type FormData = z.infer<typeof createPipSchema>;