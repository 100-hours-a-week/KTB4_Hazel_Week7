export function modal({
  id = "modal",
  title = "",
  description = "",
  cancelText = "취소",
  confirmText = "확인",
} = {}) {
  return `
    <div id="${id}" class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__content" role="dialog" aria-modal="true">
        <h2 class="modal__title">${title}</h2>
        <p class="modal__description">${description}</p>

        <div class="modal__button-container">
          <button class="modal__button modal__button--cancel" type="button" data-modal-cancel>
            ${cancelText}
          </button>
          <button class="modal__button modal__button--confirm" type="button" data-modal-confirm>
            ${confirmText}
          </button>
        </div>
      </div>
    </div>
  `;
}

export function openModal(id = "modal") {
  document.querySelector(`#${id}`)?.classList.add("is-active");
}

export function closeModal(id = "modal") {
  document.querySelector(`#${id}`)?.classList.remove("is-active");
}