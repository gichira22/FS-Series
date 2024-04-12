document.addEventListener("DOMContentLoaded", function () {
  const characterList = document.getElementById("characterList");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const favoritesButton = document.getElementById("favoritesButton");
  const favoritesContainer = document.getElementById("favoritesContainer");

  function navigateTo(page) {
    console.log("Navigating to:", page);
  }
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  // Fetch character data from API
  fetch("https://finalspaceapi.com/api/v0/character/")
    .then((response) => response.json())
    .then((data) => {
      displayCharacters(data);

      // Add event listener for search button
      searchButton.addEventListener("click", function () {
        searchCharacters();
      });

      // Add event listener for favorites button
      favoritesButton.addEventListener("click", function () {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        displayFavorites(favorites);
      });
    })
    .catch((error) => console.error("Error fetching character data:", error));

  // Function to search characters
  function searchCharacters() {
    const searchString = searchInput.value.toLowerCase();
    fetch("https://finalspaceapi.com/api/v0/character/")
      .then((response) => response.json())
      .then((data) => {
        const filteredCharacters = data.filter((character) =>
          character.name.toLowerCase().includes(searchString)
        );
        displayCharacters(filteredCharacters);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Function to display characters
  function displayCharacters(characters) {
    characterList.innerHTML = "";
    characters.forEach((character) => {
      const characterCard = document.createElement("div");
      characterCard.classList.add("characterCard");

      const characterImage = document.createElement("img");
      characterImage.src = character.img_url;
      characterImage.alt = character.name;

      const characterDetails = document.createElement("div");
      characterDetails.classList.add("characterDetails");

      const characterName = document.createElement("h2");
      characterName.textContent = character.name;

      const characterStatus = document.createElement("h4");
      characterStatus.textContent = `Status: ${character.status}`;

      const characterSpecies = document.createElement("p");
      characterSpecies.textContent = `Species: ${character.species}`;

      const characterGender = document.createElement("h4");
      characterGender.textContent = `Gender: ${character.gender}`;

      const characterHair = document.createElement("h4");
      characterHair.textContent = `Hair: ${character.hair}`;

      const characterAlias = document.createElement("p");
      characterAlias.textContent = `Alias: ${character.alias}`;

      const favoriteButton = document.createElement("button");
      favoriteButton.textContent = "Favorite";
      favoriteButton.addEventListener("click", function () {
        addToFavorites(character);
      });

      characterDetails.appendChild(characterName);
      characterDetails.appendChild(characterStatus);
      characterDetails.appendChild(characterSpecies);
      characterDetails.appendChild(characterGender);
      characterDetails.appendChild(characterHair);
      characterDetails.appendChild(characterAlias);
      characterDetails.appendChild(favoriteButton);
      characterCard.appendChild(characterImage);
      characterCard.appendChild(characterDetails);
      characterList.appendChild(characterCard);
    });
  }

  // Function to add character to favorites
  function addToFavorites(character) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(character);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${character.name} added to favorites!`);
  }

  // Function to display favorites
  function displayFavorites(favorites) {
    favoritesContainer.innerHTML = "";
    favorites.forEach((character) => {
      const favoriteItem = document.createElement("div");
      favoriteItem.textContent = character.name;
      favoritesContainer.appendChild(favoriteItem);
    });
  }
});
