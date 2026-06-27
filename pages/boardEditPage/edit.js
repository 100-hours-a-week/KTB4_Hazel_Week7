import { header } from "../../components/header/header.js";

document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
});

const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

const editForm = document.querySelector("#editForm");
const titleInput = document.querySelector("#title");
const contentTextarea = document.querySelector("#content");
const imageInput = document.querySelector("#image");
const imageFileName = document.querySelector("#imageFileName");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

async function getPostDetail(id) {
  // 나중에 API 연결 시 이 부분만 교체
  // const response = await fetch(`https://api.example.com/boards/${id}`);
  // if (!response.ok) throw new Error("게시글 조회 실패");
  // return response.json();

  return {
    id,
    title: "제목 1",
    content:
      "무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다.",
    imageName: "기존 파일 명",
  };
}

async function updatePost(id, formData) {
  // 나중에 API 연결 시 이 부분 사용
  // const response = await fetch(`https://api.example.com/boards/${id}`, {
  //   method: "PUT",
  //   body: formData,
  // });
  // if (!response.ok) throw new Error("게시글 수정 실패");

  console.log("수정 요청:", id, Object.fromEntries(formData.entries()));
}

async function initEditPage() {
  const post = await getPostDetail(postId);

  titleInput.value = post.title;
  contentTextarea.value = post.content;
  imageFileName.textContent = post.imageName || "파일을 선택해주세요.";
}

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  imageFileName.textContent = file ? file.name : "파일을 선택해주세요.";
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("title", "");
  setHelperText("content", "");

  const title = titleInput.value.trim();
  const content = contentTextarea.value.trim();

  if (!title) {
    setHelperText("title", "제목을 입력해주세요.");
    return;
  }

  if (!content) {
    setHelperText("content", "내용을 입력해주세요.");
    return;
  }

  const formData = new FormData(editForm);

  await updatePost(postId, formData);

  location.href = `../postDetailPage/detail.html?id=${postId}`;
});

initEditPage();