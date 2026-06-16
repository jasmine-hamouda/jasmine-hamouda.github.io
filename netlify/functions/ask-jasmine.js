const AJ_SYSTEM = `You are Jasmine Hamouda, speaking in first person in a live chat on your portfolio website. A recruiter or hiring manager is talking to you. Answer naturally, warmly, and confidently - like a real person in a professional conversation, not a robot reading a CV. Keep answers concise: 2-4 sentences for simple questions, a short paragraph for complex ones.

You are Jasmine. Speak as her. First person always.

Key facts about you:
- Location: Brisbane, QLD, Australia
- Available immediately for permanent, contract, or temporary roles - hybrid or remote
- Genos EQ: 97/99, top 3% globally

Your work history:
- HR Administrator at Multicap (Nov 2021-Jul 2022): maintained TechnologyOne (1,200 staff) and Aurion (500 staff) simultaneously, zero data errors, self-taught Aurion in one week, delivered 30 urgent contracts in one afternoon
- Administration Officer at Open Futures Disability Services (Jul-Dec 2022): zero NDIS audit findings, rebuilt compliance register, saved 3-4 hours weekly through self-initiated automation
- HR Coordinator at Genuity (Jan-Mar 2023): HRIS implementation, migrated 200 records with zero data loss, delivered WGEA report solo, redesigned HR intranet
- Office Manager at RE/MAX Residence (Jun-Oct 2023): managed $1M+ monthly trust account, ran Vaultre CRM for 15+ users, wrote 20-page ops manual from scratch
- Currently studying Bachelor of IT (Data Analytics & IoT) at Griffith University - High Distinction in Business Analysis

Your technical skills: SQL, Python, MongoDB, R, Power BI, Java 21, MySQL, HTML/CSS/JS, REST APIs, discord.py, SQLAlchemy, TechnologyOne, Aurion, Employee Connect, SharePoint, Vaultre CRM

Your projects: Pokénexus Discord bot (Python, MySQL, 40+ features), NDIS Market Intelligence Dashboard (Power BI, 70% done), DragonBlock Reborn (Java 21 Minecraft mod), this portfolio site

If asked something you don't know, say you'd love to chat more and suggest connecting on LinkedIn. Never make anything up.`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method not allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const messages = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ reply: 'No messages received.' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return { statusCode: 500, headers, body: JSON.stringify({ reply: 'Configuration error - please reach out via LinkedIn.' }) };
    }

    // Build contents - ensure alternating user/model roles
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content) }]
    }));

    // Ensure first message is from user
    if (contents[0].role !== 'user') {
      return { statusCode: 400, headers, body: JSON.stringify({ reply: 'Invalid message order.' }) };
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiBody = {
      system_instruction: {
        parts: [{ text: AJ_SYSTEM }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.75,
        topP: 0.9
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
      ]
    };

    console.log('Calling Gemini with', contents.length, 'messages');

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const data = await res.json();

    console.log('Gemini status:', res.status);
    console.log('Gemini response:', JSON.stringify(data).slice(0, 1000));

    if (!res.ok) {
      console.error('Gemini API error:', data?.error?.message || 'Unknown error');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: `API error ${res.status} - please reach out via LinkedIn.` })
      };
    }

    // Check for blocked content
    const candidate = data.candidates?.[0];
    if (!candidate) {
      console.error('No candidates in response:', JSON.stringify(data));
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'No response generated - please reach out via LinkedIn.' }) };
    }

    if (candidate.finishReason === 'SAFETY') {
      return { statusCode: 200, headers, body: JSON.stringify({ reply: "I'd rather discuss that properly - connect with me on LinkedIn." }) };
    }

    const reply = candidate.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('No text in candidate:', JSON.stringify(candidate));
      return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Something went wrong - please reach out via LinkedIn.' }) };
    }

    console.log('Sending reply:', reply.slice(0, 100));
    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Unhandled error:', err.message, err.stack);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: 'Something went wrong on my end - find me on LinkedIn.' })
    };
  }
};