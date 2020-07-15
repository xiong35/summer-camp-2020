import _ from "lodash";
import "./style.css";
import cat from "./a.jpg";

console.log(cat);

function component() {
  var element = document.createElement("div");

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hell", "webpack"], " ");
  element.classList.add("hello");

  var myImg = new Image();
  myImg.src = cat;

  element.appendChild(myImg);

  return element;
}

document.body.appendChild(component());
