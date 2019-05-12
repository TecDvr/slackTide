'use strict';

  function todaySlackClick() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    const date = today.getFullYear()+''+(month < 10 ? ('0' + month) : month)+''+(day < 10 ? ('0' + day) : day);
    const time = (hour < 10 ? ('0' + hour): hour) + ":" + (minute < 10 ? ('0' + minute) : minute);
    $('body').on('click', '.city', function(event) {
        event.preventDefault();
        const citySelection = $(this).attr('class').split(' ')[2];
        //const citySelectionName = $(this).attr('class').split(' ')[1];
        const citySelectionName = $(this).attr('id');
        fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${date} ${time}&range=24&station=${citySelection}&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
        .then(response => response.json())
        .then(responseJson => displayTodaysTides(responseJson, citySelectionName, time));
        getWeather(citySelectionName);
    });
}

function getWeather(citySelectionName) {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${citySelectionName}&units=imperial&appid=f45c5dca7b6df9490219f032a35434a1`)
    .then(response => response.json())
    //.then(responseJson => displayWeather(responseJson));
    .then(function(responseJson) {
        let weatherDataList = responseJson;
        displayWeather(weatherDataList);
    });
}

function displayWeather(weatherDataList) {
    console.log(weatherDataList);
    //$('.weather').removeClass('hidden');
    $('.testing').append(`
    <div>
        <h3>${weatherDataList.list[0].name}</h3>
        <p>The temperature is ${weatherDataList.list[0].main.temp}F</p>
        <p>The wind is blowing ${weatherDataList.list[0].wind.speed}mph</p>
        <p>Currently: ${weatherDataList.list[0].weather[0].description}</p>
    </div>    
    `).hide().fadeIn(2000);
}
  
function displayTodaysTides(responseJson, citySelectionName, time, weatherDataList) {
    console.log(responseJson);
    $('.cityCluster').html(`
        <div class="testing"></div>
        <div class="tideResponse">
            <ul>
                <li class="nextSlack"><p>Next slack tide is at</p>
                <p class="timeDisplay">${responseJson.predictions[0].t.split(' ')[1]}</p></li>
            </ul>
            <ul>
                <li class="tideDetails"><p>The current time is ${time}</p></li>
                <li class="tideDetails"><p>The slack tide will be ${responseJson.predictions[0].type}</p></li>
                <li class="tideDetails"><p>The water level will be ${responseJson.predictions[0].v}ft</p></li>
            </ul>
        </div>  
        <div>
            <button class="citySelectButton">Choose a different city</button>
            <button class="dateSelectButton">Diving another day?</button>
        </div>
        `).hide().fadeIn(500);
    backToCitiesButton();
    selectTideDate();
};

function backToCitiesButton() {
    $('.container').on('click', '.citySelectButton', function(event) {
        $('.weather').addClass('hidden');
        $('.container').html(`
        <div class="citiesOne">
        <div class="city seattle 9447130" id="seattle"></div>
        <div class="city tacoma 9446484" id="tacoma"></div>
    </div>
    <div class="citiesTwo">
        <div class="city porttownsend 9444900" id="port townsend"></div>
        <div class="city neahbay 9443090" id="forks"></div>
    </div>
        `);
    });
}    

function selectTideDate() {
    $('.container').on('click', '.dateSelectButton', function(event) {
        $('.weather').addClass('hidden');
        $('.container').html(`
            <form>
                <label for="dateInput">When are you diving?</label>
                <input type="text" name="dateInput" id="dateInput" placeholder="ex. YYYYMMDD" required>
                <input type="button" id="submitDateButton" value="go dive">
            </form>
            <div class="userDateTideContainer"></div>
            <button class="citySelectButton">Choose a different city</button>
        `);
        userDateSubmit();
    });
}

function userDateSubmit() {
    $('.container').on('click', '#submitDateButton', function(event) {
        let userDate = $('#dateInput').val();
        getDateSpecificTide(userDate);
    });
}

function getDateSpecificTide(userDate) {
    fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${userDate}&range=24&station=9447130&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
    .then(response => response.json())
    .then(responseJson => displayUserDateTide(responseJson));
}

function displayUserDateTide(responseJson) {
    console.log(responseJson);
    $('.userDateTideContainer').empty();
    responseJson.predictions.forEach(function(item, i) {
        $('.userDateTideContainer').append(`
            <div>
                <ul>
                  <li>${responseJson.predictions[i].type}</li>
                  <li>${responseJson.predictions[i].t}</li>
                </ul>
            </div>  
        `);
    }); 
}

function displayCities() {
        $('.container').addClass('modifyContainer')
        $('.container').html(`
            <div class="cityCluster">        
            <h2 class="whereDiving">Where are you diving?</h2>
            <div class="citiesOne">
                <div class="city seattle 9447130" id="seattle"></div>
                <div class="city tacoma 9446484" id="tacoma"></div>
            </div>
            <div class="citiesTwo">
                <div class="city porttownsend 9444900" id="port townsend"></div>
                <div class="city neahbay 9443090" id="forks"></div>
            </div>
            </div>
        `).hide().fadeIn(1500);
}

function loadDelayCities() {
    setTimeout(displayCities, 2000);
}

function runThisPuppy() {
    todaySlackClick();
    loadDelayCities();
};

$(runThisPuppy);
