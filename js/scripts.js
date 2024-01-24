let pokemonRepository = (function(){
  let pokemonList = [
              {name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
              {name: 'Charmander', height: 0.6, types: ['Fire']},
              {name: 'Pikachu', height: 0.4, types: ['Electric']}
          ];

  function getAll () {
    return pokemonList;
  }
  function add (pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  function showDetails (pokemon) {
    console.log(pokemon);
  }
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();
pokemonRepository.getAll().forEach(function (pokemon) { 
pokemonRepository.addListItem(pokemon);
});