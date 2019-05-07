//'use strict';

/*function convertDate() {
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
    const date = today.getFullYear()+''+month[today.getMonth()]+''+day[today.getDate()];
    const time = today.getHours() + ":" + today.getMinutes();
    console.log(date, time);
} */

function getTides(diveDate) {
    fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${diveDate}&range=24&station=9447130&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
    .then(response => response.json())
    .then(responseJson => displayTides(responseJson))
    .catch(error => {
      alert('You lost the internet, lets find it!')});
}

function captureCitySelect() {
    $('.city').on('click', function(event) {
        let citySelection = $(event.currentTarget);
        console.log(citySelection);
    });
}

function displayDiveDateSubmit(diveDate) {
    $('.container').on('click', '.seattle', function(event) {
        $('.container').html(`
            <form>
                <label for="dateInput">When are you diving?</label>
                <input type="text" name="dateInput" id="dateInput" placeholder="ex. YYYYMMDD" required>
                <input type="button" id="submitButton" value="go dive">
            </form>
            <button class="currentDaySlack">Todays Slack</button>
        `);
    });
}

function listenForClick() {
    $('.container').on('click', '#submitButton', function(event) {
        const diveDate = $('#dateInput').val();
        getTides(diveDate);
    });
}

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
    const date = today.getFullYear()+''+month[today.getMonth()]+''+day[today.getDate()];
    $('.container').on('click', '.currentDaySlack', function(event) {
        fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${date}&range=24&station=9447130&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
    });
}

function displayTides(responseJson) {
    console.log(responseJson);
    $('form').remove();
    $('.time').html(`<p>Time</p>`);
    $('.returnCity').html(`<button type="submit" class="backToCitiesButton">Choose a different city</button>`);
    responseJson.predictions.forEach(function(item, i) {
        $('.container').append(`
            <div class="tideResponse">
                <ul>
                  <li>${responseJson.predictions[i].type}</li>
                  <li>${responseJson.predictions[i].v}</li>
                  <li>${responseJson.predictions[i].t}</li>
                </ul>
            </div>  
        `);
    }); 
}

function backToCities() {
    $('body').on('click', '.backToCitiesButton', function(event) {
        $('.container').html(`
        <div class="cities">
            <div class="city seattle">Seattle</div>
            <div class="city tacoma">Tacoma</div>
            <div class="city portTownsend">Port Townsend</div>
            <div class="city neahBay">Neah Bay</div>
        </div>
        `);
    });
}

function runThisPuppy() {
    listenForClick();
    displayDiveDateSubmit();
    captureCitySelect();
    backToCities();
    //convertDate();
    todaySlackClick();
};

$(runThisPuppy);