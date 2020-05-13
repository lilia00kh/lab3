$(document).ready(function() {
    fillTable();
    $(`#createUserButton`).on(`click`, createUser);
    $(`#spaceStationsList tbody`).on('click', 'tr button.btn-danger', deleteSpaceStation);
    $(`#spaceStationsList tbody`).on('click', 'tr', showSpaceStationInfo);
    $(`#spaceStationsList tbody`).on('click', 'tr button.btn-edit', editSpaceStation);
    $(`#findUserButton`).on('click', findSpaceStation);
});

function fillTable() {
    $(`#SpaceStationInfoId`).text('');
    $(`#SpaceStationInfoNumber`).text('');
    $(`#SpaceStationInfoNecessity`).text('');
    $(`#SpaceStationInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/space_stations', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.number}</td>`;
            tableContent += `<td>${this.necessity}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Edit</button></td>`
            tableContent += `</tr>`;
        });
        $(`#spaceStationsList tbody`).html(tableContent);
    });
}

function createUser(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let number = $(`#inputNumber`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !number.trim().length || !necessity.trim().length || !capacity.trim().length) {
        alert(`Будь ласка, заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/space_stations`,
        type: `POST`,
        data: {id: id, number: number, necessity: necessity, capacity: capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showSpaceStationInfo(event) {
    event.preventDefault();
    let spaceStationId = $(this).attr("id");
    $.getJSON(`/service/space_stations/${spaceStationId}`, function(data) {
        $(`#spaceStationInfoId`).text(data.id);
        $(`#spaceStationInfoNumber`).text(data.number);
        $(`#spaceStationInfoNecessity`).text(data.necessity);
        $(`#spaceStationInfoCapacity`).text(data.capacity);
    });
}

function deleteSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let number = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Ви впевнені,що хочете видалити космічну станцію з id ${id} ?`)) {
        $.ajax({
            url: `/service/space_stations/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}



function findSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    console.log(id1);
        $.ajax({
            url: `/service/space_stations/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editSpaceStation(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let number = $(`#inputNumber`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/space_stations/${id}`,
        type: `POST`,
        data: {id: id, number:number,necessity:necessity, capacity: capacity},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
