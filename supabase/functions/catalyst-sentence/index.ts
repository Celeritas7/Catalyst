// Catalyst ✨ sentences from your words: Supabase Edge Function. The logic is in core.ts (tested outside Supabase);
// this file only wires in the real Supabase clients and Deno's environment. Same pattern as KG Chart's kg-pronounce.
// Secrets (Supabase → Edge Functions → Secrets): ANTHROPIC_API_KEY, optional CATALYST_MODEL (default claude-sonnet-5-5).
// SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
// Deploy with verify_jwt off: the browser's CORS preflight has no token; core.ts checks the login itself.
//   supabase functions deploy catalyst-sentence --no-verify-jwt
import { createClient } from 'npm:@supabase/supabase-js@2';
import { makeHandler } from './core.ts';

const env = (k: string) => Deno.env.get(k);
const url = env('SUPABASE_URL')!;

Deno.serve(makeHandler({
  env,
  fetch,
  userClient: (authHeader: string) => createClient(url, env('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } }, auth: { persistSession: false },
  }),
  adminClient: () => createClient(url, env('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } }),
}));
