export function input({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  helperText = "",
  value = "",
  autocomplete = "",
} = {}) {
  return `
    <div class="input-field">
      <label class="input-field__label" for="${id}">
        ${label}${required ? "*" : ""}
      </label>

      <input
        id="${id}"
        name="${name}"
        class="input-field__input"
        type="${type}"
        placeholder="${placeholder}"
        value="${value}"
        ${required ? "required" : ""}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ""}
      />

      <p id="${id}Helper" class="input-field__helper">
        ${helperText ? `* ${helperText}` : ""}
      </p>
    </div>
  `;
}