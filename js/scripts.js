let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, types: ['Fire']},
    {name: 'Pikachu', height: 0.4, types: ['Electric']}
];

// Loop through the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
    // Get the current Pokemon object
    let currentPokemon = pokemonList[i];

    // Print the name and height of the current Pokemon
    document.write(`<p><b>Name:</b> ${currentPokemon.name},  <b>Height:</b> ${currentPokemon.height}m </p><br>`);
}
