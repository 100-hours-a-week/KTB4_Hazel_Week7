import { header, bindHeaderEvents } from "../../components/header/header.js";
import { getBoardDetailRequest, deleteBoardRequest } from "../../api/boardApi.js";
import { getCommentsRequest, createCommentRequest, updateCommentRequest, deleteCommentRequest } from "../../api/commentApi.js";
import { modal, openModal, closeModal } from "../../components/modal/modal.js";
import { formatDate } from "../../utils/formatDate.js"


document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
});

document.querySelector("#modalRoot").innerHTML = modal({
  id: "deleteCommentModal",
  title: "댓글을 삭제하시겠습니까?",
  description: "삭제한 내용은 복구 할 수 없습니다.",
  cancelText: "취소",
  confirmText: "확인",
});

document
  .querySelector("#deleteCommentModal [data-modal-cancel]")
  ?.addEventListener("click", () => {
    selectedDeleteComment = null;
    closeModal("deleteCommentModal");
  });

document
  .querySelector("#deleteCommentModal .modal__overlay")
  ?.addEventListener("click", () => {
    selectedDeleteComment = null;
    closeModal("deleteCommentModal");
  });

document
  .querySelector("#deleteCommentModal [data-modal-confirm]")
  ?.addEventListener("click", async () => {
    if (!selectedDeleteComment) return;

    const { boardId, commentId } = selectedDeleteComment;

    try {
      await deleteCommentRequest(boardId, commentId);

      selectedDeleteComment = null;
      closeModal("deleteCommentModal");

      const post = await getPostDetail(boardId);
      renderPostDetail(post);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert(error.message || "댓글 삭제에 실패했습니다.");
    }
  });

let selectedDeleteComment = null;

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

function createCommentItem({
  id, writer, createdAt, content, isOwner
}) {
  const formattedCreatedAt = formatDate(createdAt);

  return `
    <div class="comment-item" data-comment-id="${id}">
      <div class="profile__image"></div>

      <div class="comment-item__content">
        <div class="comment-item__meta">
          <span class="comment-item__author">${writer}</span>
          <span class="comment-item__date">${formattedCreatedAt}</span>

          <div class="comment-item__button-container">
          ${
            isOwner ? `
              <button class="detail__button comment-edit-button" type="button" data-comment-id="${id}">
                수정
              </button>
              <button class="detail__button comment-delete-button" type="button" data-comment-id="${id}">
                삭제
              </button>
            ` : ``
          }
          </div>
        </div>

        <p class="comment-item__text">${content}</p>
      </div>
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
  isOwner
}) {
  const formattedCreatedAt = formatDate(createdAt);

  postDetail.innerHTML = `
    <h2 class="detail__title">${title}</h2>

    <div class="detail__meta">
      <div class="detail__mate-container">
        <div class="profile-container">
          <div class="profile__image"></div>
          <div class="profile__name">${writer}</div>
        </div>

        <span class="detail__date">${formattedCreatedAt}</span>
      </div>

      ${
        isOwner ? `
          <div class="detail__button-container">
            <button id="editButton" class="detail__button" type="button">수정</button>
            <button id="deleteButton" class="detail__button" type="button">삭제</button>
          </div>
        `: ``
      }

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
      <textarea id="commentContent" class="comment-form__textarea" placeholder="댓글을 남겨주세요!"></textarea>
      <div class="comment-form__button-outline">
        <button id="commentSubmitButton" class="comment-form__button" type="button">댓글 등록</button>
      </div>
    </div>

    <div id="commentList" class="comment-list"></div>
  `;

  renderComments(id);

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

  document.querySelector("#commentSubmitButton")?.addEventListener("click", async () => {
    const commentTextarea = document.querySelector("#commentContent");
    const content = commentTextarea.value.trim();

    if (!content) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await createCommentRequest(id, {
        content,
      });

      commentTextarea.value = "";

      const post = await getPostDetail(id);
      renderPostDetail(post);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert(error.message || "댓글 등록에 실패했습니다.");
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

async function renderComments(boardId) {
  const response = await getCommentsRequest(boardId);

  console.log("댓글 목록 API 응답:", response);

  const comments = response.data?.comments || response.data || [];
  const commentList = document.querySelector("#commentList");

  commentList.innerHTML = comments
    .map((comment) => createCommentItem(comment))
    .join("");

  bindCommentEvents(boardId, comments);
}

function bindCommentEvents(boardId, comments) {
document.querySelectorAll(".comment-delete-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedDeleteComment = {
      boardId,
      commentId: Number(button.dataset.commentId),
    };

    openModal("deleteCommentModal");
  });
});

  document.querySelectorAll(".comment-edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const commentId = Number(button.dataset.commentId);
      const comment = comments.find((comment) => comment.id === commentId);

      if (!comment) return;

      const nextContent = prompt("댓글을 수정해주세요.", comment.content);

      if (nextContent === null) return;

      const content = nextContent.trim();

      if (!content) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }

      updateCommentRequest(boardId, commentId, { content })
        .then(async () => {
          const post = await getPostDetail(boardId);
          renderPostDetail(post);
        })
        .catch((error) => {
          console.error("댓글 수정 실패:", error);
          alert(error.message || "댓글 수정에 실패했습니다.");
        });
    });
  });
}

initDetailPage();
bindHeaderEvents();
