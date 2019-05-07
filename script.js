'use strict';

function getTides(diveDate) {
    fetch(`https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${diveDate}&range=24&station=9447130&product=predictions&units=english&time_zone=lst_ldt&format=json&datum=mllw&interval=hilo`)
    .then(response => response.json())
    .then(responseJson => displayTides(responseJson))
    .catch(error => {
      alert('You lost the internet, lets find it!')});
}

function displayDiveDateSubmit(diveDate) {
    $('.container').on('click', '.seattle', function(event) {
        $('.container').html(`
            <form>
                <label for="dateInput">When are you diving?</label>
                <input type="text" name="dateInput" id="dateInput" placeholder="ex. YYYYMMDD" required>
                <input type="button" id="submitButton" value="go dive">
            </form>
        `);
    });
}

function listenForClick() {
    $('.container').on('click', '#submitButton', function(event) {
        const diveDate = $('#dateInput').val();
        getTides(diveDate);
    });
}

function displayTides(responseJson) {
    console.log(responseJson);
    $('form').remove();
    responseJson.predictions.forEach(function(item, i) {
        $('.container').append(`
              <div>
                <ul>
                  <li>${responseJson.predictions[i].type}</li>
                  <li>${responseJson.predictions[i].v}</li>
                  <li>${responseJson.predictions[i].t}</li>
                </ul>
              </div>  
              `);
        }); 
}

function runThisPuppy() {
    listenForClick();
    displayDiveDateSubmit();
};

$(runThisPuppy);