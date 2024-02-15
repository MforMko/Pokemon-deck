let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll () {
    return pokemonList;
  }
  function add (pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem (pokemon) {
    pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("list-group-item");
    button.innerText = pokemon.name;
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal')
    button.classList.add("btn", "btn-primary", "btn-lg");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  function showModal(pokemon) {
    let modalContainer = document.querySelector('#exampleModal');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('btn', 'modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Type: ' + pokemon.types.map(obj=>obj.type.name).join(", ");



    modalContainer.appendChild(closeButtonElement);
    modalContainer.appendChild(nameElement);
    modalContainer.appendChild(heightElement);
    modalContainer.appendChild(imageElement);
    modalContainer.appendChild(typesElement);
    modalContainer.appendChild(weightElement);
  
    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }


  function hideModal() {
    let modalContainer = document.querySelector('#exampleModal');
    modalContainer.classList.remove('is-visible');

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
  }
  //This is the method I need to edit to show a modal 
  //with the Pokémon’s name, its height, and an image 
  //of the Pokémon
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      /*console.log(pokemon);*/
      showModal(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details){
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();
pokemonRepository.loadList().then(function() 
{
//now the data is loaded!
pokemonRepository.getAll().forEach(function (pokemon) { 
pokemonRepository.addListItem(pokemon);
  });
});