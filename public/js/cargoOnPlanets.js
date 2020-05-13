$(document).ready(function() {
    fillTable();
    $(`#createCargoOnPlanetButton`).on(`click`, createCargoOnPlanet);
    $(`#cargoOnPlanetsList tbody`).on('click', 'tr button.btn-danger', deleteCargoOnPlanet);
    $(`#ShowLessThen30`).on('click', showLessThen30);
    //$(`#cargoOnPlanetsListLessThen30 tbody`).on(showCargoOnPlanetInfo);
});

function fillTable() {
    $(`#cargoOnPlanetInfoId`).text('');
    $(`#cargoOnPlanetInfoPlanet`).text('');
    $(`#cargoOnPlanetInfoCargo`).text('');
    let tableContent = '';
    $.getJSON('/service/cargoOnPlanets', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.planet}</td>`;
            tableContent += `<td>${this.cargo}</td>`;
            tableContent += `</tr>`;
        });
        $(`#cargoOnPlanetsList tbody`).html(tableContent);
    });
}

function fillTable2(result) {
    let tableContent = '';
        result.forEach((value)=>{
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${value.id}</td>`;
            tableContent += `<td>${value.name}</td>`;
            tableContent += `<td>${value.mass}</td>`;
            tableContent += `<td>${value.capacity}</td>`;
            tableContent += `</tr>`;
            $(`#cargoOnPlanetsListLessThen30 tbody`).html(tableContent);
        })
}

function createCargoOnPlanet(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let planet = $(`#inputPlanet`).val();
    let cargo = $(`#inputCargo`).val();
    if (!id.trim().length || !planet.trim().length || !cargo.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/cargoOnPlanets`,
        type: `POST`,
        data: {id: id, planet: planet, cargo: cargo},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showCargoOnPlanetInfo(event) {
    event.preventDefault();
    let cargoOnPlanetId = $(this).attr("id");
    $.getJSON(`/service/cargoOnPlanets/${cargoOnPlanetId}`, function(data) {
        $(`#cargoOnPlanetInfoId`).text(data.id);
        $(`#cargoOnPlanetInfoPlanet`).text(data.planet);
        $(`#cargoOnPlanetInfoCargo`).text(data.cargo);
    });
}

function showLessThen30(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let i =30;
    $.ajax({
        url: `/service/cargoOnPlanets/${i}`,
        type: `POST`,
        success: function(result) {
            fillTable2(result);
        }
    });
}

function deleteCargoOnPlanet(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let planet = $(data).find(`td:nth-child(2)`).text();
    if (confirm(` [${id}] ${planet}?`)) {
        $.ajax({
            url: `/service/cargoOnPlanets/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}
