async function carregarImagens() {
  try {
    loading.value = true;

    const res = await axios.get("/api/unsplash", {
      params: {
        query: "landscape",
        orientation: "landscape",
        per_page: 12,
        page: Math.floor(Math.random() * 10) + 1,
      },
    });

    console.log('Resposta da API:', res.data); // 👈 Adicione esta linha!

    imagens.value = res.data.results
      .filter(photo => photo.urls && photo.urls.regular)
      .map(photo => ({
        id: photo.id,
        download_url: photo.urls.regular,
      }));

  } catch (error) {
    erro.value = "Erro ao carregar paisagens. Tente novamente.";
    console.error("Erro na API:", error);
  } finally {
    loading.value = false;
  }
}git