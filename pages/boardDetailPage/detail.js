import { header, bindHeaderEvents } from "../../components/header/header.js";
import { getBoardDetailRequest, deleteBoardRequest } from "../../api/boardApi.js";

document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
});

async function getPostDetail(postId) {
  const response = await getBoardDetailRequest(postId);

  console.log("게시글 상세 API 응답:", response);

  return response.data;
}

const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));
const postDetail = document.querySelector("#postDetail");

function createImageList(images = []) {
  if (!images.length) {
    return `<div class="detail__image"></div>`;
  }

  return `
    <div class="detail__image-list">
      ${images
        .map(
          (imageUrl, index) => `
            <img
              class="detail__image"
              src="${imageUrl}"
              alt="게시글 이미지 ${index + 1}"
            />
          `
        )
        .join("")}
    </div>
  `;
}

function renderPostDetail({
  id,
  title,
  writer,
  createdAt,
  images,
  text,
  likeCount,
  views,
  comments,
}) {
  postDetail.innerHTML = `
    <h2 class="detail__title">${title}</h2>

    <div class="detail__meta">
      <div class="detail__mate-container">
        <div class="profile-container">
          <div class="profile__image"></div>
          <div class="profile__name">${writer}</div>
        </div>

        <span class="detail__date">${createdAt}</span>
      </div>

      <div class="detail__button-container">
        <button id="editButton" class="detail__button" type="button">수정</button>
        <button id="deleteButton" class="detail__button" type="button">삭제</button>
      </div>
    </div>

    <div class="line"></div>

    ${createImageList(images)}

    <p class="detail__content">${text}</p>

    <div class="detail__count-container">
      <div class="detail__count-box">
        <strong>${likeCount}</strong>
        <span>좋아요수</span>
      </div>
      <div class="detail__count-box">
        <strong>${views}</strong>
        <span>조회수</span>
      </div>
      <div class="detail__count-box">
        <strong>${comments}</strong>
        <span>댓글</span>
      </div>
    </div>

    <div class="line"></div>

    <div class="comment-form">
      <textarea class="comment-form__textarea" placeholder="댓글을 남겨주세요!"></textarea>
      <div class="comment-form__button-outline">
        <button class="comment-form__button" type="button">댓글 등록</button>
      </div>
    </div>

    <div id="commentList" class="comment-list"></div>
  `;

  document.querySelector("#editButton")?.addEventListener("click", () => {
    location.href = `../boardEditPage/edit.html?id=${id}`;
  });

  document.querySelector("#deleteButton")?.addEventListener("click", async () => {
    const isConfirmed = confirm("게시글을 삭제하시겠습니까?");

    if (!isConfirmed) return;

    try {
      await deleteBoardRequest(id);

      location.href = "../boardPage/board.html";
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert(error.message || "게시글 삭제에 실패했습니다.");
    }
  });
}

async function initDetailPage() {
  try {
    const post = await getPostDetail(postId);
    renderPostDetail(post);
  } catch (error) {
    console.error(error);
    postDetail.innerHTML = `<p class="detail__error">게시글을 불러오지 못했습니다.</p>`;
  }
}

initDetailPage();
bindHeaderEvents();