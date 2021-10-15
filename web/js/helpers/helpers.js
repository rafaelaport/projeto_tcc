/**
 * By Wellington Fidelis
 * at 09/2021
 * 
 */
window.onbeforeunload = () => clearStorage();

$(document).ready(() => {
  const buttonLoginLogout = $("#buttonLoginLogout");

  if (localStorage.getItem("fbAuthLogin")) {
    buttonLoginLogout.children("i").prop("class", "fa fa-sign-in");
    buttonLoginLogout.children("span").text(" Log out");
  } else {
    /* Hide all function when isn't log in */
    buttonLoginLogout.children("i").prop("class", "fa fa-sign-out");
    buttonLoginLogout.children("span").text(" Log in");
    $("#liGerenciar").hide();
    $(".button-deactivate-device-id").hide();
    $(".button-edit-by-device-id").hide();
  }

  buttonLoginLogout.on("click", (event) => {
    event.preventDefault();

    if (localStorage.getItem("fbAuthLogin")) {
      buttonLoginLogout.children("i").prop("class", "fa fa-sign-in");
      buttonLoginLogout.children("span").text(" Log in");
      localStorage.removeItem("fbAuthLogin");
      window.location = "../pages/login.html";
    } else {
      buttonLoginLogout.children("i").prop("class", "fa fa-sign-out");
      buttonLoginLogout.children("span").text(" Log out");
      window.location = "../pages/login.html";
    }
  });
});

function formatCpfCnpj(text) {
  const badchars = /[^\d]/g
  const maskCpf = /(\d{3})(\d{3})(\d{3})(\d{2})/
  const maskCnpj = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
  const value = new String(text).replace(badchars, "");
  if (value.length === 11) {
    return value.replace(maskCpf, "$1.$2.$3-$4");
  } else if (value.length === 14) {
    return value.replace(maskCnpj, "$1.$2.$3/$4-$5");
  } else {
    return value;
  }
}

function removeSpecialCharacters(fieldValue) {
  let value = new String(fieldValue).replace(/(\-|\/|\.)/g, '');
  return value;
}

function validateCpfCnpj(idField) {
  if (idField.val().length === 11 || idField.val().length === 14 || idField.val().length ===
    18) {
    $(idField).val(formatCpfCnpj(idField.val()));
    $(idField).css("border-color", "#1ab394");
    return true;
  } else {
    $(idField).val(formatCpfCnpj(idField.val()));
    $(idField).css("border-color", "#ED5565");
    return false;
  }
}

function validateInputsForm(dataAttribute) {
  let inputValues = $("[" + dataAttribute + "]").get();
  let result;
  inputValues.forEach((input, index) => {
    let newValue = new String($(input).val());
    if (newValue.trim().length > 0) {
      $(input).css("border-color", "#1ab394");
      result = true;
    } else {
      $(input).css("border-color", "#ED5565");
      result = false;
    }
  });
  return result;
}

function clearFields(dataAttribute) {
  let inputValues = $("[" + dataAttribute + "]").get();
  inputValues.forEach((input, index) => {
    $(input).val("");
    $(input).css("border-color", "#e5e6e7")
  });
}

function showMessage(text) {
  alert(text);
}

function showModal(type) {
  if (type === "alert") {
    $('#modalAlert').modal('show');
  }
  else if (type === "confirm") {
    $('#modalConfirm').modal('show');
  }
}

function buildTextModal(text, location, type) {
  let html = ``;
  html += `<div class="container">`;
  html += `${text}`;
  html += `</div>`;
  

  showModal(type);

  if (type === "alert") {
    $("#divModalBodyAlert").html(html);
  }
  else if (type === "confirm") {
    $('#divModalBodyConfirm').html(html);
  }
  if (location !== "") {
    $("[name='buttonModalYes']").on('click', () => {
      window.location.href = location;
    });
  }
}

function logOut() {
  localStorage.removeItem("fbAuthLogin");
}

function clearStorage() {

  let session = sessionStorage.getItem('register');

  if (session == null) {
  
      localStorage.removeItem('remove');

  }
  sessionStorage.setItem('register', 1);
}
window.addEventListener('load', clearStorage);