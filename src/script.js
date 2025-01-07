const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const gallery = document.getElementById("gallery");

const ACCESS_KEY = "WyFrKyzcYZsNqgcI8RJU4E1swiQscBLXVJZtkJWUvfQ";

async function searchImages(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
    );
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
  }
}

function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach((image) => {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description || "Sem descrição";

    const titleElement = document.createElement("p");
    titleElement.textContent = image.alt_description || "Sem título";

    imageContainer.appendChild(imgElement);
    imageContainer.appendChild(titleElement);
    gallery.appendChild(imageContainer);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchImages(query);
  }
});
