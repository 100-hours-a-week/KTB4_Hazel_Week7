import { header } from "../../components/header/header.js";

document.querySelector("#header").innerHTML = header({
  type: "isBeforeButton",
});

document.querySelector(".header__back-button")?.addEventListener("click", () => {
  history.back();
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
    content: "무엇을 얘기할까요? 아무말이나 적어봅니다.",
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
      <div class="profile-container">
        <div class="profile__image"></div>
        <div class="profile__name">${post.author}</div>
      </div>

      <span class="detail__date">${post.createdAt}</span>

      <div class="detail__button-container">
        <button class="detail__button" type="button">수정</button>
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

        <div class="comment-form">
      <textarea class="comment-form__textarea" placeholder="댓글을 남겨주세요!"></textarea>
      <button class="comment-form__button" type="button">댓글 등록</button>
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
}