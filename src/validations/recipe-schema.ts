import { z } from 'zod/v4';

export const RecipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .trim()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(300, 'O descrição deve ter no máximo 300 caracteres'),
  preparation_time: z
    .string()
    .trim()
    .regex(/^\d{2}:\d{2}:\d{2}$/, 'O tempo de preparo deve estar no formato 00:00:00 ou HH:mm:ss')
    .optional(),
  difficulty: z.enum(['E', 'M', 'H'], {
    error: 'O valor deve ser E (Fácil) ou M (Médio) ou H (Difícil)',
  }),
  servings: z.string().trim().max(25, 'Número de rendimento muito grande'),
  tips: z.string().trim(),
  categories: z.array(z.union([z.number(), z.string()])).optional(),
  ingredients: z.array(
    z.object({
      name: z.string().trim().min(1, 'Não deixe nenhum campo vazio'),
      quantity: z.string().trim().min(1, 'Não deixe nenhum campo vazio'),
    }),
  ),
  preparation_steps: z.array(
    z.object({
      step: z.string().trim().min(1, 'Não deixe nenhum campo vazio'),
    }),
  ),
  cover: z.file().optional(),
});
