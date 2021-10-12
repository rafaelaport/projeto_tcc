/**
 * By Wellington Fidelis
 * at 10/2021
 * 
 */
let userRegisteredMessage = "Proprietário já cadastrado.";
let userNotRegisteredMessage = "Proprietário não cadastrado.";

$(document).ready(function () {
  if ($("#inputCpfCnpj").val() === "") {
    $("#divAddForm").hide();
  }
});

$(".input").on("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

$("#inputCpfCnpj").on("input", () => {
  validateCpfCnpj($("#inputCpfCnpj"));
});

$("#buttonCheckUser").on("click", (event) => {
  event.preventDefault();
  if (validateCpfCnpj($("#inputCpfCnpj"))) {
    searchUser();
  }
});

$("#buttonSaveUser").on("click", (event) => {
  event.preventDefault();
  let isUserValidated = validateInputsForm("data-user");
  if (isUserValidated) {
    if (checkIfIsRegistered() === true) {
      editUser();
    } else {
      saveUser();
    }
  }
});

$("#buttonDeactivateUser").on("click", (event) => {
  event.preventDefault();
  let isUserValidated = validateInputsForm("data-user");
  if (isUserValidated) {
    deactivateUser();
  }
});

function searchUser() {
  let cpfCnpj = removeSpecialCharacters($("#inputCpfCnpj").val());
  let url = BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpj}`;
  $.get(url).done(response => response).done(response => {
    handleFormShow(response, cpfCnpj);
  });
}

function saveUser() {
  const data = buildDataUser();
  let url = BASE_URL + "usuario/salvar";
  $.post(url, data).done(response => {
    buildTextModal(`<p>${response.message}</p><p>Deseja ir para página Home?</p>`, '../index.html', "confirm");
    $("#spanUserResponse").text(userRegisteredMessage);
    searchUser();
  }).fail(error => console.log(error));
}

function editUser() {
  const data = buildDataUser();
  let idUser = $("#inputFullName").attr("data-user-id");
  let url = BASE_URL + `usuario/editar/${idUser}`;
  $.ajax({
    method: "PUT",
    url: url,
    data: data
  }).done(response => buildTextModal(`<p>${response.message}</p><p>Deseja ir para página Home?</p>`, '../index.html', "confirm")).fail(error => console.log(error));
}

function deactivateUser() {
  const data = buildDataUser();
  let idUser = $("#inputFullName").attr("data-user-id");
  let url = BASE_URL + `usuario/desativar/${idUser}`;
  $.ajax({
    method: "PUT",
    url: url,
    data: data
  }).done(response => buildTextModal(`<p>${response.message}</p><p>Deseja ir para página Home?</p>`, '../index.html', "confirm")).fail(error => console.log(error));
}

function buildDataUser() {
  const dataUser = {
    "nome": $("#inputFullName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val())
  }
  return dataUser;
}

function handleFormShow(response, cpfCnpj) {
  if (response.message !== "Sucesso: Proprietário não encontrado.") {
    if (cpfCnpj === response.response.cpf_cnpj) {
      $("#spanUserResponse").text(userRegisteredMessage);
      $("#divAddForm").fadeIn(1000);
      // $("#inputCpfCnpj").prop('disabled', true);
      $("#inputFullName").val(response.response.nome);
      setUserIdInDataAttribute(response.response.id);
      $("#buttonSaveUser").text("Editar");
      $("#divButtonDeactivate").show();
    }
  } else {
    $("#spanUserResponse").text(userNotRegisteredMessage);
    $("#divAddForm").fadeIn(1000);
    // $("#inputCpfCnpj").prop('disabled', true);
    $("#buttonSaveUser").text("Salvar");
    $("#divButtonDeactivate").hide();
  }
  // $("#buttonCheckUser").prop('disabled', true);
}

function setUserIdInDataAttribute(id) {
  $("#inputFullName").attr('data-user-id', id);
}

function checkIfIsRegistered() {
  if ($("#spanUserResponse").text() === userRegisteredMessage) {
    return true;
  } else {
    return false;
  }
}
