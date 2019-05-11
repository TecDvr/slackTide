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
    .then(responseJson => displayWeather(responseJson));
}

function displayWeather(responseJson) {
    console.log(responseJson);
    $('.weather').removeClass('hidden');
    $('.weather').html(`
        <h3>${responseJson.list[0].name}</h3>
        <p>The temperature is ${responseJson.list[0].main.temp}F</p>
        <p>The wind is blowing ${responseJson.list[0].wind.speed}mph</p>
        <p>Currently: ${responseJson.list[0].weather[0].description}</p>
    `);
}
  
function displayTodaysTides(responseJson, citySelectionName, time) {
    console.log(responseJson);
    $('.container').html(`
        <div class="tideResponse">
            <ul>
                <li><p>The current time is ${time}</p></li>
                <li><p>Next slack tide is at ${responseJson.predictions[0].t.split(' ')[1]}</p></li>
                <li><p>The slack tide will be ${responseJson.predictions[0].type}</p></li>
                <li><p>The water level will be ${responseJson.predictions[0].v}ft</p></li>
            </ul>
        </div>  
        <div>
            <button class="citySelectButton">Choose a different city</button>
            <button class="dateSelectButton">Diving another day?</button>
        </div>
        `);
    backToCitiesButton();
    selectTideDate();
};

function backToCitiesButton() {
    $('.container').on('click', '.citySelectButton', function(event) {
        $('.weather').addClass('hidden');
        $('.container').html(`
            <div class="cities">
                <div class="city seattle 9447130" id="seattle">Seattle</div>
                <div class="city tacoma 9446484" id="tacoma">Tacoma</div>
                <div class="city porttownsend 9444900" id="port townsend">Port Townsend</div>
                <div class="city neahbay 9443090" id="forks">Neah Bay (Forks)</div>
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
        $('.container').html(`
            <h2>Where are you diving?</h2>
            <div class="cities">
                <div class="city seattle 9447130" id="seattle">Seattle</div>
                <div class="city tacoma 9446484" id="tacoma">Tacoma</div>
                <div class="city porttownsend 9444900" id="port townsend">Port Townsend</div>
                <div class="city neahbay 9443090" id="forks">Neah Bay (Forks)</div>
            </div>
        `).hide().fadeIn(1000);
}

function loadDelayCities() {
    setTimeout(displayCities, 2500);
}

function runThisPuppy() {
    todaySlackClick();
    //loadDelayCities();
};

$(runThisPuppy);
