import { header, bindHeaderEvents } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";
import { getMyInfoRequest, updateMyInfoRequest, deleteMyAccountRequest } from "../../api/userApi.js";

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

async function initUserEditPage() {
  try {
    const response = await getMyInfoRequest();
    const user = response.data;

    console.log("내 정보 조회 응답:", response);

    emailText.textContent = user.email;
    nicknameInput.value = user.nickname;

    if (user.profileImage) {
      profilePreview.src = user.profileImage;
    }
  } catch (error) {
    console.error("내 정보 조회 실패:", error);
  }
}

let selectedProfileImageFile = null;

profileImageInput.addEventListener("change", () => {
  const file = profileImageInput.files[0];

  if (!file) return;

  selectedProfileImageFile = file
  profilePreview.src = URL.createObjectURL(file);
});

function showToast() {
  toast.classList.add("is-active");

  setTimeout(() => {
    toast.classList.remove("is-active");
  }, 1500);
}

userEditForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("nickname", "");

  const nickname = nicknameInput.value.trim();

  if (!nickname) {
    setHelperText("nickname", "닉네임을 입력해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("nickname", nickname);

  if (selectedProfileImageFile) {
    formData.append("profileImage", selectedProfileImageFile);
  }

  try {
    await updateMyInfoRequest(formData);
    showToast();
  } catch (error) {
    console.error("회원정보 수정 실패:", error);
    setHelperText("nickname", error.message || "회원정보 수정에 실패했습니다.");
  }
});

const withdrawButton = document.querySelector("#withdrawButton");

withdrawButton.addEventListener("click", async () => {
  const isConfirmed = confirm("회원 탈퇴하시겠습니까?");

  if (!isConfirmed) return;

  try {
    await deleteMyAccountRequest();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userId");

    location.href = "../loginPage/login.html";
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    alert(error.message || "회원 탈퇴에 실패했습니다.");
  }
});

initUserEditPage();
bindHeaderEvents();
