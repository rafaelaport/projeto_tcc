var cpf = "99999999999";
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

function handleFormShow() {
  let cpfCnpjUserForm = removeSpecialCharacters($("#inputCpfCnpj").val());
  let idUser = $.ajax({
      method: "GET",
      url: `http://localhost:5001/projeto-tcc-209b6/us-central1/usuario/por-cpf-cnpj/${cpfCnpjUserForm}`,
    })
    .done(function (response) {
      if (response.message !== "Sucesso: Usuário não encontrado.") {
        if (cpfCnpjUserForm === response.response.cpf_cnpj) {
          $("#spanUserResponse").text("Usuário já cadastrado.")
          $("#divAddForm").fadeIn(1000);
          $("#inputCpfCnpj").prop('disabled', true);
          $("#sectionUser").hide();
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

function handleAddDevice() {
  let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");
  /**
   * Montar aqui o objeto para os post
   */

  const dataUser = {
    "nome": $("#inputFullName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val())
  }

  const dataDevice = {
    "nome": $("#inputDeviceName").val(),
    "cpf_cnpj": removeSpecialCharacters($("#inputCpfCnpj").val()),
    "capacidadeLitros": $("#inputRecipeCapacity").val()

  }

  if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      saveDevice(dataDevice);
      alert("Aparelho cadastrado com sucesso!");
      window.location.href = 'consultar.html';
    }
  } else {
    if (isDeviceValidated && isUserValidated) {
      saveUser(dataUser);
      saveDevice(dataDevice);
      alert("Aparelho cadastrado com sucesso!")
      window.location.href = 'consultar.html';
    }
  }
}

function handleAddAnotherDevice() {
  let isUserValidated = validateInputsForm("data-user");
  let isDeviceValidated = validateInputsForm("data-device");
  /**
   * Montar aqui o objeto para os post
   */
  if ($("#spanUserResponse").text() === "Usuário já cadastrado.") {
    if (isDeviceValidated) {
      alert("Aparelho cadastrado com sucesso!");
      clearFields("data-device");
    }
  } else {
    if (isDeviceValidated && isUserValidated) {
      alert("Aparelho cadastrado com sucesso!");
      clearFields("data-device");
    }
  }
}

function saveUser(data) {
  /* data example
   data: {
       name: "John",
       location: "Boston"
       }
   */
  let url = "http://localhost:5001/projeto-tcc-209b6/us-central1/usuario/salvar";
  $.post(
      url,
      data
    )
    .done(response => response)
    .fail(error => console.log(error));
}

function saveDevice(data) {
  let url = "http://localhost:5001/projeto-tcc-209b6/us-central1/aparelho/salvar";
  $.post(
      url,
      data
    )
    .done(response => response)
    .fail(error => console.log(error));
}

function consultUser(cpfCnpf) {
  let url = `http://localhost:5001/projeto-tcc-209b6/us-central1/usuario/por-cpf-cnpj/${cpfCnpf}`;
  return $.get(url).done(response => response.response).done(cpf_cnpj => cpf_cnpj);
}