const weatherApiKey='';



async function getToken() {
    const clientId = '';
    const clientSecret = '';
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodedCredentials}`
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        })
    });

    if (response.ok) {
        const data = await response.json();
        // console.log('Access Token:', data.access_token);
        return data.access_token;
    } else {
        alert('There was an error try again later.');
    }
}



async function spotifyPlaylist(genre){
    const acessToken=await getToken();
    const response=await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genre}`,{
        headers:{
            'Authorization': `Bearer ${acessToken}`
        }
    });
    data=await response.json();
    console.log(data,genre);
    return data;
}           

function weatherToDescription(weather){
    const weatherDescription= {
        "clear": "Sunny skies and bright sunshine. Perfect for an outdoor adventure!",
        "clouds": "Cloudy skies. A mix of sun and shadow.",
        "rain": "Rain showers. A perfect time for a reflective mood.",
        "thunderstorm": "Thunderstorm in progress. Expect thunder, lightning, and heavy rain.",
        "snow": "Snow is falling, turning everything into a winter wonderland.",
        "mist": "A misty atmosphere, creating a mysterious and calm environment.",
        "fog": "Thick fog is rolling in, reducing visibility and creating an eerie feel.",
        "haze": "A hazy day, blurring the lines between sky and land.",
        "smoke": "Smoke in the air, reducing air quality and visibility.",
        "dust": "Dust in the air, blowing around and creating a sandy atmosphere.",
        "sand": "A sandstorm is in progress, with high winds and low visibility.",
        "ash": "Volcanic ash in the air. Stay indoors and keep safe.",
        "squall": "Squally weather with sudden, strong winds. Hold onto your hat!",
        "tornado": "A tornado is active in the area. Seek shelter immediately!",
    };
    if(weatherDescription[weather]){
        // console.log(weatherDescription[weather]," : ",weather);
        return weatherDescription[weather];
    }
    return "Enjoy the day with your favorite tunes!";
    
}

function weatherTOEmoji(weather){
    const weatherEmojiMap= {
        "clear": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20with%20Face.png",
        "clouds": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud.png",
        "rain": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Umbrella%20with%20Rain%20Drops.png",
        "thunderstorm": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Lightning%20and%20Rain.png",
        "snow": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Snowman.png",
        "mist": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Foggy.png",
        "fog": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fog.png",
        "haze": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Foggy.png",
        "smoke": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fog.png",
        "dust": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Tornado.png",
        "sand": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Tornado.png",
        "ash": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Mount%20Fuji.png",
        "squall": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fog.png",
        "tornado": "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Tornado.png"
    };
    
    
    if(weatherEmojiMap[weather]){

        console.log(weatherEmojiMap[weather]); 
        return weatherEmojiMap[weather]; 
    }
    return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Asia-Australia.png";
    
    
}

//fn to map mood with weather
function map(weather){
    weathertoGenre={
    'clear': ['pop', 'indie-pop', 'happy', 'summer', 'synth-pop'],
    'clouds': ['indie', 'alt-rock', 'folk', 'chill', 'british'],
    'rain': ['jazz', 'blues', 'acoustic', 'rainy-day', 'soul'],
    'thunderstorm': ['hard-rock', 'metal', 'industrial', 'dubstep', 'edm'],
    'snow': ['classical', 'holidays', 'piano', 'opera','piano'],
    'mist': ['trip-hop', 'lo-fi', 'chill', 'new-age','chill'],
    'drizzle': ['soft-rock', 'folk', 'singer-songwriter', 'acoustic', 'romance'],
    'wind': ['psych-rock', 'progressive-house', 'world-music', 'guitar', 'garage'],
    'extreme': ['industrial', 'hardcore', 'grindcore', 'metalcore', 'death-metal'],
    'atmosphere': ['psychedelic', 'trip-hop', 'experimental', 'minimal-techno','trip-hop']
};
    // console.log(weathertoGenre[`${weather}`][Math.floor(Math.random() * 3)] || ['Ambient']);
    if(weathertoGenre[`${weather}`]){
        return weathertoGenre[`${weather}`][Math.floor(Math.random() * 5)] || ['chill'];
    }
    return 'chill';
}

async function setDom(arr){
    let temp=document.getElementById("temperature");
    let weatherDisplay=document.getElementById("weatherCondition");
    let weatherIcon=document.getElementById("weatherIcon");
    let weatherTitle=document.getElementById("weatherDetails");
    let weatherDescription=document.getElementById("weatherDescription");
    let spotifyButton=document.getElementById("spotifyButton");
    let cityDisplay=document.getElementById("cityDisplay");
    let playlistDisplaySection=document.getElementById("playlistDisplay");
    let scrollAnimation=document.getElementById("scroll")

    for(let i=0;i<4;i++){
        let song=document.getElementById(`song${i+1}`);
        let songImg=document.getElementById(`songImg${i+1}`);
        let songName=document.getElementById(`songName${i+1}`);
        let artistName=document.getElementById(`artistName${i+1}`);

        
        songImg.setAttribute("src",`${arr[i][2]}`);
        songName.textContent=arr[i][0];
        artistName.textContent=arr[i][1];
        song.setAttribute("href",`${arr[i][3]}`);
    }
    scrollAnimation.style.display="flex"
    playlistDisplaySection.style.display="flex";
    spotifyButton.setAttribute("href",`${arr[0][3]}`);
    weatherTitle.textContent=`${arr[0][4]} Vibes`
    temp.textContent=`${Math.floor(arr[0][5])}°C`;
    weatherDisplay.textContent=arr[0][4];
    cityDisplay.textContent=`in ${(arr[0][6]).charAt(0).toUpperCase() + (arr[0][6]).slice(1).toLowerCase()}`;
    weatherDescription.textContent=weatherToDescription(`${arr[0][4].toLowerCase()}`);
    weatherIcon.setAttribute("src",`${weatherTOEmoji(`${arr[0][4].toLowerCase()}`)}`);
}

async function getWeatherData(location){

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`);
        const data = await response.json();
        let weather=await data.weather[0].main;
        let temperature=await data.main.temp-273;
        let genre=await map(weather.toLowerCase());
        let playlistData=await spotifyPlaylist(genre); //to extract play list name artist name and img of 4 playlist- done

        //sometimes spotify returns empty object handle that- done
        let playlistWeatherDetails=[]
        for(let i=0;i<4;i++){
            let playlistName=await playlistData.tracks[i].name;
            let playlistArtist=await playlistData.tracks[i].artists[0].name;
            let url=await playlistData.tracks[i].external_urls.spotify;
            let playlistImage=await playlistData.tracks[i].album.images[0].url;
            if(playlistName===null||playlistName===undefined||playlistArtist===null||playlistArtist===undefined||url===null||url===undefined||playlistImage===null||playlistImage===undefined){
                alert("Something Went Wrong(From our End!! Please try again Later!!(Sorry)");
                throw console.error();
            }
            let tempplaylistWeatherDetails=[playlistName,playlistArtist,playlistImage,url,weather,temperature,location,genre];
            // console.log(playlistName," : ", playlistArtist," : ",url,":",playlistImage);
            playlistWeatherDetails.push(tempplaylistWeatherDetails);

        }
        
        await setDom(playlistWeatherDetails);
        
    }
    catch(e){
        alert("Enter a valid city name!!!! or Check your Internet Connection");
        document.getElementById("location").value="";
    }

};


function submit(){
    const city=document.getElementById("location").value;
    if(!city){
        alert("City Name Required!!!")
    }
    else{
        // console.log(city);
        getWeatherData(city);
    }
}
