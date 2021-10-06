
fetch("https://pokeapi.co/api/v2/pokemon?limit=99") //promise //requesting Json from url
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        let pokemonList = data.results;
        
        for(let pokemon of pokemonList){
            let { name } = pokemon;
            let select = document.querySelector("#pokemon-selector select");
            
            let newOption = document.createElement("option");
            newOption.textContent = name[0].toUpperCase() + name.slice(1);
            newOption.value = name

            select.append(newOption);
        }
    }).catch((err)=>{
        console.log(err);
    });

    let form = document.querySelector("form#pokemon-selector");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        let selectedPokemon = e.target["pokemon-select"].value;
//         // console.log("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
        let errMessage = document.querySelector("#error-message");
        if( selectedPokemon !== "default" ){
            errMessage.textContent = "";
            fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
                .then((res)=>res.json())
                .then((data)=>{
                    console.log(data);
                    let hp;
                    let atk;
                    let def;
                    for(let statObj of data.stats){
                        if(statObj.stat.name === "hp"){
                            hp = statObj.base_stat;
                        } else if(statObj.stat.name ==="attack"){
                            atk = statObj.base_stat;
                        } else if(statObj.stat.name === "defense"){
                            def = statObj.base_stat;
                        }
                    }
                    let details = document.querySelector("#details");

                    let typeStr = data.types.map((typeEl)=>{
                        return typeEl.type.name;
                    }).join("/");

                    details.innerHTML = `<div id="details-title">
                            <h2>Details</h2>
                        </div>
                        <div id="details-img-container">
                            <img src=${data.sprites.front_default} alt="Image of selected pokémon" />
                        </div>
                        <div id="details-text">
                            <div id="details-name">Name: ${data.name}</div>
                            <div id="details-type">Type: ${typeStr}</div>
                            <div id="details-weight">Weight: ${data.weight} hectograms</div>
                            <div id="details-weight">Height: ${data.height} decimeters</div>
                        </div>
                        <div id="details-sub-text">
                            <h3>Base Attributes</h3>
                            <div>Hit Points: ${hp}</div>
                            <div>Attack: ${atk}</div>
                            <div>Defense: ${def}</div>
                        </div>
                        <div id="details-action">
                            <button>Add -></button>
                        </div>`;

                        let recentList = document.querySelector("#recent-list");
                        // <div class="recent-list-item">
                        //     <img src="https://static.pokemonpets.com/images/monsters-images-800-800/147-Dratini.webp" alt="Evolution version image" />
                        //     <div>Dratini</div>
                        // </div>
                        let recentListItem = document.createElement("div");
                        recentListItem.classList.add("recent-list-item");

                        let recentListImg = document.createElement("img");
                        recentListImg.src = data.sprites.front_default;
                        recentListImg.alt = "Evolution version image";

                        let nameDiv = document.createElement("div");
                        nameDiv.textContent = data.name;

                        recentListItem.append(recentListImg, nameDiv);

                        recentList.append(recentListItem);
            });
            }else{
        errMessage.textContent = "Please select a Pokemon!";
    }
});

                        let addToTeamButton = document.querySelector("#add-to-team");

                        addToTeamButton.addEventListener("click", ()=>{
                            let currentPokemonName = document.querySelector("#details-name").textContent;
                            console.log(currentPokemonName);
                            // let currentPokemonImg;
})

