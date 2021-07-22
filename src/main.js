import data from './data/pokemon/pokemon.js';
import { filterByName , filterByType, pokemonOrder,attackName ,calculateDmgStab ,calculateDps,calculateEps } from './data.js';

const pokemonList = data.pokemon;
const containerPokemons = document.getElementById('container-card');
// const containerModal = document.querySelector('.container-modal');



// --------------------filterByName----------

const MessageError = () => {
  containerPokemons.innerHTML = '';
  const div = document.createElement('div');
  const p = document.createElement('p');
  const img = document.createElement('img');
     div.className = 'message-error';
     img.src = 'IMG/psyduck-confussed.gif';
     p.innerHTML = '🤪⚠️. . . Oopps !! Error 404 Pokemon Not Found!  ';
  div.appendChild(img);
  div.appendChild(p);
  containerPokemons.appendChild(div);
};

const inputSearch = document.querySelector('#inputFilterByName');

inputSearch.addEventListener('keyup', () => {
  const searchedPokemons = filterByName(pokemonList, inputSearch.value);
  if (searchedPokemons.length === 0) {
    MessageError();
    document.getElementById('quantity').innerHTML = 0;
  } else {
    containerPokemons.innerHTML = '';
    showPokemon(searchedPokemons);
  }
});


// --------------filterByType------------

const elementTypeFilter = document.querySelector('#filterByType-options');

elementTypeFilter.addEventListener('change', () => {
  if (elementTypeFilter.value === 'all' || elementTypeFilter.value === '' ) {
    containerPokemons.innerHTML = '';
    showPokemon(pokemonList);
  } else {
    const filteredPokemonsByType = filterByType(pokemonList, elementTypeFilter.value);
    containerPokemons.innerHTML = '';
    showPokemon(filteredPokemonsByType);
  }
});


// --------------order options------------

const optionsOrder =document.querySelector('#orderBy-options');

optionsOrder.addEventListener("change" , () => {
  const selection = optionsOrder.value;
  if (optionsOrder.value === '') {
    containerPokemons.innerHTML = '';
    showPokemon(pokemonList);
  } else {
    const dataOrder = pokemonOrder.differentOrder(pokemonList,selection);
    
    containerPokemons.innerHTML = '';
     showPokemon(dataOrder);
  }});

//-----sortby options --------------------

const optionsSortBy =document.querySelector('#sort-by-order');

optionsSortBy.addEventListener("change" , () => {
  const selection2 = optionsSortBy.value;
if (optionsSortBy.value === '') {
  containerPokemons.innerHTML = '';
  showPokemon(pokemonList);
} else {
  const sortByOrder = pokemonOrder.sortedByOrder(pokemonList,selection2);
  containerPokemons.innerHTML = '';
     showPokemon(sortByOrder);
}});

// --------------reload------------

document.getElementById("refresh").addEventListener("click", () => {
  location.reload();
});



//-------Show Pokemons + counter-------------------

const TypePokemon = (arrayType) => {
    let imgEachPokemon = '';
    arrayType.forEach((typeElement) => {
      imgEachPokemon += `<div id="poke-type-icon-box"><img id="poke-type-icon"src="type-icons/${typeElement}.png" alt=" type pokemon"/><div>`;  
    });
    return imgEachPokemon;
  };
 

const showPokemon = (list) => {
    let count = 0;
    list.forEach((pokem) => {
      const card = document.createElement('div');
      card.className = 'pokemon-group';
      card.innerHTML = `
        <div class="poke-img">
          <p class="poke-num">Nº ${pokem.num}</p>
          <img src="${pokem.img}">
        </div>
        
        <div class="container-info">
          <p class="poke-name">${pokem.name}</p>
          <!--<div class="comun">${pokem.type}</div>-->
          
          <p class="poke-info bold"> CP Máx: ${pokem.stats['max-cp']}</p>
          <p class="poke-info bold"> HP Máx: ${pokem.stats['max-hp']}</p
        </div>
        <div id="poke-type-icon-container">${TypePokemon(pokem.type)}</div>
        `;
      // When the user clicks the card opens the modal
      card.addEventListener('click', () => {
        openAndCloseModal(pokem)
      });
      count += 1;
      containerPokemons.appendChild(card);
    });
    document.getElementById('quantity').innerHTML = count;
    return containerPokemons;
  };

  showPokemon(pokemonList);


// elementOrderAtoZ.addEventListener('change', () => {
//   if (elementOrderAtoZ.value === 'A-Z') {
//     containerPokemons.innerHTML = '';
//     showPokemon(orderByAtoB(pokemonList));
//   }
// });


//---------------Function Open Modal-------------------
  const openAndCloseModal = (pkm) => {
    const modalpkm = document.createElement('div');
    modalpkm.classList.add('modal');
    modalpkm.innerHTML = `  <div class="modal-content">
                              <div class="boxModalClose">
                                <span class="close">&times;</span>
                              </div> 
                              <div class="modal-content-grid">
                                <div class="modal-content-left">  
                                   <div class="modalPart1">
                                       <div class="boxModalPokeName">
                                         <p class="modalPokeName">${pkm.name} </p>  
                                       </div>
                                       <div class="boxModalNumAbout">
                                         <div class="divmodalNum"><p id="modalNum">N° ${pkm.num}</p></div>
                                         <div class="subtitleModal" id="modalAbout">About:</div>   
                                       </div>
                                       <div class="boxModalImg">
                                         <img class="modalImg" src="${pkm.img}"></img>   
                                       </div>
                                   </div>
                                   <div class="modalPart2">
                                       <p class="about">${pkm.about}</p>
                                       <div class="gridGeneralFormat" id="gridInfoPokemons">
                                          <div class="gridElementPokemons" id="grid1">
                                             <h2>Rarity</h2>
                                             <p>${pkm.rarity}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid2">
                                             <h2>Height</h2>
                                             <p>${pkm.size.height}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid3">
                                             <h2>Weight</h2>
                                             <p>${pkm.size.weight}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid4">
                                             <h2>Type</h2>
                                             <p>${pkm.type}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid5">
                                             <h2>Egg</h2>
                                             <p>${pkm.egg}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid6">
                                             <h2>Resistant</h2>
                                             <p>${pkm.resistant}</p>
                                          </div>
                                          <div class="gridElementPokemons" id="grid7">
                                             <h2>Weaknesses</h2>
                                             <p>${pkm.weaknesses}</p>
                                          </div>
                                       </div>
                                   </div>
                                </div>
                                <div class="modal-content-right">
                                    <h2 class="subtitleModal">Stats:</h2>
                                  <div class="gridGeneralFormat" id="gridStatPokemons1">
                                    <div class="gridElementPokemons">
                                       <h2>Max HP</h2>
                             
                                    </div>
                                    <div class="gridElementPokemons">
                                       <h2>Max CP</h2>
                               
                                    </div>
                                    <div class="gridElementPokemons">
                                       <h2>Base Attack</h2>
                                 
                                    </div>
                                    <div class="gridElementPokemons">
                                       <h2>Base Defense</h2>
                                 
                                    </div>
                                    <div class="gridElementPokemons" >
                                       <h2>Base Stamina</h2>
                               
                                    </div>
                                    <div class="gridElementPokemons">
                                  
                                       <p>${pkm.stats['max-hp']}</p>
                                    </div>
                                    <div class="gridElementPokemons">
                                 
                                       <p>${pkm.stats['max-cp']}</p>
                                    </div>
                                    <div class="gridElementPokemons">
                                  
                                       <p>${pkm.stats['base-attack']}</p>
                                    </div>
                                    <div class="gridElementPokemons">
                                     
                                       <p>${pkm.stats['base-defense']}</p>
                                    </div>
                                    <div class="gridElementPokemons" >
                                 
                                       <p>${pkm.stats['base-stamina']}</p>
                                    </div>                                         
                         
                                       
                                 </div>
                               <p>hola</p>
                                <table>
                                 <tr><td class='tittleAttack' colspan="${(attackName(pkm['quick-move'])).length+1}.">QUICK MOVE</td></tr>
                                 <tr><td>Name </td>${showTable(attackName(pkm['quick-move']))   }</tr>
                                 <tr><td>DPS  </td> ${showTable(calculateDps(pkm['quick-move'], pkm.type))}</tr>
                                 <tr><td>EPS  </td> ${showTable(calculateEps(pkm['quick-move']))}</tr>
                                 <tr><td>STAB  </td> ${showTable(calculateDmgStab(pkm['quick-move'], pkm.type))}</tr>                          
                               </table>


                               <table>
                                 <tr><td class='tittleAttack' colspan="${(attackName(pkm['special-attack'])).length+1}.">SPECIAL ATTACK</td></tr>
                                 <tr><td>Name  </td>${showTable(attackName(pkm['special-attack']))}</tr> 
                                 <tr><td>DPS  </td> ${showTable(calculateDps(pkm['special-attack'], pkm.type))}</tr>
                                 <tr><td>EPS  </td> ${showTable(calculateEps(pkm['special-attack']))}</tr>
                                 <tr><td>STAB  </td> ${showTable(calculateDmgStab(pkm['special-attack'], pkm.type))}</tr>
                               </table>


                            
                            </div>    
                       </div>
                      `;
    document.querySelector('.container-modal').appendChild(modalpkm);
    modalpkm.style.display ="block";
    // detectamos la "x" e indicamos que al hacer clic se desaparezca el modal
    let closetag = modalpkm.querySelector(".close");
      closetag.addEventListener("click", () => {
      modalpkm.style.display = "none";
      })
    // indicamos que se cierre el modal al hacer click fuera del modal
      window.addEventListener ("click", (e) => {
        if (e.target == modalpkm) {
          modalpkm.style.display = "none";
        }
       })

    };


    function showTable(data) {
      const table = data.map(elemento => {
        return `<td>${elemento}</td>`
      }).join('');
      return table;}




 

  // ----extra info del modal --------
//   <div>
//   <p class="type">Type</p>
//   <p>${pkm.type}</p>
// </div>                                
// </div>
// <div class="comun-modal contenido">
// <div>
//   <p class="bold">Height</p>
//   <p>${pkm.size.height}</p>
// </div>                                
// </div>
// <div class="comun-modal contenido">   
// <div>
//   <p class="bold">Weight</p>
//   <p>${pkm.size.weight}</p>
// </div>
// </div>
// </div>