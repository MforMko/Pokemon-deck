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
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listItem.classList.add("list-group-item");
    listItem.classList.add('col-12');
    listItem.classList.add('col-md-4');

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.classList.add("btn", "btn-primary");
    button.classList.add('btn-block');
    listItem.append(button);
    pokemonList.append(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    let modalDialog = $(".modal-dialog");
    let modal = $(".modal");

    modalTitle.empty();
    modalBody.empty();

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

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalDialog.append(modalTitle);
    modalDialog.append(modalBody);
    modal.append(modalDialog);
  }


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

//search function
document.getElementById('mySearch').addEventListener('input', function (event) {
  const searchTerm = event.target.value.toLowerCase();
  const listItems = document.querySelectorAll('.pokemon-list li');

  listItems.forEach(function (item) {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(searchTerm)) {
          item.style.display = 'list-item';
      } else {
          item.style.display = 'none';
      }
  });

});