import { header, bindHeaderEvents } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";
import { changePasswordRequest } from "../../api/userApi.js";

document.querySelector("#header").innerHTML = header({
  type: "withProfile",
});

bindHeaderEvents();

document.querySelector("#passwordEditFields").innerHTML = `
  ${input({
    id: "currentPassword",
    name: "currentPassword",
    label: "현재 비밀번호",
    type: "password",
    placeholder: "현재 비밀번호를 입력하세요",
    autocomplete: "current-password",
  })}

  ${input({
    id: "newPassword",
    name: "newPassword",
    label: "새 비밀번호",
    type: "password",
    placeholder: "새 비밀번호를 입력하세요",
    autocomplete: "new-password",
  })}

  ${input({
    id: "newPasswordConfirm",
    name: "newPasswordConfirm",
    label: "새 비밀번호 확인",
    type: "password",
    placeholder: "새 비밀번호를 한번 더 입력하세요",
    autocomplete: "new-password",
  })}
`;

const passwordEditForm = document.querySelector("#passwordEditForm");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

  return passwordRegex.test(password);
}

passwordEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("currentPassword", "");
  setHelperText("newPassword", "");
  setHelperText("newPasswordConfirm", "");

  const formData = new FormData(passwordEditForm);
  const data = Object.fromEntries(formData.entries());

  const currentPassword = data.currentPassword.trim();
  const newPassword = data.newPassword.trim();
  const newPasswordConfirm = data.newPasswordConfirm.trim();

  if (!currentPassword) {
    setHelperText("currentPassword", "현재 비밀번호를 입력해주세요.");
    return;
  }

  if (!newPassword) {
    setHelperText("newPassword", "새 비밀번호를 입력해주세요.");
    return;
  }

  if (!isValidPassword(newPassword)) {
    setHelperText(
      "newPassword",
      "비밀번호는 8자 이상 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
    );
    return;
  }

  if (!newPasswordConfirm) {
    setHelperText("newPasswordConfirm", "새 비밀번호를 한번 더 입력해주세요.");
    return;
  }

  if (newPassword !== newPasswordConfirm) {
    setHelperText("newPasswordConfirm", "비밀번호가 다릅니다.");
    return;
  }

  const updatePayload = {
    currentPassword,
    newPassword,
  };

  console.log("비밀번호 수정 요청 payload:", updatePayload);

  try {
    await changePasswordRequest(updatePayload);

    alert("비밀번호가 수정되었습니다.");
    location.href = "../boardPage/board.html";
  } catch (error) {
    console.error("비밀번호 수정 실패:", error);
    setHelperText("currentPassword", error.message || "비밀번호 수정에 실패했습니다.");
  }
});