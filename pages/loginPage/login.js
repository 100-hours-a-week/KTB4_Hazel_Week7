import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header();

const signupButton = document.querySelector("#signupButton");

signupButton.addEventListener("click", () => {
  location.href = "../signupPage/signup.html"
})

document.querySelector("#loginFields").innerHTML = `
  ${input({
    id: "email",
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력하세요",
    required: true,
    helperText: "",
    autocomplete: "email",
  })}

  ${input({
    id: "password",
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    helperText: "",
    autocomplete: "current-password",
  })}
`;

const loginForm = document.querySelector("#loginForm");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

async function loginRequest(data) {
  const response = await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("로그인에 실패했습니다.");
  }

  return response.json();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("email", "");
  setHelperText("password", "");

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  const email = data.email.trim();
  const password = data.password.trim();

  if (!email) {
    setHelperText("email", "이메일을 입력해주세요.");
    return;
  }

  if (!password) {
    setHelperText("password", "비밀번호를 입력해주세요.");
    return;
  }

  try {
    const result = await loginRequest({
      email,
      password,
    });

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("tokenType", result.tokenType);
    localStorage.setItem("userId", result.userId);

    location.href = "../boardPage/board.html";
  } catch (error) {
    setHelperText("password", "이메일 또는 비밀번호가 올바르지 않습니다.");
  }
});