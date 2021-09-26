/**
 * By Wellington Fidelis
 * at 08/2021
 * 
 */
/* Verifica, ao carregar a página, se o campo de cpf/cnpj está preenchido */
$(document).ready(function () {
  if ($("#inputCpfCnpj").val() === "") {
    $("#divAddForm").hide();
  }
});

$(".input").on("input", function (event) {
  this.value = this.value.toUpperCase();
})

$("#inputCpfCnpj").on("input", function (event) {
  validateCpfCnpj($("#inputCpfCnpj"));
});

$("#buttonCheckUser").on("click", function (event) {
  event.preventDefault();
  if (validateCpfCnpj($("#inputCpfCnpj"))) {
    handleFormShow();
  }
});

$("#buttonAddDevice").on("click", function (event) {
  event.preventDefault();
  handleAddDevice();
});

$("#buttonAddAnotherDevice").on("click", function (event) {
  event.preventDefault();
  handleAddAnotherDevice();
});

function handleFormShow() {
  let cpfCnpjUserForm = removeSpecialCharacters($("#inputCpfCnpj").val());
  let idUser = $.ajax({
    method: "GET",
    url: BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpjUserForm}`,
  })
    .done(function (response) {
      if (response.message !== "Sucesso: Usuário não encontrado.") {
        if (cpfCnpjUserForm === response.response.cpf_cnpj) {
          $("#spanUserResponse").text("Usuário já cadastrado.");
          $("#divAddForm").fadeIn(1000);
          $("#inputCpfCnpj").prop('disabled', true);
          $("#inputFullName").val(response.response.nome).prop('disabled', true);
          //$("#selectProfile").prop('disabled', true);
          return response.response.cpf_cnpj;
        }
      } else {
        $("#spanUserResponse").text("Usuário não cadastrado.")
        $("#divAddForm").fadeIn(1000);
        $("#inputCpfCnpj").prop('disabled', true);
        return response.message;
      }
    });
}

function handleAddDevice() {
  let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");

  if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      saveDevice();
      showMessage("Aparelho cadastrado com sucesso!");
      window.location.href = 'consultar.html';
    }
  } else {
    if (isDeviceValidated && isUserValidated) {
      saveUser();
      saveDevice();
      showMessage("Aparelho e Usuário cadastrado com sucesso!");
      window.location.href = 'consultar.html';
    }
  }
}

function handleAddAnotherDevice() {
  let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");

  if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      saveDevice();
      showMessage("Aparelho cadastrado com sucesso!");
      clearFields("data-device");
    }
  } else {
    if (isDeviceValidated && isUserValidated) {
      saveUser();
      saveDevice();
      showMessage("Aparelho e Usuário cadastrado com sucesso!");
      $("#inputFullName").prop('disabled', true);
      $("#selectProfile").prop('disabled', true);
      $("#spanUserResponse").text("Usuário já cadastrado.");
      clearFields("data-device");
    }
  }
}

function saveUser() {
  const data = buildDataUser();

  let url = BASE_URL + "usuario/salvar";
  $.post(
    url,
    data
  )
    .done(response => response)
    .fail(error => console.log(error));
}

function saveDevice() {
  const data = buildDataDevice();
  let url = BASE_URL + "aparelho/salvar";
  $.post(
    url,
    data
  )
    .done(response => response)
    .fail(error => console.log(error));
}

function consultUser(cpfCnpf) {
  let url = BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpf}`;
  return $.get(url).done(response => response.response).done(cpf_cnpj => cpf_cnpj);
}

function buildDataUser() {
  const dataUser = {
    "nome": $("#inputFullName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val())
  }
  return dataUser;
}

function buildDataDevice() {
  const dataDevice = {
    "nome": $("#inputDeviceName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val()),
    "capacidadeLitros": $("#inputRecipeCapacity").val()

  }
  return dataDevice;
}