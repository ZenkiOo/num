"use strict";

//****************************** MAIN ************************************ */

//*********************************************************************** */

const select = document.querySelector(".select-address__current"),
  account = document.querySelector(".accounts"),
  mainNavBtnText = document.querySelector(".main-nav__button-text"),
  mainNavContainer = document.querySelector(".main-nav-container"),
  mainNavBurger = document.querySelector(".main-nav__burger"),
  mainNav = document.querySelector(".main-nav"),
  mainNavBtn = document.querySelector(".main-nav__button"),
  selectBody = document.querySelector(".select-address__body"),
  selectList = document.querySelector(".select-address__list"),
  addButtons = document.querySelector(".add-new"),
  arrowElem1 = document.querySelector(".arrow-icon__elem1"),
  arrowElem2 = document.querySelector(".arrow-icon__elem2"),
  newAddressButton = document.querySelector(".new-address__button"),
  trackBtn = document.querySelector(".options-body__tracking"),
  trackList = document.querySelector(".track-list"),
  likeBtn = document.querySelector(".options-likes__like"),
  likesList = likeBtn.querySelector(".likes-list");

mainNavBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mainNav.classList.toggle("active-height");
  mainNavBurger.classList.toggle("arrow-anim");
  mainNavBtn.classList.toggle("getwide");
  mainNavContainer.classList.toggle("active");
  mainNavBtnText.classList.toggle("show");
});

account.onmouseover = function () {
  newAddressButton.classList.add("new-address__button--block");
};
account.onmouseout = function () {
  newAddressButton.classList.remove("new-address__button--block");
};

//*********************************************************************** */

select.addEventListener("click", function (e) {
  e.preventDefault();
  toggleCitySelect();

  function toggleCitySelect() {
    select.classList.toggle("select-address__current--active");
    selectBody.classList.toggle("select-address__body--active");
    selectList.classList.toggle("select-address__list--active");
    addButtons.classList.toggle("add-new--active");
    arrowElem1.classList.toggle("arrow-icon__elem1--active");
    arrowElem2.classList.toggle("arrow-icon__elem2--active");
  }
});

document.querySelectorAll(".select-address__link").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    changeText(".select-item__name");
    changeText(".select-item__country");
    changeText(".select-item__index");
    changeText(".select-item__street");

    function changeText(className) {
      select.querySelector(className).innerText = link.querySelector(
        className
      ).innerText;
    }
  });
});

//*********************************************************************** */

document.querySelectorAll(".map-options__show").forEach((mapBtn) => {
  mapBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const inner = this.querySelector(".map-options__show-button-inner"),
      body = this.querySelector(".map-options__show-button");

    if (!inner.classList.contains("active")) {
      inner.classList.add("active");
      body.classList.add("active");
      return;
    }
    if (inner.classList.contains("active")) {
      inner.classList.remove("active");
      body.classList.remove("active");
    }
  });
});

//*********************************************************************** */

trackBtn.addEventListener("mouseenter", () => {
  trackList.classList.add("active");
});
trackBtn.addEventListener("mouseleave", () => {
  trackList.classList.add("fadeout");
  setTimeout(() => {
    trackList.classList.remove("fadeout");
    trackList.classList.remove("active");
  }, 400);
});

//*********************************************************************** */

likeBtn.addEventListener("mouseenter", () => {
  likesList.classList.add("active");
});
likeBtn.addEventListener("mouseleave", () => {
  likesList.classList.add("fadeout");
  setTimeout(() => {
    likesList.classList.remove("fadeout");
    likesList.classList.remove("active");
  }, 400);
});

//*********************************************************************** */

[...document.querySelectorAll(".header-nav__link")].forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".header-nav__link--active")
      .classList.remove("header-nav__link--active");
    e.target.classList.add("header-nav__link--active");
  });
});

[...document.querySelectorAll(".area-nav__link")].forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".area-nav__link--active")
      .classList.remove("area-nav__link--active");
    try {
      e.target
        .closest(".area-nav__link")
        .classList.add("area-nav__link--active");
    } catch {
      e.target.classList.add("area-nav__link--active");
    }
  });
});

//*********************************************************************** */

[...document.querySelectorAll(".new-comment__text")].forEach((txtArea) => {
  txtArea.onfocus = () => {
    txtArea.closest(".new-comment").classList.add("active");
  };
  txtArea.onblur = () => {
    txtArea.closest(".new-comment").classList.remove("active");
  };
});

//****************************** Aside ************************************ */

const replyButtons = [
    ...document.querySelectorAll(".comment__footer-reply-link"),
  ],
  commentsArr = [...document.querySelectorAll(".comment")];

commentsArr.forEach((comment, i) => {
  comment.dataset.id = i;
  i++;
});

replyButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = btn.closest(".comment").dataset.id,
      comments = btn.closest(".comments"),
      comment = document.createElement("DIV");
    comment.classList.add("comment", "comment-replied");
    comments.insertBefore(
      comment,
      document.querySelector(`div[data-id="${+id + 1}"]`)
    );
    comment.insertAdjacentHTML(
      "beforeend",
      `
        <a href="#" class="comment__name">
          Сергей Титов
          <span class="comment__name-status"> </span>
        </a>
        <p class="comment__text">
          По настоящему богатый никогда не покажет, что он богат, а
          вот не очень — обязательно… с умом дела обстоят так же…
        </p>
        <div class="comment__footer">
          <div class="comment__footer-body">
            <div class="comment__footer-reply">
              <span class="comment__footer-time"
                >40 минут назад</span
              >
              <a href="#" class="comment__footer-reply-link">Ответить</a>
            </div>
            <div class="comment__footer-likes comment-likes">
              <a href="#" class="comment-likes__like">10</a>
              <a href="#" class="comment-likes__dislike">2</a>
              <a href="#" class="comment-likes__exmark"></a>
            </div>
          </div>
        </div>
      <a href="#" class="comment__close"></a>
    `
    );
  });
});

//*********************************************************************** */

class Data {
  constructor(...options) {
    this.options = options;
    this.storage = {};

    this.setStorage();
    this.linksInit();
  }

  linksInit() {
    [...document.querySelectorAll(".comment-likes__like")].forEach((like) => {
      like.addEventListener("click", (e) => this.likeClick(e));
    });
  }

  likeClick(e) {
    e.preventDefault();
    const storage = this.getStorage(),
      comment = e.target.closest(".comment"),
      values = storage[`${comment.dataset.id}`];

    for (var prop in storage) {
      if (prop === comment.dataset.id) {
        storage[prop][0]++;
      }
    }
    if (values.length === 2) values.push("true");

    this.setNum(
      comment.querySelector(".comment-likes__like"),
      storage[`${comment.dataset.id}`][0]
    );
    this.setChanges(storage);
  }

  setChanges(object) {
    localStorage.stor = JSON.stringify(object);
  }
  setNum(item, likes) {
    item.textContent = likes;
  }
  getStorage() {
    return JSON.parse(localStorage.stor);
  }

  setStorage() {
    const commentsLikes = this.getCommentsLikes();
    if (!localStorage.stor) {
      localStorage.stor = JSON.stringify(commentsLikes);
      this.comLikes = commentsLikes;
    } else {
      this.renderLikes();
    }
  }

  getCommentsLikes() {
    const commLikes = {};
    [...document.querySelectorAll(".comment")].forEach((comment) => {
      const likes = +comment.querySelector(".comment-likes__like").innerText,
        dislikes = +comment.querySelector(".comment-likes__dislike").innerText;

      commLikes[`${comment.dataset.id}`] = [likes, dislikes];
    });
    return commLikes;
  }
  renderLikes() {
    const stor = this.getStorage();
    for (var prop in stor) {
      if (stor[prop].length === 3) {
        this.setNum(
          document
            .querySelector(`div[data-id="${prop}"]`)
            .querySelector(".comment-likes__like"),
          stor[prop][0]
        );
      }
    }
  }
}
const data = new Data();

//*********************************************************************** */

[...document.querySelectorAll(".track-list__link")].forEach((link) => {
  link.style.backgroundImage = `url(img/follower${random(1, 6)}.jpg)`;
});
[...document.querySelectorAll(".likes-list__link")].forEach((link) => {
  link.style.backgroundImage = `url(img/follower${random(1, 6)}.jpg)`;
});
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//*********************************************************************** */

document.querySelectorAll(".tabs-triggers__item").forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href"),
      tabs = e.target.closest(".tabs");
    tabs
      .querySelectorAll(".tabs-triggers__item")
      .forEach((tabTrigger) =>
        tabTrigger.classList.remove("tabs-triggers__item--active")
      );
    tabs
      .querySelectorAll(".tabs-content__item")
      .forEach((tab) => tab.classList.remove("tabs-content__item--active"));
    try {
      item.classList.add("tabs-triggers__item--active");
      document.getElementById(id).classList.add("tabs-content__item--active");
    } catch {
      return;
    }
  })
);
