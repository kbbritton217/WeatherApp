const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');
const currentHourBtn = document.querySelector('#currentHour');
const sevenDayBtn = document.querySelector('#sevenDay');
const section = document.querySelector('.section');

const baseUrl = 'http://api.openweathermap.org/data/2.5/';
const key = 'cea628b39f29f88a75a1f0817243f941';
let url;


currentHourBtn.addEventListener('click', currentDay);
sevenDayBtn.addEventListener('click', sevenDay);


//function to pull current weather
function displayWeatherCurrent(json){
        while(section.firstChild){
            section.removeChild(section.firstChild);
        }
        console.log("displayWeatherSevenDayJson:", json);
        let list = json.list;
        let city = json.city.name;
    
        console.log(list);
        
        let article = document.createElement('article');
        let heading = document.createElement('h2');
    
        heading.textContent = city;
    
        article.appendChild(heading);
    
        for(i = 0; i< list.length; i++){
            let current = list[i];
            
        
            let wBody = document.createElement('div');
            let para = document.createElement('p');
            let para2 = document.createElement('p');
            let para3 = document.createElement('p');
    
            
            let temp = current.main.temp;
            let day = current.dt_txt;
            console.log(day);
            let description = current.weather[0].description;
            let para2Var;
    
            wBody.style.margin = '2px';
            wBody.style.display = 'inline-block'
    
            if(day.slice(11,16) === '00:00'){
                para2Var = 'midnight:'
            } else {
                para2Var = day.slice(11,16) + ':'
            }
            
            para.textContent = day.slice(0,11);
            para2.textContent = para2Var;
            para3.textContent = Math.floor(temp) + ' degrees with ' + description;
    
            
            article.appendChild(wBody);
            wBody.appendChild(para);
            wBody.appendChild(para2);
            wBody.appendChild(para3);
        }
        
        section.appendChild(article);
        
    //     section.removeChild(section.firstChild);
    // }
    // console.log("displayWeatherCurrentJson:", json);

    // let city = json.name;
    // let temp = json.main.temp;
    // let description = json.weather[0].description;
    
    //     let article = document.createElement('article');
    //     let heading = document.createElement('h2');
    //     let wBody = document.createElement('div');
    //     let para = document.createElement('p');


    //     heading.textContent = city;
    //     para.textContent = Math.floor(temp) + ' degrees with ' + description;

    //     article.appendChild(heading);
    //     article.appendChild(wBody);
    //     wBody.appendChild(para);
    //     section.appendChild(article);

}

// Function to pull 7 day forecast
function displayWeatherSevenDay(json){
    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    console.log("displayWeatherSevenDayJson:", json);
    let list = json.list;
    let city = json.city.name;

    console.log(list);
    
    let article = document.createElement('article');
    let heading = document.createElement('h2');

    heading.textContent = city;

    article.appendChild(heading);

    for(i = 0; i< list.length; i++){
        let current = list[i];
        
    
        let wBody = document.createElement('div');
        let para = document.createElement('p');
        let para2 = document.createElement('p');
        let para3 = document.createElement('p');

        
        let temp = current.main.temp;
        let day = current.dt_txt;
        let description = current.weather[0].description;
        let para2Var;

        wBody.style.margin = '2px';
        wBody.style.display = 'inline-block'

        if(day.slice(11,16) === '00:00'){
            para2Var = 'midnight:'
        } else {
            para2Var = day.slice(12,16) + ':'
        }
        
        para.textContent = day.slice(0,11);
        para2.textContent = para2Var;
        para3.textContent = Math.floor(temp) + ' degrees with ' + description;

        
        article.appendChild(wBody);
        wBody.appendChild(para);
        wBody.appendChild(para2);
        wBody.appendChild(para3);
    }
    
    section.appendChild(article);
    
}


function currentDay(e){
    e.preventDefault();
    url = baseUrl + 'forecast' + '?zip=' + zip.value + '&units=imperial' + '&cnt=1' + '&APPID=' + key;

    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        displayWeatherCurrent(json);
    });
}


function sevenDay(e){
    e.preventDefault();
    url = baseUrl + 'forecast' + '?zip=' + zip.value + '&units=imperial' + '&cnt=21' + '&APPID=' + key;

    console.log('before fetch:', url);

    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        displayWeatherSevenDay(json);
    });

}



