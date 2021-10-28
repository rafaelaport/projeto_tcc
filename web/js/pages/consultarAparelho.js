/**
 * By Wellington Fidelis
 * at 09/2021
 * 
 */

$(document).ready(function () {
  if ($("#inputCpfCnpj").val() === "") {
    $("#sectionUser").hide();
    $("#divRowTableDevices").hide();
  }
});

$(".input").on("input", (event) => { event.target.value = event.target.value.toUpperCase(); });

$("#inputCpfCnpj").on("input", event => validateCpfCnpj($("#inputCpfCnpj")));

$("#buttonSearchUser").on('click', event => {
  event.preventDefault();
  if (validateCpfCnpj($("#inputCpfCnpj"))) {
    let cpfCnpjUserForm = removeSpecialCharacters($("#inputCpfCnpj").val());
    searchUser(cpfCnpjUserForm);
  }
});

$(".button-measure-by-device-id").on("click", event => handleMeasurePh(event));

$(".button-consult-historical-id").on("click", event => handleConsultHistoricalByDeviceId(event));

$(".button-deactivate-device-id").on('click', event => handleDeactivateByDeviceId(event));

$(".button-edit-by-device-id").on('click', event => handleEditByDeviceId(event));

$("#buttonModalEditDevice").on("click", event => editDeviceById(event));

function searchUser(cpfCnpj) {
  let url = BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpj}`;
  $.get(url).done(response => response).done(response => {
    if (response.message !== "Sucesso: Proprietário não encontrado.") {
      $("#inputAuxiliarSearchUser").val(true);
      $("#inputCpfCnpj").css("border-color", "#1ab394");//.prop("disabled", true);
      $("#sectionUser").fadeIn(1000);
      $("#inputFullName").val(response.response.nome);
      // $("#divRowButtonSearch").hide();
      searchAllDevices(cpfCnpj);
    } else {
      $("#inputAuxiliarSearchUser").val(false);
      $("#inputCpfCnpj").css("border-color", "#ED5565");
      $("#divRowTableDevices").fadeOut(500);
      $("#sectionUser").fadeOut(1000);

      buildTextModal("<p>Proprietário não encontrado.</p><p>Por favor, contatar o Administrador.</p>", "", "alert");
    }
  });
}

function searchAllDevices(cpfCnpj) {
  let url = BASE_URL + `aparelho/por-usuario/${cpfCnpj}`;
  $.get(url).done(response => {
    let data = response.response;
    let tableIsVisible = $("#divRowTableDevices").is(":visible");
    if (data === undefined && response.message === "Sucesso: Aparelho não encontrado.") {
      buildTextModal("<p>Nenhum aparelho encontrado para esse proprietário.</p><p>Favor contatar o Administrador.</p>", "", "alert");
      if (tableIsVisible) {
        $("#divRowTableDevices").fadeOut(500);
      }
    } else {
      buildTableDevices(data);
    }
  });
}

function searchHistoricalDeviceById(device) {
  let url = BASE_URL + `historico/por-aparelho/${device.id}`;
  $.get(url).done(response => {
    if (response.message !== "Sucesso: Histórico não encontrado.") {
      console.log(response)
      let data = response.response;
      buildHistoricalListInModal(data, device);
    } else {
      buildTextModal("<p>Aparelho sem histórico de medições.</p>", "", "alert");
    }
  });
}

function consultDeviceById(deviceId) {
  let url = BASE_URL + `aparelho/${deviceId}`;
  $.ajax({
    method: "GET",
    url: url,
  }).done((response) => {
    if (response.message === "Sucesso: Aparelho encontrado.") {
      $("#inputDeviceName").val(response.response.nome);
      $("#inputRecipeCapacity").val(response.response.capacidadeLitros);

      $("#modalEditDevice").modal('show');
    } else {
      buildTextModal("<p>Ops. Aparelho não encontrado.</p>", "", "alert");
    }
  });
}

function editDeviceById(event) {
  event.preventDefault();
  const device = buildDataDevice();
  let idDevice = $("#inputHiddenIdDevice").val();
  let url = BASE_URL + `aparelho/editar/${idDevice}`;

  let isDeviceValidated = validateInputsForm("data-device");

  if (isDeviceValidated) {
    $.ajax({
      method: "PUT",
      url: url,
      data: device
    }).done(response => {
      let message = `Sucesso: Aparelho ${device.nome} alterado.`;
      if (message === response.message) {
        $("#modalEditDevice").modal('hide');
        buildTextModal(
          `<p>${message}</p>`,
          "",
          "alert"
        );
        searchUser(device.cpf_cnpj);
      } else {
        console.log(response);
      }
    }
    ).fail(error => console.log(error));
  }
}

function saveMeasureByDeviceId(id) {
  let url = BASE_URL + `historico/salvar/${id}`;
  $.post(url).done(response => {
    let dateMeasure = new Date(response.response.dataMedicao).toLocaleDateString('pt-br');
    let resultMessage = `
    <section class="mb-1">
      <div class="form-group row">
        <h4>${response.message}</h4>
      </div>
      <div class="form-group row ml-1">
          <label for="inputModalDeviceDateMeasuring" class="col-sm-4 col-form-label">Data da medição:</label>
          <div class="col-sm-8">
              <input type="text" readonly class="form-control-plaintext" id="inputModalDeviceDateMeasuring" value="${dateMeasure}">
          </div>
      </div>
      <div class="form-group row ml-1">
          <label for="inputModalPhRate" class="col-sm-4 col-form-label">Indice Ph:</label>
          <div class="col-sm-8">
              <input type="text" readonly class="form-control-plaintext" id="inputModalPhRate" value="${response.response.leitura}">
          </div>
      </div>
      <div class="form-group row ml-1">
          <label for="inputModalStabilizerProduct" class="col-sm-4 col-form-label">Elevador/Redutor(ml):</label>
          <div class="col-sm-8">
              <input type="text" readonly class="form-control-plaintext" id="inputModalStabilizerProduct" value="${response.response.quantidadeProduto}">
          </div>
      </div>
    </section>
    `;
    buildTextModal(resultMessage, "", "alert");
  });
}

function deactivateDeviceAndHistoricalById(id) {
  buildTextModal("<p>Você irá desativar este aparelho e seu histórico.</p><p>Deseja continuar?</p>", "", "confirm");
  $("[name='buttonModalYes']").on('click', () => {
    $('#modalConfirm').modal('hide');
    let url = BASE_URL + `aparelho/desativar/${id}`;
    let cpfCnpjUserForm = removeSpecialCharacters($("#inputCpfCnpj").val());
    $.ajax({
      method: "PUT",
      url: url,
      /*data: { name: "John", location: "Boston" }*/
    }).done(response => buildTextModal(`<p>${response.message}</p>`, "", "alert"));
    searchUser(cpfCnpjUserForm);
  });
}

function handleConsultHistoricalByDeviceId(event) {
  let tdNode = $(event.target).parent().parent().parent();
  let device = {};
  device.id = tdNode.attr("data-device-id");
  device.name = tdNode.children("td").eq(1).text();
  searchHistoricalDeviceById(device);
}

function handleMeasurePh(event) {
  let tdNode = $(event.target).parent().parent().parent();
  let deviceId = tdNode.attr("data-device-id");
  saveMeasureByDeviceId(deviceId);
}

function handleDeactivateByDeviceId(event) {
  let tdNode = $(event.target).parent().parent().parent();
  let deviceId = tdNode.attr("data-device-id");
  deactivateDeviceAndHistoricalById(deviceId);
}

function handleEditByDeviceId(event) {
  let tdNode = $(event.target).parent().parent().parent();
  let deviceId = tdNode.attr("data-device-id");
  console.log(deviceId)
  $("#inputHiddenIdDevice").val(deviceId);
  consultDeviceById(deviceId);
}

function buildTableDevices(data) {
  let table = $('#tableDevices tr').not(":first");
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      $("#tr-" + i).attr("data-device-id", data[i].id);
      $("#nameDevice-" + i).text(data[i].nome);
    }
    hideRowsUnused(data.length);
    showTableDevices();
  } else {
    showMessage("Proprietário sem aparelhos ativos.");
  }
}

function buildHistoricalListInModal(data, device) {
  data.sort(function (a, b) {
    return new Date(b.dataMedicao) - new Date(a.dataMedicao);
  });
  let html = `
      <div class="">
          <h4>${device.name}</h4>
      `;
  for (let i = 0; i < data.length; i++) {
    let measureDate = new Date(data[i].dataMedicao);
    measureDate = `${measureDate.toLocaleDateString()} - ${measureDate.toLocaleTimeString('pt-br')}`;
    html += `
      <section class="rounded bg-light mb-1">
          <div class="form-group row ml-1">
              <label for="inputModalDeviceDateMeasuring" class="col-sm-4 col-form-label">Data da medição:</label>
              <div class="col-sm-8">
                  <input type="text" readonly class="form-control-plaintext" id="inputModalDeviceDateMeasuring" value="${measureDate}">
              </div>
          </div>
          <div class="form-group row ml-1">
              <label for="inputModalPhRate" class="col-sm-4 col-form-label">Indice Ph:</label>
              <div class="col-sm-8">
                  <input type="text" readonly class="form-control-plaintext" id="inputModalPhRate" value="${data[i].leitura}">
              </div>
          </div>
          <div class="form-group row ml-1">
              <label for="inputModalStabilizerProduct" class="col-sm-4 col-form-label">Elevador/Redutor(ml):</label>
              <div class="col-sm-8">
                  <input type="text" readonly class="form-control-plaintext" id="inputModalStabilizerProduct" value="${data[i].quantidadeProduto}">
              </div>
          </div>
      </section>
      `;
  }
  html += `</div>`;
  $(".modal-body").html(html);
  showModalHistorical();
}

function buildDataDevice() {
  const dataDevice = {
    "nome": $("#inputDeviceName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val()),
    "capacidadeLitros": parseFloat($("#inputRecipeCapacity").val())
  }
  return dataDevice;
}

function hideRowsUnused(dataLength) {
  for (let i = dataLength; i < 10; i++) {
    $("#tr-" + i).hide();
  }
}

function showTableDevices() {
  $("#divRowTableDevices").fadeIn(1500);
}

function showModalHistorical() {
  $('#modalShowHistorical').modal('toggle');
}