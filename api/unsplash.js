// /api/unsplash.js
import axios from 'axios';

export default async function handler(req, res) {
  // Valide os parâmetros (opcional, mas recomendado)
  const { query = 'landscape', orientation = 'landscape', per_page = 12 } = req.query;

  try {
    // 🔐 Sua chave secreta aqui — NUNCA vai pro frontend!
    const CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

    if (!CLIENT_ID) {
      return res.status(500).json({ error: 'Client ID não configurado.' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        orientation,
        per_page: parseInt(per_page),
        page: Math.floor(Math.random() * 10) + 1, // varia as imagens
      },
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });

    // Retorne apenas os dados necessários para o frontend
    const images = response.data.results.map(photo => ({
      id: photo.id,
      download_url: photo.urls.regular,
    }));

    res.status(200).json({ results: images });

  } catch (error) {
    console.error('Erro ao buscar imagens:', error.message);
    res.status(500).json({ error: 'Falha ao carregar imagens. Tente novamente.' });
  }
}