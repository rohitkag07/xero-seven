import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://4s4gr7gr.us-east.insforge.app',
  anonKey: 'ik_206eaa1daf90ae4b4ff9b780da244aa1',
});

async function checkDB() {
  const { data, error } = await insforge.database
    .from('agency_proposals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) console.error("DB Error:", error.message);
  else console.log("LATEST PROPOSAL:", JSON.stringify(data, null, 2));
}

checkDB();
