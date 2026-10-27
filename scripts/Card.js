import { openModal } from "./utils.js";

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  #getTemplate() {
    const template = document.querySelector(this._templateSelector).content;

    return template.querySelector(".card").cloneNode(true);
  }

  #setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.#handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this.#handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this.#handleImageClick();
    });
  }

  #handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  #handleDeleteCard() {
    this._element.remove();
  }

  #handleImageClick() {
    const imagePopup = document.querySelector("#image-popup");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;

    openModal(imagePopup);
  }

  generateCard() {
    this._element = this.#getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    const cardTitle = this._element.querySelector(".card__title");

    cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.#setEventListeners();

    return this._element;
  }
}

export default Card;
