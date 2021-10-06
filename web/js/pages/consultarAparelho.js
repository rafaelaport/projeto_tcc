/**
 * By Wellington Fidelis
 * at 09/2021
 * 
 */

 $(document).ready(function () {
  if ($("#inputCpfCnpj").val() === "") {
      $("#sectionUser").hide();
      $("#divRowTableDevices").hide();
      $("#modalShowHistorical").hide();
  }
});

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

function searchUser(cpfCnpj) {
  let url = BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpj}`;
  $.get(url).done(response => response).done(response => {
      if (response.message !== "Sucesso: Usuário não encontrado.") {
          $("#inputAuxiliarSearchUser").val(true);
          $("#inputCpfCnpj").css("border-color", "#1ab394").prop("disabled", true);
          $("#sectionUser").fadeIn(1000);
          $("#inputFullName").val(response.response.nome);
          $("#divRowButtonSearch").hide();
          
          searchAllDevices(cpfCnpj);

      } else {
          $("#inputAuxiliarSearchUser").val(false);
          $("#inputCpfCnpj").css("border-color", "#ED5565");
      }
  });
}

function searchAllDevices(cpfCnpj) {
  let url = BASE_URL + `aparelho/por-usuario/${cpfCnpj}`;
  $.get(url).done(response => {
      let data = response.response;
      let tableIsVisible = $("#divRowTableDevices").is(":visible");
      if (data === undefined && response.message === "Sucesso: Aparelho não encontrado.") {
          showMessage("Nenhum aparelho encontrado para esse Usuário.\nFavor contatar o Administrador.");
          if (tableIsVisible) {$("#divRowTableDevices").fadeOut(500);}
      } else {
          buildTableDevices(data);
      }    
  });
}

function searchHistoricalDeviceById(device) {
  let url = BASE_URL + `historico/por-aparelho/${device.id}`;
  $.get(url).done(response => {
      if (response.message !== "Sucesso: Histórico não encontrado.") {
          let data = response.response;
          buildHistoricalListInModal(data, device);
      } else {
          showMessage('Aparelho sem histórico de medições.')
      }
  });
}

function saveMeasureByDeviceId(id) {
  let url = BASE_URL + `historico/salvar/${id}`;
  $.post(url).done(response => {
      showMessage(`Medição realizada. \n${response.message}`)
  });
}

function deactivateDeviceAndHistoricalById(id) {
  if (confirm("Você irá desativar este aparelho e seu histórico.\nDeseja continuar?")) {
      let url = BASE_URL + `aparelho/desativar/${id}`;
      let cpfCnpjUserForm = removeSpecialCharacters($("#inputCpfCnpj").val());
      $.ajax({method: "PUT", url: url, /*data: { name: "John", location: "Boston" }*/ }).done( response => showMessage(response.message));
      searchUser(cpfCnpjUserForm);
  }    
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

function handleDeactivateByDeviceId (event) {
  let tdNode = $(event.target).parent().parent().parent();
  let deviceId = tdNode.attr("data-device-id");
  deactivateDeviceAndHistoricalById(deviceId);
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
      showMessage("Usuário sem aparelhos ativos.");
  }
}

function buildHistoricalListInModal(data, device) {
  let html = `
      <div class="">
          <h4>${device.name}</h4>
      `;
  for (let i = 0; i < data.length; i++) {
      html += `
      <section class="rounded bg-light mb-1">
          <div class="form-group row ml-1">
              <label for="inputModalDeviceDateMeasuring" class="col-sm-4 col-form-label">Data da medição:</label>
              <div class="col-sm-8">
                  <input type="text" readonly class="form-control-plaintext" id="inputModalDeviceDateMeasuring" value="${'99/99/9999'}">
              </div>
          </div>
          <div class="form-group row ml-1">
              <label for="inputModalPhRate" class="col-sm-4 col-form-label">Indice Ph:</label>
              <div class="col-sm-8">
                  <input type="text" readonly class="form-control-plaintext" id="inputModalPhRate" value="${data[i].leitura}">
              </div>
          </div>
          <div class="form-group row ml-1">
              <label for="inputModalStabilizerProduct" class="col-sm-4 col-form-label">Elevador/Redutor:</label>
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