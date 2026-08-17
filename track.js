module.exports = async (request, response) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return response.status(500).json({ error: 'Supabase environment variables are not configured' });
  }

  try {
    const upstream = await fetch(
      `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/pickmeal_events`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(request.body)
      }
    );

    if (!upstream.ok) {
      return response.status(upstream.status).json({ error: 'Supabase insert failed' });
    }
    return response.status(201).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: 'Event tracking failed' });
  }
};
