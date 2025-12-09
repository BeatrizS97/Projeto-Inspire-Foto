// /api/unsplash.js
const axios = require('axios');

export default async function handler(req, res) {
  try {
    const { query = 'landscape', orientation = 'landscape', per_page = 12 } = req.query;

    const CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;
    if (!CLIENT_ID) {
      console.error('❌ Chave da API do Unsplash não configurada!');
      return res.status(500).json({ error: 'Chave da API do Unsplash não configurada.' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        orientation,
        per_page: parseInt(per_page),
        page: Math.floor(Math.random() * 10) + 1,
      },
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });

    const images = response.data.results.map(photo => ({
      id: photo.id,
      download_url: photo.urls.regular,
    }));

    res.status(200).json({ results: images });

  } catch (error) {
    console.error('🚨 Erro na função:', error.message);
    res.status(500).json({ error: 'Falha ao carregar imagens.' });
  }
}