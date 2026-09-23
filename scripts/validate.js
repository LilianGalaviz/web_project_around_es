function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
}

function resetValidation(formElement, inputList, buttonElement) {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}

function enableValidation() {
  const forms = document.querySelectorAll(".popup__form");

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(".popup__input"));
    const submitButton = form.querySelector(".popup__button");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input);
        toggleButtonState(inputs, submitButton);
      });
    });

    toggleButtonState(inputs, submitButton);
  });
}
