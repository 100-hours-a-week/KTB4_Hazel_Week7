import { header, bindHeaderEvents } from "../../components/header/header.js";
import { createBoardRequest } from "../../api/boardApi.js";

document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

const writeForm = document.querySelector("#writeForm");
const titleInput = document.querySelector("#title");
const contentTextarea = document.querySelector("#content");
const imageInput = document.querySelector("#image");
const imageFileName = document.querySelector("#imageFileName");

let selectedImages = [];

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

imageInput.addEventListener("change", () => {
  const newSelectedImages = Array.from(imageInput.files);
  selectedImages = [
    ...selectedImages,
    ...newSelectedImages,
  ]

  imageFileName.textContent = selectedImages.length
    ? `${selectedImages.length}개의 이미지 선택됨`
    : "파일을 선택해주세요.";

  imageInput.value = "";
});

writeForm.addEventListener("submit", async (event) => {
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

  selectedImages.forEach((file) => {
    formData.append("images", file);
  })

  try {
    const response = await createBoardRequest(formData);

    const boardId = response?.data?.id;

    if (boardId) {
      location.href = `../boardDetailPage/detail.html?id=${boardId}`;
      return;
    }

    location.href = "../boardPage/board.html";
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    setHelperText("content", error.message || "게시글 작성에 실패했습니다.");
  }
});

bindHeaderEvents();
