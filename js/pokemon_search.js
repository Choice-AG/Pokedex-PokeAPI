const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector(
    "[data-poke-img-container]"
);
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");
let url = "https://pokeapi.co/api/v2/pokemon/";

const typeColors = {
    electric: "#F7D02C",
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    ice: "#96D9D6",
    rock: "#B6A136",
    flying: "#A98FF3",
    grass: "#7AC74C",
    psychic: "#F95587",
    ghost: "#735797",
    bug: "#A6B91A",
    poison: "#A33EA1",
    ground: "#E2BF65",
    dragon: "#6F35FC",
    steel: "#B7B7CE",
    fighting: "#C22E28",
    dark: "#705746",
    fairy: "#D685AD",
    default: "#2A1A1F",
};

const searchPokemon = (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`${url}${value.toLowerCase()}`)
        .then((data) => data.json())
        .then((response) => renderPokemonData(response))
        .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
    const sprite = data.sprites.other["official-artwork"].front_default;
    const { stats, types } = data;

    pokeName.textContent = `${data.name
        .toUpperCase()}`;
    pokeImg.setAttribute("src", sprite);
    pokeId.textContent = `Nº ${data.id}`;
    console.log(data);
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
};

const setCardColor = (types) => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1]
        ? typeColors[types[1].type.name]
        : typeColors.default;
    //pokeImg.style.backgroundColor = `linear-gradient(${colorOne} 25%, ${colorTwo} 75%)`;
};

const renderPokemonTypes = (types) => {
    pokeTypes.innerHTML = "";
    types.forEach((type) => {
        const typeElementText = document.createElement("div");
        typeElementText.style.backgroundColor =
            typeColors[type.type.name];
        typeElementText.textContent = `${type.type.name
            .toUpperCase()}`;
        pokeTypes.appendChild(typeElementText);
    });
};

const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = "";
    stats.forEach((stat) => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = `${stat.stat.name
            .charAt(0)
            .toUpperCase()}${stat.stat.name.substr(1, 200)}`;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
};
