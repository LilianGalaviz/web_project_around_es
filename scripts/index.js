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
const profileFormInputs = Array.from(
  formElement.querySelectorAll(".popup__input"),
);

const profileSubmitButton = formElement.querySelector(".popup__button");

const cardsList = document.querySelector(".cards__list");

const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const newCardFormInputs = Array.from(
  newCardForm.querySelectorAll(".popup__input"),
);
const newCardSubmitButton = newCardForm.querySelector(".popup__button");
const newCardClose = newCardPopup.querySelector(".popup__close");

const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");

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

// ABRIR Y CERRAR POPUPS

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// EDITAR PERFIL

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(formElement, profileFormInputs, profileSubmitButton);
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

// CREAR TARJETAS

function getCardElement({ name, link }) {
  const cardTemplate = document.querySelector("#get_card_element").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", function () {
    handleLikeButton(likeButton);
  });

  deleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement);
  });

  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCard(cardData, container, isFirst = false) {
  const cardElement = getCardElement(cardData);

  if (isFirst) {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

// TARJETAS INICIALES

initialCards.forEach(function (card) {
  renderCard(card, cardsList);
});

// POPUP NUEVA TARJETA

profileAddButton.addEventListener("click", function () {
  newCardForm.reset();
  resetValidation(newCardForm, newCardFormInputs, newCardSubmitButton);
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

  resetValidation(newCardForm, newCardFormInputs, newCardSubmitButton);

  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// LIKE

function handleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}

// ELIMINAR TARJETA

function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// POPUP DE IMAGEN

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

imagePopupClose.addEventListener("click", function () {
  closeModal(imagePopup);
});

enableValidation();
