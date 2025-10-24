// Använd det öppna Pokémon-API:t för att hämta och visa en lista på Pokémon. När du klickar på en Pokémon i listan ska detaljer om den visas under — som typ, höjd och vikt.
// Lista Pokémon: https://pokeapi.co/api/v2/pokemon?limit=10
// Ger en lista på 10 Pokémon med namn och URL till detaljer.
// Pokémon-detaljer: Varje Pokémon i listan har en url-egenskap som du kan använda för att hämta detaljer (typ, höjd, vikt osv).

showPokemonList()

//Återanvändbar fetch-funktion
async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Något gick fel: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Fel vid hämtning:`, error)
    }
}

//Hämta ul-lista från HTML
const pokemonContainer = document.querySelector("ul")

//Använd fetch-funktion för pokemon-API
async function showPokemonList() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10"
    const data = await fetchData(url)

    if(data) {
        data.results.forEach(pokemonData => {
            const pokemon = document.createElement("li")
            pokemon.innerHTML = `namn: ${pokemonData.name}<br>Länk till detaljer: ${pokemonData.url}`
            pokemonContainer.appendChild(pokemon)

            pokemon.dataset.url = pokemonData.url
        });
    }
    console.log(data)
}

//Visa info för pokemon vid klick
pokemonContainer.addEventListener("click", (event) => {
    if(event.target.tagName === "LI") {
        getPokemonDetails()
        async function getPokemonDetails() {
            let url = event.target.dataset.url
            const data = await fetchData(url)

            if(data) {
                if(event.target.querySelector("ul")) {
                    event.target.querySelector("ul").remove() //Ta bort infon om den redan finns (toggle)
                } else {
                    const pokemonDetails = document.createElement("ul")
                    event.target.appendChild(pokemonDetails)

                    const pokemonHeight = document.createElement("li")
                    pokemonHeight.textContent = `Höjd: ${data.height /10} m`
                    pokemonDetails.appendChild(pokemonHeight)

                    const pokemonWeight = document.createElement("li")
                    pokemonWeight.textContent = `Vikt: ${data.weight /10} kg`
                    pokemonDetails.appendChild(pokemonWeight)
                }
            }
        }
    }
})