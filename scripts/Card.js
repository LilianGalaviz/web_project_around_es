class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._name, this._link);
    });
  }

  #handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  #handleDeleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this.#getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    const cardTitle = this._element.querySelector(".card__title");
    console.log("Nombre de la tarjeta:", this._name);
    cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.#setEventListeners();

    return this._element;
  }
}

export default Card;
