import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header({
  type: "isBeforeButton",
});

document.querySelector("#signupFields").innerHTML = `
  ${input({
    id: "email",
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력하세요",
    required: true,
    autocomplete: "email",
  })}

  ${input({
    id: "password",
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    autocomplete: "new-password",
  })}

  ${input({
    id: "passwordConfirm",
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 한번 더 입력하세요",
    required: true,
    autocomplete: "new-password",
  })}

  ${input({
    id: "nickname",
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력하세요",
    required: true,
    autocomplete: "nickname",
  })}
`;

const signupForm = document.querySelector("#signupForm");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

function clearHelperTexts() {
  setHelperText("email", "");
  setHelperText("password", "");
  setHelperText("passwordConfirm", "");
  setHelperText("nickname", "");
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearHelperTexts();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  const email = data.email.trim();
  const password = data.password.trim();
  const passwordConfirm = data.passwordConfirm.trim();
  const nickname = data.nickname.trim();

  if (!email) {
    setHelperText("email", "이메일을 입력해주세요.");
    return;
  }

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

  if (!nickname) {
    setHelperText("nickname", "닉네임을 입력해주세요.");
    return;
  }

  console.log("회원가입 데이터:", {
    email,
    password,
    nickname,
  });

  // 나중에 API 붙이면 여기서 호출
  // await signup({ email, password, nickname });
});