exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { statusCode: 500, headers, body: 'No API key' };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );
  const data = await res.json();

  const models = data.models
    ?.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
    ?.map(m => m.name) || [];

  return { statusCode: 200, headers, body: JSON.stringify({ models }) };
};