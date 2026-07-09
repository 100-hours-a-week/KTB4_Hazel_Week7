import { logoutRequest } from "../../api/authApi.js";

export function header({ type = "default" } = {}) {
  if (type === "withProfile") {
    return `
      <header class="header">
        <div class="header__inner header__inner--with-profile">
          <div class="header__left-space"></div>
          <h1 class="header__title">작심삼일</h1>

          <div class="header__profile-wrapper">
            <button class="header__profile-button" type="button" aria-label="프로필 메뉴">
              <div class="header__profile-image"></div>
            </button>

            <div class="header__dropdown">
              <button class="header__dropdown-item header__menu-profile-edit" type="button">회원정보수정</button>
              <button class="header__dropdown-item header__menu-password-edit" type="button">비밀번호수정</button>
              <button class="header__dropdown-item header__menu-logout" type="button">로그아웃</button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  if (type === "withBack") {
    return `
      <header class="header">
        <div class="header__inner header__inner--with-back">
          <button class="header__back-button" type="button" aria-label="뒤로가기">&lt;</button>
          <h1 class="header__title">작심삼일</h1>
          <div class="header__right-space"></div>
        </div>
      </header>
    `;
  }

  if (type === "withBackAndProfile") {
    return `
      <header class="header">
        <div class="header__inner header__inner--with-back-profile">
          <button class="header__back-button" type="button" aria-label="뒤로가기">&lt;</button>
          <h1 class="header__title">작심삼일</h1>

          <div class="header__profile-wrapper">
            <button class="header__profile-button" type="button" aria-label="프로필 메뉴">
              <div class="header__profile-image"></div>
            </button>

            <div class="header__dropdown">
              <button class="header__dropdown-item header__menu-profile-edit" type="button">회원정보수정</button>
              <button class="header__dropdown-item header__menu-password-edit" type="button">비밀번호수정</button>
              <button class="header__dropdown-item header__menu-logout" type="button">로그아웃</button> 
            </div>
          </div>
        </div>
      </header>
    `;
  }

  return `
    <header class="header">
      <div class="header__inner">
        <h1 class="header__title">작심삼일</h1>
      </div>
    </header>
  `;
}

export function bindHeaderEvents() {
  const profileButton = document.querySelector(".header__profile-button");
  const dropdown = document.querySelector(".header__dropdown");

  profileButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown?.classList.toggle("is-active");
  });

  dropdown?.addEventListener("click", (event) => {
    event.stopPropagation();
  });


  document.querySelector(".header__back-button")?.addEventListener("click", () => {
    history?.back();
  });

  document.addEventListener("click", () => {
    dropdown?.classList.remove("is-active");
  });

  document.querySelector(".header__menu-profile-edit")?.addEventListener("click", () => {
    location.href = "../userEditPage/userEdit.html";
  });

  document.querySelector(".header__menu-password-edit")?.addEventListener("click", () => {
    location.href = "../passwordEditPage/passwordEdit.html";
  });

  document.querySelector(".header__menu-logout")?.addEventListener("click", async () => {
  try {
    await logoutRequest();
  } catch (error) {
    console.error("로그아웃 실패:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userId");

    location.href = "../loginPage/login.html";
  }
});
}