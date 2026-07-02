import { header, bindHeaderEvents } from "../../components/header/header.js";
import {
  getBoardDetailRequest,
  updateBoardRequest,
} from "../../api/boardApi.js";

document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

const editForm = document.querySelector("#editForm");
const titleInput = document.querySelector("#title");
const contentTextarea = document.querySelector("#content");
const imageInput = document.querySelector("#image");
const imageFileName = document.querySelector("#imageFileName");
const imagePreviewList = document.querySelector("#imagePreviewList");

let currentImages = [];
let newImages = [];

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

function renderImagePreviewList() {
  imagePreviewList.innerHTML = `
    ${currentImages
      .map(
        (imageUrl, index) => `
          <div class="image-preview">
            <span class="image-preview__text">${imageUrl}</span>
            <button class="image-preview__delete-button" type="button" data-type="current" data-index="${index}">
              삭제
            </button>
          </div>
        `
      )
      .join("")}

    ${newImages
      .map(
        (file, index) => `
          <div class="image-preview">
            <span class="image-preview__text">${file.name}</span>
            <button class="image-preview__delete-button" type="button" data-type="new" data-index="${index}">
              삭제
            </button>
          </div>
        `
      )
      .join("")}
  `;

  document.querySelectorAll(".image-preview__delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      const index = Number(button.dataset.index);

      if (type === "current") {
        currentImages.splice(index, 1);
      }

      if (type === "new") {
        newImages.splice(index, 1);
      }

      renderImagePreviewList();
    });
  });
}

async function getPostDetail(id) {
  const response = await getBoardDetailRequest(id);
  return response.data;
}

async function initEditPage() {
  const post = await getPostDetail(postId);

  titleInput.value = post.title;
  contentTextarea.value = post.text;

  currentImages = post.images || [];
  imageFileName.textContent = currentImages.length
    ? `${currentImages.length}개의 기존 이미지`
    : "파일을 선택해주세요.";

  renderImagePreviewList();
}

imageInput.addEventListener("change", () => {
  const selectedFiles = Array.from(imageInput.files);

  if (!selectedFiles.length) return;

  currentImages = [];
  newImages = [...newImages, ...selectedFiles];

  imageFileName.textContent = `${newImages.length}개의 새 이미지 선택됨`;

  renderImagePreviewList();

  imageInput.value = "";
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("title", "");
  setHelperText("content", "");

  const title = titleInput.value.trim();
  const text = contentTextarea.value.trim();

  if (!title) {
    setHelperText("title", "제목을 입력해주세요.");
    return;
  }

  if (!text) {
    setHelperText("content", "내용을 입력해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);


  if (newImages.length > 0) {
    newImages.forEach((image) => {
      formData.append("images", image);
    });
  } else {
    currentImages.forEach((image) => {
      formData.append("images", image);
    });
  }

  await updateBoardRequest(postId, formData)

  location.href = `../boardDetailPage/detail.html?id=${postId}`;
});

initEditPage();
bindHeaderEvents();
