// Xero Seven — Email Sender Edge Function
// Sends emails via Resend API (Free: 3000 emails/month)
// Deploy as InsForge Edge Function

module.exports = async function(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { to, subject, html_body, from_name } = body;

    if (!to || !subject || !html_body) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, subject, html_body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use Resend API
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const emailPayload = {
      from: `${from_name || 'Xero Seven AI'} <onboarding@resend.dev>`,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html_body,
    };

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({
        error: 'Resend API error',
        details: resendResult
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Email sent to ${to}`,
      resend_id: resendResult.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
