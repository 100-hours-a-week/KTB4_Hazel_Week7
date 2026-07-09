import { header, bindHeaderEvents } from "../../components/header/header.js";
import { getBoardsRequest } from "../../api/boardApi.js";
import { formatDate } from "../../utils/formatDate.js"

document.querySelector("#header").innerHTML = header({
  type: "withProfile",
});

const postList = document.querySelector("#postList");
const postWriteButton = document.querySelector("#postWriteButton");

postWriteButton.addEventListener("click", () => {
  location.href = "../postWritePage/write.html";
});

async function getPosts() {
  const response = await getBoardsRequest();

  console.log("게시글 목록 API 응답:", response);

  return response.data;
}

// 백엔드 값으로  현재 시간만.
function getMockDeadline(id) {
  const hoursLeft = ((id * 13) % 60) - 12;

  return Date.now() + hoursLeft * 60 * 60 * 1000;
}

function getDeadlineState(diffMs) {
  if (diffMs <= 0) return "over";

  const hours = diffMs / (1000 * 60 * 60);

  if (hours < 3) return "urgent";
  if (hours < 24) return "soon";

  return "normal";
}

function formatCountdown(diffMs) {
  if (diffMs <= 0) return "마감";

  const pad = (n) => String(n).padStart(2, "0");
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return days > 0 ? `${days}일 ${clock}` : `${clock}`;
}

function tickDeadlines() {
  document.querySelectorAll(".item__deadline[data-deadline]").forEach((badge) => {
    const deadline = Number(badge.dataset.deadline);
    const diffMs = deadline - Date.now();

    badge.textContent = formatCountdown(diffMs);
    badge.className = `item__deadline item__deadline--${getDeadlineState(diffMs)}`;
  });
}

function createPostItem({
  id,
  title,
  likeCount,
  commentCount,
  viewCount,
  createdAt,
  writer,
}) {
  const changeFormatDate = formatDate(createdAt);
  const deadline = getMockDeadline(id);

  return `
    <article class="item" data-post-id="${id}">
      <div class="item__top">
        <span class="item__title">${title}</span>
        <span class="item__deadline" data-deadline="${deadline}"></span>
      </div>

      <div class="count-container">
        <div class="count-container__list">
          <div class="count__item">
            <span class="count__text">좋아요</span>
            <span class="count__text">${likeCount}</span>
          </div>

          <div class="count__item">
            <span class="count__text">댓글</span>
            <span class="count__text">${commentCount}</span>
          </div>

          <div class="count__item">
            <span class="count__text">조회수</span>
            <span class="count__text">${viewCount}</span>
          </div>
        </div>

        <div class="count__text">${changeFormatDate}</div>
      </div>

      <div class="line"></div>

      <div class="profile-container">
        <div class="profile__image"></div>
        <div class="profile__name">${writer}</div>
      </div>
    </article>
  `;
}

let deadlineTickInterval = null;

function renderPosts(posts) {
  postList.innerHTML = posts.map((post) => createPostItem(post)).join("");

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      const postId = item.dataset.postId;
      location.href = `../boardDetailPage/detail.html?id=${postId}`;
    });
  });

  tickDeadlines();

  if (!deadlineTickInterval) {
    deadlineTickInterval = setInterval(tickDeadlines, 1000);
  }
}

async function initBoardPage() {
  try {
    const posts = await getPosts();
    renderPosts(posts);
  } catch (error) {
    console.error(error);
    postList.innerHTML = `<p class="board__error">게시글을 불러오지 못했습니다.</p>`;
  }
}

initBoardPage();
bindHeaderEvents();
