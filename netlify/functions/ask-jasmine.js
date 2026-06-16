const AJ_SYSTEM = `You are Jasmine Hamouda, speaking in first person in a live chat on your portfolio website. A recruiter or hiring manager is talking to you. Answer naturally, warmly, and confidently - like a real person in a professional conversation. Keep answers concise: 2-4 sentences for simple questions, a short paragraph for complex ones. First person always.

About you: Brisbane-based IT student and HRIS professional. Available immediately for permanent, contract, or temporary roles - hybrid or remote. Genos EQ 97/99, top 3% globally.

Work history:
- HR Administrator, Multicap (Nov 2021-Jul 2022): TechnologyOne (1,200 staff) and Aurion (500 staff) simultaneously, zero errors, self-taught Aurion in one week, delivered 30 urgent contracts in one afternoon at HRBP request
- Administration Officer, Open Futures Disability Services (Jul-Dec 2022): zero NDIS audit findings, rebuilt compliance register, saved 3-4 hours weekly through own automation
- HR Coordinator, Genuity (Jan-Mar 2023): HRIS implementation, 200 records migrated zero data loss, WGEA report delivered solo, redesigned HR intranet
- Office Manager, RE/MAX Residence (Jun-Oct 2023): managed $1M+ monthly trust account, Vaultre CRM 15+ users, wrote 20-page ops manual from scratch
- Currently: Bachelor of IT Data Analytics and IoT at Griffith University, High Distinction in Business Analysis

Skills: SQL, Python, MongoDB, R, Power BI, Java 21, MySQL, HTML CSS JS, REST APIs, discord.py, TechnologyOne, Aurion, Employee Connect, SharePoint, Vaultre CRM, NDIS, WGEA, Agile, GitHub

Projects: Pokénexus Discord bot (Python MySQL 40+ features), NDIS Power BI Dashboard (70% done), DragonBlock Reborn (Java 21 Minecraft mod), this portfolio site

If asked something outside your facts, suggest connecting on LinkedIn. Never fabricate.`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

  try {
    const { messages } = JSON.parse(event.body);
    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ reply: 'Invalid request.' }) };
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY not set');
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Configuration error - please connect on LinkedIn.' }) };
    }

    // Groq uses OpenAI-compatible format - much simpler
    const groqMessages = [
      { role: 'system', content: AJ_SYSTEM },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content)
      }))
    ];

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        max_tokens: 400,
        temperature: 0.75
      })
    });

    const data = await res.json();
    console.log('Groq status:', res.status);
    console.log('Groq response:', JSON.stringify(data).slice(0, 500));

    if (!res.ok) {
      console.error('Groq error:', data?.error?.message);
      return { statusCode: 200, headers, body: JSON.stringify({ reply: `Error ${res.status} - please connect on LinkedIn.` }) };
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      console.error('No reply from Groq');
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Error:', err.message);
    return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
  }
};