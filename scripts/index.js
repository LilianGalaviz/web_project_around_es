import Card from "./Card.js";
import { FormValidator } from "./formValidator.js";
import { openModal, closeModal } from "./utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileEditButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const popUpClose = modal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const formElement = document.querySelector("#edit-profile-form");
const cardsList = document.querySelector(".cards__list");

const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const newCardClose = newCardPopup.querySelector(".popup__close");

const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const imagePopupClose = imagePopup.querySelector(".popup__close");
imagePopupClose.addEventListener("click", function () {
  closeModal(imagePopup);
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// EDITAR PERFIL

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);

popUpClose.addEventListener("click", function () {
  closeModal(modal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(modal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// TARJETAS INICIALES
function renderCard(cardData, container, isFirst = false) {
  const card = new Card(cardData, "#get_card_element");

  const cardElement = card.generateCard();

  if (isFirst) {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

initialCards.forEach(function (card) {
  renderCard(card, cardsList);
});

// POPUP NUEVA TARJETA

profileAddButton.addEventListener("click", function () {
  newCardForm.reset();
  cardValidator.resetValidation();
  openModal(newCardPopup);
});

newCardClose.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(cardData, cardsList, true);

  newCardForm.reset();
  cardValidator.resetValidation();

  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const profileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-popup .popup__form"),
);

const cardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-popup .popup__form"),
);

profileValidator.setEventListeners();
cardValidator.setEventListeners();
