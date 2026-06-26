import { header } from "../../components/header/header.js";

document.querySelector("#header").innerHTML = header({
  type: "isBeforeButton",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
});

const writeForm = document.querySelector("#writeForm");

function setHelperText(id, message) {
  const helper = document.querySelector(`#${id}Helper`);
  helper.textContent = message ? `* ${message}` : "";
}

writeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  setHelperText("title", "");
  setHelperText("content", "");

  const formData = new FormData(writeForm);

  const title = formData.get("title").trim();
  const content = formData.get("content").trim();

  if (!title) {
    setHelperText("title", "제목을 입력해주세요.");
    return;
  }

  if (!content) {
    setHelperText("content", "내용을 입력해주세요.");
    return;
  }

  console.log("게시글 작성 데이터:", {
    title,
    content,
    image: formData.get("image"),
  });

  // 나중에 API 붙이면 여기서 fetch 사용
  // await createPost(formData);

  location.href = "../boardPage/board.html";
});