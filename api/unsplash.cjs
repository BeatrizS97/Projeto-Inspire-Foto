const axios = require('axios');

export default async function handler(req, res) {
  try {
    const CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

    if (!CLIENT_ID) {
      return res.status(500).json({ error: 'Chave não configurada no Vercel' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: 'landscape',
        orientation: 'landscape',
        per_page: 6,
      },
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });

    const results = response.data.results.map(photo => ({
      id: photo.id,
      download_url: photo.urls.regular,
    }));

    res.status(200).json({ results });

  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor', message: error.message });
  }
}