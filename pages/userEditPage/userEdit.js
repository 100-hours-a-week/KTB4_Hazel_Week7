import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header({
  type: "withProfile",
});

document.querySelector("#nicknameField").innerHTML = input({
  id: "nickname",
  name: "nickname",
  label: "닉네임",
  type: "text",
  placeholder: "닉네임을 입력하세요",
});


document.querySelector(".header__profile-button")?.addEventListener("click", () => {
  document.querySelector(".header__dropdown")?.classList.toggle("is-active");
});

document.querySelector(".header__menu-profile-edit")?.addEventListener("click", () => {
  location.href = "./userEdit.html";
});

document.querySelector(".header__menu-password-edit")?.addEventListener("click", () => {
  location.href = "../passwordEditPage/passwordEdit.html";
});

const userEditForm = document.querySelector("#userEditForm");
const emailText = document.querySelector("#emailText");
const nicknameInput = document.querySelector("#nickname");
const profileImageInput = document.querySelector("#profileImage");
const profilePreview = document.querySelector("#profilePreview");
const toast = document.querySelector("#toast");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

async function getMyInfo() {
  // 나중에 API 연결 시 교체
  // const response = await fetch("https://api.example.com/users/me", {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //   },
  // });
  // if (!response.ok) throw new Error("내 정보 조회 실패");
  // return response.json();

  return {
    email: "startupcode@gmail.com",
    nickname: "스타트업코드",
    profileImage: "",
  };
}

async function updateMyInfo(formData) {
  // 나중에 API 연결 시 교체
  // const response = await fetch("https://api.example.com/users/me", {
  //   method: "PATCH",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //   },
  //   body: formData,
  // });
  // if (!response.ok) throw new Error("회원정보 수정 실패");

  console.log("회원정보 수정 요청:", Object.fromEntries(formData.entries()));
}

function showToast() {
  toast.classList.add("is-active");

  setTimeout(() => {
    toast.classList.remove("is-active");
  }, 1500);
}

async function initUserEditPage() {
  const user = await getMyInfo();

  emailText.textContent = user.email;
  nicknameInput.value = user.nickname;

  if (user.profileImage) {
    profilePreview.src = user.profileImage;
  }
}

profileImageInput.addEventListener("change", () => {
  const file = profileImageInput.files[0];

  if (!file) return;

  profilePreview.src = URL.createObjectURL(file);
});

userEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("nickname", "");

  const nickname = nicknameInput.value.trim();

  if (!nickname) {
    setHelperText("nickname", "닉네임을 입력해주세요.");
    return;
  }

  const formData = new FormData(userEditForm);
  formData.set("nickname", nickname);

  await updateMyInfo(formData);
  showToast();
});

document.querySelector("#withdrawButton").addEventListener("click", () => {
  console.log("회원 탈퇴 클릭");
  // 나중에 회원 탈퇴 API 연결
});

initUserEditPage();