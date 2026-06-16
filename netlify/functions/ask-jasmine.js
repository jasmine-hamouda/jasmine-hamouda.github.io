exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

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

  try {
    const { messages } = JSON.parse(event.body);
    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ reply: 'Invalid request.' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('No API key');
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Configuration error - please connect on LinkedIn.' }) };
    }

    // Filter to only user messages and build clean alternating history
    // Gemini requires: user, model, user, model... starting with user
    const userMessages = messages.filter(m => m.role === 'user');
    const assistantMessages = messages.filter(m => m.role === 'assistant');

    // Build strictly alternating contents starting with user
    const contents = [];
    const maxPairs = Math.max(userMessages.length, assistantMessages.length);
    
    for (let i = 0; i < userMessages.length; i++) {
      contents.push({ role: 'user', parts: [{ text: String(userMessages[i].content) }] });
      if (assistantMessages[i]) {
        contents.push({ role: 'model', parts: [{ text: String(assistantMessages[i].content) }] });
      }
    }

    // Make sure last message is from user
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      return { statusCode: 400, headers, body: JSON.stringify({ reply: 'No user message found.' }) };
    }

    console.log('Contents count:', contents.length);
    console.log('Last role:', contents[contents.length - 1].role);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: AJ_SYSTEM }] },
          contents,
          generationConfig: { maxOutputTokens: 400, temperature: 0.75 },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
          ]
        })
      }
    );

    const data = await res.json();
    console.log('Gemini status:', res.status);
    console.log('Gemini data:', JSON.stringify(data).slice(0, 800));

    if (!res.ok) {
      console.error('Gemini error:', data?.error?.message);
      return { statusCode: 200, headers, body: JSON.stringify({ reply: `Error ${res.status}: ${data?.error?.message || 'Unknown'} - please connect on LinkedIn.` }) };
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('No reply text. Finish reason:', data.candidates?.[0]?.finishReason);
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Error:', err.message);
    return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please connect on LinkedIn.' }) };
  }
};