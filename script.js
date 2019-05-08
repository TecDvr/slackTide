'use strict';

  function todaySlackClick() {
    const today = new Date();
    let month = new Array(); //there has to be a better way to do this
        month[0] = '01';
        month[1] = '02';
        month[2] = '03';
        month[3] = '04';
        month[4] = '05';
        month[5] = '06';
        month[6] = '07';
        month[7] = '08';
        month[8] = '09';
    let day = new Array();
        day[1] = '01';
        day[2] = '02';
        day[3] = '03';
        day[4] = '04';
        day[5] = '05';
        day[6] = '06';
        day[7] = '07';
        day[8] = '08';
        day[9] = '09';
        day[10] = '10';
        day[11] = '11';
        day[12] = '12';
        day[13] = '13';
        day[14] = '14';
        day[15] = '15';
        day[16] = '16';
        day[17] = '17';
        day[18] = '18';
        day[19] = '19';
        day[20] = '20';
        day[21] = '21';
        day[22] = '22';
        day[23] = '23';
        day[24] = '24';
        day[25] = '25';
        day[26] = '26';
        day[27] = '27';
        day[28] = '28';
        day[29] = '29';
        day[30] = '30';
        day[31] = '31';
    let hour = new Array();
        hour[1] = '01';
        hour[2] = '02';
        hour[3] = '03';
        hour[4] = '04';
        hour[5] = '05';
        hour[6] = '06';
        hour[7] = '07';
        hour[8] = '08';
        hour[9] = '09';
        hour[10] = '10';
        hour[11] = '11';
        hour[12] = '12';
        hour[13] = '13';
        hour[14] = '14';
        hour[15] = '15';
        hour[16] = '16';
        hour[17] = '17';
        hour[18] = '18';
        hour[19] = '19';
        hour[20] = '20';
        hour[21] = '21';
        hour[22] = '22';
        hour[23] = '23';
    let minute = new Array();  
        minute[1] = '01';
        minute[2] = '02';
        minute[3] = '03';
        minute[4] = '04';
        minute[5] = '05';
        minute[6] = '06';
        minute[7] = '07';
        minute[8] = '08';
        minute[9] = '09';
        minute[10] = '10';
        minute[11] = '11';
        minute[12] = '12';
        minute[13] = '13';
        minute[14] = '14';
        minute[15] = '15';
        minute[16] = '16';
        minute[17] = '17';
        minute[18] = '18';
        minute[19] = '19';
        minute[20] = '20';
        minute[21] = '21';
        minute[22] = '22';
        minute[23] = '23'; 
        minute[24] = '24';
        minute[25] = '25';
        minute[26] = '26';
        minute[27] = '27';
        minute[28] = '28';
        minute[29] = '29';
        minute[30] = '30';
        minute[31] = '31';
        minute[32] = '32';
        minute[33] = '33';
        minute[34] = '34';
        minute[35] = '35';
        minute[36] = '36';
        minute[37] = '37';
        minute[38] = '38';
        minute[39] = '39';
        minute[40] = '40';
        minute[41] = '41';
        minute[42] = '42';
        minute[43] = '43';
        minute[44] = '44';
        minute[45] = '45';
        minute[46] = '46';
        minute[47] = '47';
        minute[48] = '48';
        minute[49] = '49';
        minute[50] = '50';
        minute[51] = '51';
        minute[52] = '52';
        minute[53] = '53';
        minute[54] = '54';
        minute[55] = '55';
        minute[56] = '56';
        minute[57] = '57';
        minute[58] = '58';
        minute[59] = '59';
        minute[60] = '60';
    const date = today.getFullYear()+''+month[today.getMonth()]+''+day[today.getDate()];
    const time = hour[today.getHours()] + ":" + minute[today.getMinutes()];
    
    $('body').on('click', '.city', function(event) {
        event.preventDefault();

        const citySelection = $(this).attr('class').split(' ')[2];
        const citySelectionName = $(this).attr('class').split(' ')[1];

        fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${date} ${time}&range=24&station=${citySelection}&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
        .then(response => response.json())
        .then(responseJson => displayTodaysTides(responseJson, citySelectionName, time));
        getWeather();
    
    });
}

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=seattle&units=imperial&appid=f45c5dca7b6df9490219f032a35434a1`)
    .then(response => response.json())
    .then(responseJson => displayWeather(responseJson));
}

function displayWeather(responseJson) {
    console.log(responseJson);
}
  
function displayTodaysTides(responseJson, citySelectionName, time) {
    console.log(responseJson);
    $('.container').html(`
        <h3>${citySelectionName}</h3>
        <div class="weather">
            <p>weather display<br>temp - wind - cloud%</p>
        </div>
        <div class="tideResponse">
            <ul>
                <li><p>The current time is: ${time}</p></li>
                <li><p>Next slack tide is at: ${responseJson.predictions[0].t.split(' ')[1]}</p></li>
                <li><p>The tide is: ${responseJson.predictions[0].type}</p></li>
                <li><p>Water level: ${responseJson.predictions[0].v}ft</p></li>
            </ul>
        </div>  
        <div>
            <button class="citySelectButton">Choose a different city</button>
        </div>
        `);
    backToCitiesButton();
};

function backToCitiesButton() {
    $('.container').on('click', '.citySelectButton', function(event) {
        $('.container').html(`
            <div class="cities">
                <div class="city seattle 9447130">Seattle</div>
                <div class="city tacoma 9446484">Tacoma</div>
                <div class="city portTownsend 9444900">Port Townsend</div>
                <div class="city neahBay 9443090">Neah Bay</div>
            </div>
        `);
    });
}    

function displayCities() {
    $('.startButton').on('click', function(event) {
        $('.container').html(`
            <h2>Where are you diving?</h2>
            <div class="cities">
                <div class="city seattle 9447130">Seattle</div>
                <div class="city tacoma 9446484">Tacoma</div>
                <div class="city portTownsend 9444900">Port Townsend</div>
                <div class="city neahBay 9443090">Neah Bay</div>
            </div>
        `);
    });
}

function runThisPuppy() {
    todaySlackClick();
    displayCities();
};

$(runThisPuppy);
