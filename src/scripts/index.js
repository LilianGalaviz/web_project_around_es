import Card from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForms.js";
import UserInfo from "./components/UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

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

const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

const profileAddButton = document.querySelector(".profile__add-button");

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// EDITAR PERFIL
function handleOpenEditModal() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.about;

  profileValidator.resetValidation();

  editProfilePopup.open();
}

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(
  handleProfileFormSubmit,
  "#edit-popup",
);

editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", handleOpenEditModal);

// TARJETAS INICIALES
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#get_card_element", (name, link) => {
        imagePopup.open(name, link);
      });

      const cardElement = card.generateCard();

      cardsSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardsSection.renderItems();

function handleAddCardSubmit(inputValues) {
  const cardData = {
    name: inputValues.name,
    link: inputValues.link,
  };

  const card = new Card(cardData, "#get_card_element", (name, link) => {
    imagePopup.open(name, link);
  });

  const cardElement = card.generateCard();

  cardsSection.addItem(cardElement, "afterbegin");

  addCardPopup.close();
}

const addCardPopup = new PopupWithForm(handleAddCardSubmit, "#new-card-popup");

addCardPopup.setEventListeners();

profileAddButton.addEventListener("click", function () {
  cardValidator.resetValidation();
  addCardPopup.open();
});

// POPUP NUEVA TARJETA
