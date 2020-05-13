$(document).ready(function() {
    fillTable();
    $(`#createCargoButton`).on(`click`, createCargo);
    $(`#cargosList tbody`).on('click', 'tr button.btn-danger', deleteCargo);
    $(`#cargosList tbody`).on('click', 'tr', showCargoInfo);
    $(`#cargosList tbody`).on('click', 'tr button.btn-edit', editCargo);
    $(`#findUserButton`).on('click', findCargo);
});

function fillTable() {
    $(`#cargoInfoId`).text('');
    $(`#cargoInfoCode`).text('');
    $(`#cargoInfoName`).text('');
    $(`#cargoInfoMass`).text('');
    let tableContent = '';
    $.getJSON('/service/cargos', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.code}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.mass}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Редагувати</button></td>`
            tableContent += `</tr>`;
        });
        $(`#cargosList tbody`).html(tableContent);
    });
}

function createCargo(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let code = $(`#inputCode`).val();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    if (!id.trim().length || !code.trim().length || !name.trim().length || !mass.trim().length) {
        alert(`Будь ласка,заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/cargos`,
        type: `POST`,
        data: {id: id, code: code, name: name, mass: mass},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showCargoInfo(event) {
    event.preventDefault();
    let cargoId = $(this).attr("id");
    $.getJSON(`/service/cargos/${cargoId}`, function(data) {
        $(`#cargoInfoId`).text(data.id);
        $(`#cargoInfoCode`).text(data.code);
        $(`#cargoInfoName`).text(data.name);
        $(`#cargoInfoMass`).text(data.mass);
    });
}

function deleteCargo(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Ви впевнені,що хочете видалити вантаж з id ${id} ?`)) {
        $.ajax({
            url: `/service/cargos/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}
function findCargo(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    $.ajax({
        url: `/service/cargos/${id1}`,
        type: `GET`,
        data: {id: id1},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function editCargo(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let code = $(`#inputCode`).val();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/cargos/${id}`,
        type: `POST`,
        data: {id: id, code:code,name:name, mass: mass},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
