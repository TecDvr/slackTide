'use strict';

  function todaySlackClick() {
    const today = new Date();
    let month = new Array();
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
    const date = today.getFullYear()+''+month[today.getMonth()]+''+day[today.getDate()];
    const time = hour[today.getHours()] + ":" + today.getMinutes();
    
    $('body').on('click', '.city', function(event) {
        const citySelection = $(this).attr('class').split(' ')[2];
        
        fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${date} ${time}&range=24&station=${citySelection}&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
        .then(response => response.json())
        .then(responseJson => displayTodaysTides(responseJson));
    });
}
  
function displayTodaysTides(responseJson) {
    console.log(responseJson);
    $('.container').html(`
        <div class="tideResponse">
            <ul>
                <li><p>Next slack tide is at: ${responseJson.predictions[0].t}</p></li>
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
