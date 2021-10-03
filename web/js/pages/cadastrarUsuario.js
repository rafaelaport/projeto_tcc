/**
 * By Wellington Fidelis
 * at 10/2021
 * 
 */
let userRegisteredMessage = "Usuário já cadastrado.";
let userNotRegisteredMessage = "Usuário não cadastrado.";

$(document).ready(function () {
  if ($("#inputCpfCnpj").val() === "") {
    $("#divAddForm").hide();
  }
});

$(".input").on("input", (event) => {event.target.value = event.target.value.toUpperCase();});

$("#inputCpfCnpj").on("input", () => {validateCpfCnpj($("#inputCpfCnpj"));});

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

function searchUser () {
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
    let decision = messageConfirm(`${response.message}\nDeseja ir para página de consulta?`);
    if (decision) {
      window.location.href = 'consultarUsuario.html';
    } else {
      $("#spanUserResponse").text(userRegisteredMessage);
    }
    searchUser();
  }).fail(error => console.log(error));
}

function editUser() {
  const data = buildDataUser();
  let idUser = $("#inputFullName").attr("data-user-id");
  let url = BASE_URL + `usuario/editar/${idUser}`;
  $.ajax({method: "PUT", url: url, data: data}).done(response => {
    let decision = messageConfirm(`${response.message}\nDeseja ir para página de consulta?`);
    if (decision) {
      window.location.href = 'consultarUsuario.html';
    }
  }).fail(error => console.log(error));
}

function buildDataUser() {
  const dataUser = {
    "nome": $("#inputFullName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val())
    //add perfil
  }
  return dataUser;
}

function handleFormShow(response, cpfCnpj) {
  if (response.message !== "Sucesso: Usuário não encontrado.") {
    if (cpfCnpj === response.response.cpf_cnpj) {
      $("#spanUserResponse").text(userRegisteredMessage);
      $("#divAddForm").fadeIn(1000);
      $("#inputCpfCnpj").prop('disabled', true);
      $("#inputFullName").val(response.response.nome);
      setUserIdInDataAttribute(response.response.id);
    }
  } else {
    $("#spanUserResponse").text(userNotRegisteredMessage);
    $("#divAddForm").fadeIn(1000);
    $("#inputCpfCnpj").prop('disabled', true);
  }
  $("#buttonCheckUser").prop('disabled', true);
}

function messageConfirm(text) {
  let result = confirm(text);
  return result
}

function setUserIdInDataAttribute(id) {
  $("#inputFullName").attr('data-user-id', id);
}

function checkIfIsRegistered () {
  if ($("#spanUserResponse").text() === userRegisteredMessage) {
    return true;
  } else {
    return false;
  }
}
