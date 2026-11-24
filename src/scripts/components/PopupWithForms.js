import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll("input");
    const inputsValues = {};

    inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });

    return inputsValues;
  }

  setEventListeners() {
    const popupForm = this._popup.querySelector(".popup__form");

    super.setEventListeners();

    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    const popupForm = this._popup.querySelector(".popup__form");
    popupForm.reset();
  }
}

export default PopupWithForm;
