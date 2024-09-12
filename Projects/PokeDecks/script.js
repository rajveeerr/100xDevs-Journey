async function fetchData(type,count,stateVar){
    let typeData=await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}/`);
    let typeJson=await typeData.json();
    let pokeNames=typeJson.pokemon;
    for (var i = pokeNames.length - 1; i >= 0; i--) { //to shuffle the array got it from stack overflow
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pokeNames[i];
        pokeNames[i] = pokeNames[j];
        pokeNames[j] = temp;
    }
    console.log(pokeNames);
    count=pokeNames.length<count?pokeNames.length:count;
    for(let i=0;i<count;i++){
        pokeUrl=pokeNames[i].pokemon.url;
        let pokeData=await fetch(pokeUrl);
        let pokeJson=await pokeData.json();
        let pokeDetails={
            pokeNumber: i+1, 
            pokename: pokeJson.name.charAt(0).toUpperCase() + pokeJson.name.slice(1).toLowerCase(),
            poketype: type, 
            pokeweight: pokeJson.weight, 
            pokeImg: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokeJson.id}.svg`,
            pokeHP: pokeJson.stats.find(obj=>obj.stat.name==='hp').base_stat,
            pokeAttack: pokeJson.stats.find(obj=>obj.stat.name==='attack').base_stat,
            pokeResistances1: typeJson.damage_relations.half_damage_from[0].length?typeJson.damage_relations.half_damage_from[0].name:"-",
            pokeResistances2: typeJson.damage_relations.half_damage_from[1].length?typeJson.damage_relations.half_damage_from[1].name:"-",
            pokeWeakness: typeJson.damage_relations.double_damage_from[0].name||typeJson.damage_relations.half_damage_from[0].name||typeJson.damage_relationsno_damage_from[0].name||"-",
        }
        stateVar.push(pokeDetails);
        render(stateVar);
    }
    document.getElementById("loader").style.opacity=0;
    console.log(stateVar);
    

}

function component(stateEle){
    const pokeCards = document.createElement('div');
    pokeCards.classList.add('poke-cards');

    const card1 = document.createElement('div');
    card1.classList.add('cards');
    card1.id = 'card1';

    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');
    const img = document.createElement('img');

    img.src = './images/pokeball-pokemon-svgrepo-com.svg';

    const realImg = new Image();
    realImg.src = stateEle.pokeImg;
    realImg.onload = function() {
        img.src = stateEle.pokeImg;
    };

    img.setAttribute("onerror", "this.onerror=null;this.src='./images/pokeball-pokemon-svgrepo-com.svg'");

    cardImg.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = stateEle.pokename;
    const typeClass = document.createElement('span');
    typeClass.classList.add('type-class');
    typeClass.innerHTML = `<span class="card-type">${stateEle.poketype}</span>`;
    cardContent.appendChild(title);
    cardContent.appendChild(typeClass);

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('card-details');

    const stats = document.createElement('span');
    stats.classList.add('stats');
    stats.innerHTML = `
        <span class="hp">HP <span id="hp">${stateEle.pokeHP}</span></span>
        <span class="hp">Attack <span id="cp">${stateEle.pokeAttack}</span></span>`;

    const weaknesses = document.createElement('span');
    weaknesses.classList.add('weakness-strengths');
    weaknesses.innerHTML = `
        <span class="hp"><span id="resistant1"><i class="fa-solid fa-shield"></i> ${stateEle.pokeResistances1||"-"}</span></span>
        <span class="hp"><span id="resistant2"><i class="fa-solid fa-shield"></i> ${stateEle.pokeResistances2||"-"}</span></span>
        <span class="hp"><span id="weakness1"><i class="fa-solid fa-link-slash"></i> ${stateEle.pokeWeakness||"-"}</span></span>`;

    cardDetails.appendChild(stats);
    cardDetails.appendChild(weaknesses);

    cardContent.appendChild(cardDetails);

    card1.appendChild(cardImg);
    card1.appendChild(cardContent);

    pokeCards.appendChild(card1);

    return pokeCards;

}

function render(stateVar){
    parent=document.getElementById("parentCards");
    parent.innerHTML=''
    for(let i=0;i<stateVar.length;i++){
        card=component(stateVar[i]);
        parent.appendChild(card);
    }
}




function start(event){
    event.preventDefault();
    let stateVar=[];
    let pokeType=document.getElementById("pokemonType").value;
    let pokeCount=parseInt(document.getElementById("pokeCount").value);
    const pokemonTypes = ["Normal","Fire","Water","Grass","Electric","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];


    if(!pokeType&&!pokeCount){
        alert("Please Enter type of Pokemon Card and number of cards");
        return;
    }
    if(!pokeType){
        alert("Enter the Type of Pokemon Cards you want to see!!!");
        return;
    }
    if(!pokeCount){
        alert("Enter the Number of Cards you want to see!!!");
        return;
    }
    // pokeType=pokeType.toLowerCase();
    pokeType.charAt(0).toUpperCase() + pokeType.slice(1).toLowerCase();
    if(pokemonTypes.indexOf(pokeType)==-1){
        alert("Enter a Valid Type of Pokemon from the list of options");
        document.getElementById("pokemonType").value='';
        return;
    }
    if(pokeCount<1||pokeCount>100){
        alert("Enter number of cards to be 1-100 cards at once!!!");
        document.getElementById("pokeCount").value = '';
        return;
    }
    console.log(`Fetching ${pokeType} Pokemon cards...`);
    document.getElementById("loader").style.opacity=1;
    document.getElementById("scroll").style.opacity=1;
    fetchData(pokeType,pokeCount,stateVar);

    parent=document.getElementById("parentResult");
    parent.innerHTML='';
    
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');
    
    const heading = document.createElement('h3');
    heading.classList.add('sub-heading');
    heading.innerHTML = `Displaying ${pokeCount} Pokemons of ${pokeType} type.`;

    const displayParagraph = document.createElement('p');
    displayParagraph.classList.add('display');
    displayParagraph.innerHTML = `Explore the world of <span id="pokeType" class="highlight">${pokeType}</span> Pokémon with this collection of <span class="totalPoke" class="highlight">${pokeCount}</span> unique cards. Each Pokémon is packed with special abilities that represent the essence of the <span class="pokeType" class="highlight">${pokeType}</span>. Get ready to discover new favorites and powerful contenders for your next battle!`;

    resultCard.appendChild(heading);
    resultCard.appendChild(displayParagraph);

    parent.appendChild(resultCard);
    

        
        
}
