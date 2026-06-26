import { header } from "../../components/header/header.js";

document.querySelector("#header").innerHTML = header({
  type: "withProfile",
});

const postList = document.querySelector("#postList");

const postWriteButton = document.querySelector("#postWriteButton");

postWriteButton.addEventListener("click", () => {
  location.href = "../postWritePage/write.html";
});

async function getPosts() {
  // 나중에 API 붙이면 이 함수 안만 바꾸면 됨
  // const response = await fetch("https://api.example.com/posts");
  // const data = await response.json();
  // return data;

  return [
  {
    id: 1,
    title: "제목 1",
    likes: 0,
    comments: 0,
    views: 0,
    createdAt: "2026-6-26 00:00:00",
    author: "더미 작성자 1",
  },
  {
    id: 2,
    title: "제목 2",
    likes: 10,
    comments: 3,
    views: 25,
    createdAt: "2026-6-26 01:00:00",
    author: "더미 작성자 2",
  },
  {
    id: 3,
    title: "제목 3",
    likes: 4,
    comments: 1,
    views: 12,
    createdAt: "2026-6-26 02:00:00",
    author: "더미 작성자 3",
  },
  {
    id: 4,
    title: "제목 4",
    likes: 22,
    comments: 8,
    views: 103,
    createdAt: "2026-6-26 03:00:00",
    author: "더미 작성자 4",
  },
  {
    id: 5,
    title: "제목 5",
    likes: 7,
    comments: 2,
    views: 41,
    createdAt: "2026-6-26 04:00:00",
    author: "더미 작성자 5",
  },
  {
    id: 6,
    title: "제목 6",
    likes: 15,
    comments: 6,
    views: 88,
    createdAt: "2026-6-26 05:00:00",
    author: "더미 작성자 6",
  },
  {
    id: 7,
    title: "제목 7",
    likes: 3,
    comments: 0,
    views: 19,
    createdAt: "2026-6-26 06:00:00",
    author: "더미 작성자 7",
  },
  {
    id: 8,
    title: "제목 8",
    likes: 31,
    comments: 12,
    views: 205,
    createdAt: "2026-6-26 07:00:00",
    author: "더미 작성자 8",
  },
  {
    id: 9,
    title: "제목 9",
    likes: 1,
    comments: 4,
    views: 32,
    createdAt: "2026-6-26 08:00:00",
    author: "더미 작성자 9",
  },
  {
    id: 10,
    title: "제목 10",
    likes: 18,
    comments: 9,
    views: 144,
    createdAt: "2026-6-26 09:00:00",
    author: "더미 작성자 10",
  },
  ];
}

function createPostItem(post) {
  return `
    <article class="item" data-post-id="${post.id}">
      <span class="item__title">${post.title}</span>

      <div class="count-container">
        <div class="count-container__list">
          <div class="count__item">
            <span class="count__text">좋아요</span>
            <span class="count__text">${post.likes}</span>
          </div>

          <div class="count__item">
            <span class="count__text">댓글</span>
            <span class="count__text">${post.comments}</span>
          </div>

          <div class="count__item">
            <span class="count__text">조회수</span>
            <span class="count__text">${post.views}</span>
          </div>
        </div>

        <div class="count__text">${post.createdAt}</div>
      </div>

      <div class="line"></div>

      <div class="profile-container">
        <div class="profile__image"></div>
        <div class="profile__name">${post.author}</div>
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