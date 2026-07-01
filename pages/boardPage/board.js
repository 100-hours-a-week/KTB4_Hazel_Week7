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

  return `
    <article class="item" data-post-id="${id}">
      <span class="item__title">${title}</span>

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

function renderPosts(posts) {
  postList.innerHTML = posts.map((post) => createPostItem(post)).join("");

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      const postId = item.dataset.postId;
      location.href = `../boardDetailPage/detail.html?id=${postId}`;
    });
  });
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
