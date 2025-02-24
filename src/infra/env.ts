import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().optional().default(3333),
  JWT_SECRET: z.string(),
  JWT_PRIVATE_KEY: z.string().base64(),
  JWT_PUBLIC_KEY: z.string().base64(),
  // OPENAI_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export type Env = z.infer<typeof envSchema>

export const env = _env.data
