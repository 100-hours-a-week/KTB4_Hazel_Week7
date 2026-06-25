export function header({ type = "default" } = {}) {
  if (type === "isBeforeButton") {
    return `
      <header class="header">
        <div class="header__inner header__inner--with-back">
          <button class="header__back-button" type="button" aria-label="뒤로가기">&lt;</button>
          <h1 class="header__title">아무 말 대잔치</h1>
          <div class="header__right-space"></div>
        </div>
      </header>
    `;
  }

  return `
    <header class="header">
      <div class="header__inner">
        <h1 class="header__title">아무 말 대잔치</h1>
      </div>
    </header>
  `;
}