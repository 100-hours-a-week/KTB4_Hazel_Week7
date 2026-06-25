import { header } from "../../components/header/header.js";
import { input } from "../../components/input/input.js";

document.querySelector("#header").innerHTML = header();

document.querySelector("#loginFields").innerHTML = `
  ${input({
    id: "email",
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력하세요",
    required: true,
    helperText: "",
    autocomplete: "email",
  })}

  ${input({
    id: "password",
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    required: true,
    helperText: "",
    autocomplete: "current-password",
  })}
`;