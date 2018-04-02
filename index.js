const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');
const currentHourBtn = document.querySelector('#currentHour');
const sevenDayBtn = document.querySelector('#sevenDay');
const section = document.querySelector('.section');

const baseUrl = 'http://api.openweathermap.org/data/2.5/';
const key = 'cea628b39f29f88a75a1f0817243f941';
let url;

const darkBaseUrl = 'https://api.darksky.net/';
const darkKey = '3895576db6a13a93ab8cf16f4c5c540e';
let darkUrl;


currentHourBtn.addEventListener('click', currentDay);
sevenDayBtn.addEventListener('click', sevenDay);


//function to pull current weather
function displayWeatherCurrent(json){
    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    console.log("displayWeatherSevenDayJson:", json);
    let list = json.hourly.data;
    let city = json.timezone;

    console.log(list);
    
    let article = document.createElement('article');
    let heading = document.createElement('h2');

    heading.textContent = city;

    article.appendChild(heading);

    //----------------------------
        // Nice days this week?
    let listDaily = json.daily.data;
    let par = document.createElement('p');
    
    let s = 0;

    for(i = 0; i< 7; i++){
        let currentDaily = listDaily[i];
        console.log("displayWeatherSevenDayJson:", currentDaily);
        
        let tempDaily = currentDaily.temperatureHigh;
        let precip = currentDaily.precipProbability;
        
        console.log("tempDaily:", tempDaily);
        console.log("precip:", precip);

        if(tempDaily >= 65){
            if(precip <= 0.5){
                s += 1;
                continue;
            }else{
                continue;
            }
        }else {
            console.log("forloop s:", s);
            continue;
        }
        return s;
    }

    console.log("s:", s);
    par.textContent = s + " days will be nice over the next week(65+ with low precipitation)"

    //----------------------------
    
    article.appendChild(par);
    let p = document.createElement('p');
    let wBody = document.createElement('div');
    
    wBody.style.margin = 'auto';
    wBody.style.width = '97%';
    wBody.style.display = 'table';

    for(i = 0; i < 7; i++){
        let current = list[i];

        let forecast = document.createElement('div');
        let para = document.createElement('p');
        let para2 = document.createElement('p');
        
        let temp = current.temperature;
        let miliDay = new Date(current.time*1000).toUTCString();
        let description = current.summary;
        let day = miliDay.slice(0,11);

        let time = miliDay.slice(16,29);

        console.log("temp:", temp);
        console.log("miliDay w:", miliDay);
        console.log("time:", time);
        console.log("description:", description);

        p.textContent = day;
        para.textContent = time;
        para2.textContent = Math.floor(temp) + ' degrees : ' + description;

        
        forecast.style.display = 'table-cell';
        
        article.appendChild(p);
        forecast.appendChild(para);
        forecast.appendChild(para2);
        wBody.appendChild(forecast);
        
    }
    article.appendChild(wBody);
    section.appendChild(article);
        
}

// Function to pull 7 day forecast
function displayWeatherSevenDay(json){
    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    console.log("displayWeatherSevenDayJson:", json);
    let list = json.daily.data;
    let city = json.timezone;

    //----------------------------

    
    let article = document.createElement('article');
    let heading = document.createElement('h2');
    let wBody = document.createElement('div');
    let par = document.createElement('p');

    heading.textContent = city;

    article.appendChild(heading);
    console.log(list);

    wBody.style.margin = 'auto';
    wBody.style.width = '97%';
    wBody.style.display = 'flex';
    
    
    let s = 0;

    for(i = 0; i< 7; i++){
        let current = list[i];
        console.log("displayWeatherSevenDayJson:", current);
        
        let forecast = document.createElement('div');
        let para = document.createElement('p');
        let para2 = document.createElement('p');

        let temp = current.temperatureHigh;
        let precip = current.precipProbability;
        let miliDay = new Date(current.time*1000).toUTCString();
        let description = current.summary;

        let wdate = miliDay.slice(4,11);
        
        console.log("temp:", temp);
        console.log("precip:", precip);
        console.log("miliDay:", miliDay);
        console.log("description:", description);

        
        para.textContent = wdate;
        para2.textContent = 'High of ' + Math.floor(temp) + '\xB0 : ' + description;

        forecast.style.flex = '1';
        forecast.style.margin = '2px';

        forecast.appendChild(para);
        forecast.appendChild(para2);
        wBody.appendChild(forecast);

        if(temp >= 65){
            if(precip <= 0.5){
                s += 1;
                continue;
            }else{
                continue;
            }
        }else {
            console.log("forloop s:", s);
            continue;
        }
        return s;
    }
    
    console.log("s:", s);
    par.textContent = s + " days will be nice over the next week(65+ with low precipitation)"

    article.appendChild(par);

    //----------------------------
    
    article.appendChild(wBody);
    section.appendChild(article);
    
}

//functions for initial OpenWeather api call
function currentDay(e){
    e.preventDefault();
    url = baseUrl + 'forecast' + '?zip=' + zip.value + '&units=imperial' + '&cnt=8' + '&APPID=' + key;

    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        DarkSkyCurrent(json);
    });
}


function sevenDay(e){
    e.preventDefault();
    url = baseUrl + 'forecast' + '?zip=' + zip.value + '&units=imperial' + '&cnt=56' + '&APPID=' + key;

    console.log('before fetch:', url);

    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        DarkSkySeven(json);
    });

}


//functions to go through server to complete darkSky api call
function DarkSkyCurrent(data){
    var lat = data.city.coord.lat;
    var long = data.city.coord.lon;

    let obj = { lat: lat, lon: long};

    fetch("https://weatherapp-dc-server.herokuapp.com/weather", {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        displayWeatherCurrent(json);
    });
}

function DarkSkySeven(data){
        
    var lat = data.city.coord.lat;
    var long = data.city.coord.lon;

    let obj = { lat: lat, lon: long};

    fetch("https://weatherapp-dc-server.herokuapp.com/weather", {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        displayWeatherSevenDay(json);
    });
}
