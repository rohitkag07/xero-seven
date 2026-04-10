import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://4s4gr7gr.us-east.insforge.app',
  anonKey: 'ik_206eaa1daf90ae4b4ff9b780da244aa1',
});

async function run() {
  const chatResponse = await insforge.ai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an AI.' },
      { role: 'user', content: 'test' }
    ]
  });
  console.log("Output:", JSON.stringify(chatResponse, null, 2));
}
run();
