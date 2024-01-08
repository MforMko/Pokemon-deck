let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, types: ['Fire']},
    {name: 'Pikachu', height: 0.4, types: ['Electric']}
];

// Loop through the pokemonList array
/*for (let i = 0; i < pokemonList.length; i++) {
    // Get the current Pokemon object
    let currentPokemon = pokemonList[i];
    //conditional to check height & make a remark
    if (pokemonList[i].height > 0.6){
        document.write(`<p><b>Name:</b> ${currentPokemon.name}  <b>Height:</b> ${currentPokemon.height}m (Wow, that's big!)</p><br>`);
        
    } else if 

    // Print the name and height of the current Pokemon
    (document.write(`<p><b>Name:</b> ${currentPokemon.name}    <b>Height:</b> ${currentPokemon.height}m </p><br>`));

*/
pokemonList.forEach(function(pokemon) {
    document.write('<b>Name: </b>' + pokemon.name + ' ' + '<b>Height: </b>' + pokemon.height + 'm' + '<br>');
    
    });

/* pokemonList.forEach((pokemon) => document.write(name, height));*/

/*pokemonList.forEach(logToConsole);

function logToConsole(pokemon) {
    logToConsole(pokemon);
}
*/