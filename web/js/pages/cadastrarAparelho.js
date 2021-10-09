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

$(".input").on("input", (event) => { event.target.value = event.target.value.toUpperCase();});

$("#inputCpfCnpj").on("input", () => {validateCpfCnpj($("#inputCpfCnpj"));});

$("#buttonCheckUser").on("click", function (event) {
  event.preventDefault();
  if (validateCpfCnpj($("#inputCpfCnpj"))) {
    consultUser();
  }
});

$("#buttonAddDevice").on("click", function (event) {
  event.preventDefault();
  handleAddDevice();
});

/* $("#buttonAddAnotherDevice").on("click", function (event) {
  event.preventDefault();
  handleAddAnotherDevice();
}); */

function handleFormShow(response, cpfCnpj) {  
    if (cpfCnpj === response.response.cpf_cnpj) {
      $("#spanUserResponse").text("Usuário já cadastrado.");
      $("#divAddForm").fadeIn(1000);
      // $("#inputCpfCnpj").prop('disabled', true);
      $("#inputFullName").val(response.response.nome).prop('disabled', true);
    }
    // $("#buttonCheckUser").prop('disabled', true);
}

function handleAddDevice() {
  // let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");

  //if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      saveDevice();
      buildTextModal("<p>Aparelho cadastrado com sucesso!</p>", "./consultarAparelho.html", "alert");
      // window.location.href = 'consultarAparelho.html';
    }
  //} else {
   // console.log("Usuário não cadastrado.");
    /* if (isDeviceValidated && isUserValidated) {
      saveUser();
      saveDevice();
      buildTextModal("Aparelho e Usuário cadastrado com sucesso!", "./consultarAparelho.html");
      // window.location.href = 'consultarAparelho.html';
    } */
 // }
}

/* 
function handleAddAnotherDevice() {
  let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");

  if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      saveDevice();
      buildTextModal("Aparelho cadastrado com sucesso!");
      clearFields("data-device");
    }
  } else {
    if (isDeviceValidated && isUserValidated) {
      saveUser();
      saveDevice();
      buildTextModal("Aparelho e Usuário cadastrado com sucesso!");
      $("#inputFullName").prop('disabled', true);
      $("#selectProfile").prop('disabled', true);
      $("#spanUserResponse").text("Usuário já cadastrado.");
      clearFields("data-device");
    }
  }
} */
/* 
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
 */

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

function consultUser() {
  let cpfCnpj = removeSpecialCharacters($("#inputCpfCnpj").val());
  $.ajax({method: "GET", url: BASE_URL + `usuario/por-cpf-cnpj/${cpfCnpj}`,}).done((response) => {
    console.log(response);
      if (response.message !== "Sucesso: Usuário não encontrado.") {
        handleFormShow(response, cpfCnpj);
      } else {
        buildTextModal(`<p>${response.message}</p><p>Deseja ir para página de cadastro de usuário?</p>`, './cadastrarUsuario.html', "confirm");
        $("#divAddForm").fadeOut(1000);
      }
    });
}
/* 
function buildDataUser() {
  const dataUser = {
    "nome": $("#inputFullName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val())
  }
  return dataUser;
} */

function buildDataDevice() {
  const dataDevice = {
    "nome": $("#inputDeviceName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val()),
    "capacidadeLitros": $("#inputRecipeCapacity").val()
  }
  return dataDevice;
}