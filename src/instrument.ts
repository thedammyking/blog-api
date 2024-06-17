import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: Number(process.env.SENRTY_TRACES_SAMPLE_RATE),
  profilesSampleRate: Number(process.env.SENRTY_PROFILES_SAMPLE_RATE)
});
