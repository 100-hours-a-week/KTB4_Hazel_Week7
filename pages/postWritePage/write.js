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
  selectedImages = Array.from(imageInput.files);

  imageFileName.textContent = selectedImages.length
    ? `${selectedImages.length}개의 이미지 선택됨`
    : "파일을 선택해주세요.";
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

  const createPayload = {
    title,
    text,
    images: selectedImages.map((file) => file.name),
  };

  console.log("게시글 작성 요청 payload:", createPayload);

  try {
    const response = await createBoardRequest(createPayload);

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
