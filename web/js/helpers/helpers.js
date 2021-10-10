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
  let result = true;
  inputValues.forEach((input, index) => {
    if ($(input).val().length === 0) {
      $(input).css("border-color", "#ED5565");
      result = false;
    } else {
      $(input).css("border-color", "#1ab394");
    }

    if ($(input).val() === '0') {
      $(input).css("border-color", "#ED5565");
      result = false;
    } else {
      $(input).css("border-color", "#1ab394");
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
  $(".modal-body").html(html);
  showModal(type);
  if (location !== "") {
    $("[name='buttonModalYes']").on('click', () => {
      window.location.href = location;
    });
  }
}