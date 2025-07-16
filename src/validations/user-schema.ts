import { z } from 'zod/v4';

export const RegisterUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'O login deve ter no mínimo 3 caracteres')
      .max(30, 'O login deve ter no máximo 30 caracteres')
      .regex(/^[a-zA-Z0-9]+$/, 'Só são permitidos letras e números para o login'),
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres')
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%¨&*()_+]).+$/, 'Siga as instruções abaixo'),
    password_confirm: z.string(),
    email: z.email('Email inválido por favor verifique').trim(),
  })
  .refine(data => data.password === data.password_confirm, {
    path: ['password_confirm'],
    error: 'As senhas não coincidem',
  })
  .refine(data => data.password === data.password_confirm, {
    path: ['password'],
    error: 'As senhas não coincidem',
  });

export const LoginUserSchema = RegisterUserSchema.pick({ username: true, password: true });

export const UserProfileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(20, 'O nome deve ter no máximo 20 caracteres'),
  last_name: z.string().trim().max(60, 'O sobrenome deve ter no máximo 60 caracteres'),
  description: z.string().trim().max(400, 'A sua bio deve ter no máximo 400 caracteres'),
  favorite_recipe: z.string().trim().max(50, 'A receita favorita deve ter no máximo 50 caracteres'),
  birth_date: z.string(),
});
