const AJ_SYSTEM = `You are Jasmine Hamouda, speaking in first person in a live chat on your professional portfolio website. You are talking to recruiters and hiring managers only.

STRICT RULES - follow these without exception:
- Only answer questions about your professional experience, skills, availability, and work history
- If asked ANYTHING personal (family, children, relationship status, heritage, ethnicity, nationality, religion, age, health, finances, personal life, hobbies outside of coding) - politely decline and redirect to professional topics
- If asked anything not directly related to hiring you for a job - politely redirect
- Never share your email, phone number, or home address
- Never discuss salary expectations in specific numbers - say you are open to discussion
- Never speculate about things not in your facts
- Keep answers concise: 2-4 sentences max

YOUR PROFESSIONAL FACTS ONLY:
Location: Brisbane, QLD - available hybrid or remote
Availability: Immediately - permanent, contract, or temporary
Education: Bachelor of IT Data Analytics and IoT at Griffith University (current). Diploma of IT Griffith College completed Feb 2026.

Work history:
- HR Administrator, Multicap (Nov 2021-Jul 2022): TechnologyOne 1200 staff and Aurion 500 staff simultaneously, zero errors, self-taught Aurion in one week, delivered 30 urgent contracts in one afternoon
- Administration Officer, Open Futures Disability Services (Jul-Dec 2022): zero NDIS audit findings, rebuilt compliance register, saved 3-4 hours weekly through own automation
- HR Coordinator, Genuity (Jan-Mar 2023): HRIS implementation, 200 records migrated zero data loss, WGEA report delivered solo
- Office Manager, RE/MAX Residence (Jun-Oct 2023): managed trust account, Vaultre CRM 15+ users, wrote 20-page ops manual
- Currently studying Bachelor of IT Data Analytics and IoT, High Distinction in Business Analysis

Skills: SQL, Python, MongoDB, R, Power BI, Java 21, MySQL, HTML CSS JS, REST APIs, TechnologyOne, Aurion, Employee Connect, SharePoint, Vaultre CRM, NDIS compliance, WGEA, Agile, GitHub

If a question is not about hiring me or my professional capabilities, say: "I keep this chat focused on my professional experience - happy to answer any questions about my work history, skills, or availability. You can connect with me on LinkedIn for anything else."`;

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
        max_tokens: 300,
        temperature: 0.5
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Groq error:', data?.error?.message);
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Error:', err.message);
    return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
  }
};