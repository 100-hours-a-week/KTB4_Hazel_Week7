import { header } from "../../components/header/header.js";

document.querySelector("#header").innerHTML = header({
  type: "withBackAndProfile",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
});

document.querySelector(".header__profile-button")?.addEventListener("click", () => {
  document.querySelector(".header__dropdown")?.classList.toggle("is-active");
});

document.querySelector(".header__menu-profile-edit")?.addEventListener("click", () => {
  location.href = "../userEditPage/userEdit.html";
});

const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

const posts = [
  {
    id: 1,
    title: "제목 1",
    likes: 0,
    comments: 0,
    views: 0,
    createdAt: "2026-6-26 00:00:00",
    author: "더미 작성자 1",
    content: "무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다. 또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래서 우리의 삶은 소중하고 의미가 있습니다. 자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습니다. 산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다. 마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. 우리는 끝없는 지식의 바다에서 배우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다. 그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.",
  },
];

const post = posts.find((post) => post.id === postId);

const postDetail = document.querySelector("#postDetail");

if (!post) {
  postDetail.innerHTML = `<p>게시글을 찾을 수 없습니다.</p>`;
} else {
  postDetail.innerHTML = `
    <h2 class="detail__title">${post.title}</h2>

    <div class="detail__meta">
      <div class="detail__mate-container">
        <div class="profile-container">
          <div class="profile__image"></div>
          <div class="profile__name">${post.author}</div>
        </div>

        <span class="detail__date">${post.createdAt}</span>
      </div>

      <div class="detail__button-container">
        <button id="editButton" class="detail__button" type="button">수정</button>
        <button class="detail__button" type="button">삭제</button>
      </div>
    </div>

    <div class="line"></div>

    <div class="detail__image"></div>

    <p class="detail__content">${post.content}</p>

    <div class="detail__count-container">
      <div class="detail__count-box">
        <strong>${post.likes}</strong>
        <span>좋아요수</span>
      </div>
      <div class="detail__count-box">
        <strong>${post.views}</strong>
        <span>조회수</span>
      </div>
      <div class="detail__count-box">
        <strong>${post.comments}</strong>
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

    <div class="comment-list">
      <div class="comment-item">
        <div class="profile__image"></div>

        <div class="comment-item__content">
          <div class="comment-item__meta">
            <span class="comment-item__author">더미 작성자 1</span>
            <span class="comment-item__date">2021-01-01 00:00:00</span>

            <div class="comment-item__button-container">
              <button class="detail__button" type="button">수정</button>
              <button class="detail__button" type="button">삭제</button>
            </div>
          </div>

          <p class="comment-item__text">댓글 내용</p>
        </div>
      </div>

      <div class="comment-item">
        <div class="profile__image"></div>

        <div class="comment-item__content">
          <div class="comment-item__meta">
            <span class="comment-item__author">더미 작성자 1</span>
            <span class="comment-item__date">2021-01-01 00:00:00</span>

            <div class="comment-item__button-container">
              <button class="detail__button" type="button">수정</button>
              <button class="detail__button" type="button">삭제</button>
            </div>
          </div>

          <p class="comment-item__text">댓글 내용</p>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#editButton")?.addEventListener("click", () => {
  location.href = `../boardEditPage/edit.html?id=${post.id}`;
  });
}