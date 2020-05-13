$(document).ready(function() {
    fillTable();
    $(`#createCargoOnStationButton`).on(`click`, createCargoOnStation);
    $(`#cargoOnStationsList tbody`).on('click', 'tr button.btn-danger', deleteCargoOnStation);
    $(`#cargoOnStationsList tbody`).on('click', 'tr', showCargoOnStationInfo);
});

function fillTable() {
    $(`#cargoOnStationInfoId`).text('');
    $(`#cargoOnStationInfoSpaceStation`).text('');
    $(`#cargoOnStationInfoCargo`).text('');
    let tableContent = '';
    $.getJSON('/service/cargoOnStations', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.spaceStation}</td>`;
            tableContent += `<td>${this.cargo}</td>`;
            tableContent += `</tr>`;
        });
        $(`#cargoOnStationsList tbody`).html(tableContent);
    });
}

function createCargoOnStation(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let spaceStation = $(`#inputSpaceStation`).val();
    let cargo = $(`#inputCargo`).val();
    if (!id.trim().length || !spaceStation.trim().length || !cargo.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/cargoOnStations`,
        type: `POST`,
        data: {id: id, spaceStation: spaceStation, cargo: cargo},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showCargoOnStationInfo(event) {
    event.preventDefault();
    let cargoOnStationId = $(this).attr("id");
    $.getJSON(`/service/cargoOnStations/${cargoOnStationId}`, function(data) {
        $(`#cargoOnStationInfoId`).text(data.id);
        $(`#cargoOnStationInfoSpaceStation`).text(data.spaceStation);
        $(`#cargoOnStationInfoCargo`).text(data.cargo);
    });
}

function deleteCargoOnStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let spaceStation = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete cargo on [${id}] ${spaceStation}?`)) {
        $.ajax({
            url: `/service/cargoOnStations/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}
