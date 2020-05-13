$(document).ready(function() {
    fillTable();
    $(`#createCargoOnPlanetButton`).on(`click`, createCargoOnPlanet);
    $(`#cargoOnPlanetsList tbody`).on('click', 'tr button.btn-danger', deleteCargoOnPlanet);
    $(`#cargoOnPlanetsList tbody`).on('click', 'tr', showCargoOnPlanetInfo);
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
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `</tr>`;
        });
        $(`#cargoOnPlanetsList tbody`).html(tableContent);
    });
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

function deleteCargoOnPlanet(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let planet = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete cargo on [${id}] ${planet}?`)) {
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
