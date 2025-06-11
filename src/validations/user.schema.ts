import { z } from 'zod/v4';

export const RegisterUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'O login deve ter no mínimo 3 caracteres')
      .max(30, 'O login deve ter na máximo 30 caracteres')
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
