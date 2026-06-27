import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header({
  type: "withProfile",
});

document.querySelector(".header__profile-button")?.addEventListener("click", () => {
  document.querySelector(".header__dropdown")?.classList.toggle("is-active");
});

document.querySelector(".header__menu-profile-edit")?.addEventListener("click", () => {
  location.href = "../userEditPage/userEdit.html";
});

document.querySelector(".header__menu-password-edit")?.addEventListener("click", () => {
  location.href = "./passwordEdit.html";
});

document.querySelector("#passwordEditFields").innerHTML = `
  ${input({
    id: "password",
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    autocomplete: "current-password",
  })}

  ${input({
    id: "passwordConfirm",
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 한번 더 입력하세요",
    autocomplete: "new-password",
  })}
`;

const passwordEditForm = document.querySelector("#passwordEditForm");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#passwordConfirm");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

async function changePassword(data) {
  // 나중에 API 연결 시 교체
  // const response = await fetch("https://api.example.com/users/me/password", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //   },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error("비밀번호 수정 실패");

  console.log("비밀번호 수정 요청:", data);
}

passwordEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("password", "");
  setHelperText("passwordConfirm", "");

  const password = passwordInput.value.trim();
  const passwordConfirm = passwordConfirmInput.value.trim();

  if (!password) {
    setHelperText("password", "비밀번호를 입력해주세요.");
    return;
  }

  if (!passwordConfirm) {
    setHelperText("passwordConfirm", "비밀번호를 한번 더 입력해주세요.");
    return;
  }

  if (password !== passwordConfirm) {
    setHelperText("passwordConfirm", "비밀번호가 다릅니다.");
    return;
  }

  await changePassword({
    password,
    passwordConfirm,
  });

  alert("비밀번호가 수정되었습니다.");
});