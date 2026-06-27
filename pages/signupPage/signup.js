import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header({
  type: "isBeforeButton",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
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
  })}
`;


// api 로직 추가하는 부분임
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

async function signupRequest(data) {
  const response = await fetch("http://localhost:8080/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "회원가입에 실패했습니다.");
  }

  return response.json();
}

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearHelperTexts();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  const email = data.email.trim();
  const password = data.password.trim();
  const passwordConfirm = data.passwordConfirm.trim();
  const nickname = data.nickname.trim();
  const profileImage = profileImageInput.files[0];

  if (!email) {
    setHelperText("email", "이메일을 입력해주세요.");
    return;
  }

  if (!isValidEmail(email)) {
    setHelperText("email", "이메일 주소 형식을 입력해주세요.");
    return;
  }

  if (!password) {
    setHelperText("password", "비밀번호를 입력해주세요.");
    return;
  }

  //다만들고 조건 풀기
  // if (!isValidPassword(password)) {
  //   setHelperText(
  //     "password",
  //     "비밀번호는 8자 이상 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
  //   );
  //   return;
  // }

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

  if (!profileImage) {
    setHelperText("profileImage", "프로필 사진을 추가해주세요.");
    return;
  }

  try {
    await signupRequest({
      email,
      password,
      nickname,
      profileImage: "",
    });

    alert("회원가입이 완료되었습니다.");
    location.href = "../loginPage/login.html";
  } catch (error) {
    setHelperText("email", error.message);
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

  return passwordRegex.test(password);
}


// 프로필 이미지
const profileImageInput = document.querySelector("#profileImage");
const profileImageButton = document.querySelector(".profile-image-field__button");
const profileImageHelper = document.querySelector("#profileImageHelper");

function setProfileImageHelper(message) {
  profileImageHelper.textContent = message ? `* ${message}` : "";
}

profileImageInput.addEventListener("change", () => {
  const file = profileImageInput.files[0];

  setProfileImageHelper("");

  if (!file) {
    profileImageButton.innerHTML = `<span class="profile-image-field__plus">+</span>`;
    profileImageButton.style.backgroundImage = "";
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  profileImageButton.innerHTML = "";
  profileImageButton.style.backgroundImage = `url(${imageUrl})`;
  profileImageButton.style.backgroundSize = "cover";
  profileImageButton.style.backgroundPosition = "center";
});