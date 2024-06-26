import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, ZodError } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform(val => {
    return val === 'true';
  })
  .default('false');

const EnvSchema = z.object({
  MODE: z.string(),
  PROD: z.boolean(),
  DEV: z.boolean(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  DATABASE_URL: z.string(),
  DB_SEEDING: stringBoolean,
  DB_MIGRATING: stringBoolean,
  SEED_SUPER_ADMIN_ID: z.string(),
  SEED_EDITOR_ID: z.string(),
  SEED_READER_ID: z.string(),
  CORS_WHITELIST: z.string(),
  SENTRY_DNS: z.string(),
  SENRTY_TRACES_SAMPLE_RATE: z.string(),
  SENRTY_PROFILES_SAMPLE_RATE: z.string()
});

// eslint-disable-next-line no-redeclare
export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

const allEnv = {
  ...process.env,
  MODE: process.env.NODE_ENV,
  PROD: process.env.NODE_ENV === 'production',
  DEV: process.env.NODE_ENV === 'development'
} as const;

try {
  EnvSchema.parse(allEnv);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach(issue => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(allEnv);
