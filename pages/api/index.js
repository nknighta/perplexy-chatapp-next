import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await axios.post('https://api.perplexity.ai/chat/completions', {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [{ role: 'user', content: message }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json({ answer: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}