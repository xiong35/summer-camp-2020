const Page1 = document.createElement("div");
Page1.innerHTML = "<h1>Page1</h1>";
const Home = document.createElement("div");
Home.innerHTML = "<h1>Home</h1>";

class Router {
  mode = "hash";

  constructor(options, baseDiv) {
    if (options && options.mode) {
      this.mode = options.mode;
    }
    this.baseDiv = baseDiv;

    if (this.mode === "hash") {
      window.addEventListener(
        "hashchange",
        this.onHashChange,
        false
      );
    }

    this.replace("/");
  }

  onHashChange = () => {
    let path = window.location.hash.slice(1);
    this.render(path);
  };

  render = (path) => {
    if (path === "/") {
      for (let c of this.baseDiv.children) {
        c.parentNode.removeChild(c);
      }
      this.baseDiv.appendChild(Home);
    } else if (path === "/page1") {
      for (let c of this.baseDiv.children) {
        c.parentNode.removeChild(c);
      }
      this.baseDiv.appendChild(Page1);
    }
  };

  handleChange = (path, method) => {
    this.render(path);

    if (this.mode === "hash") {
      path = "#" + path;
    }
    method.call(history, {}, "", path);
  };

  push = (path) => {
    const method = history.pushState;
    this.handleChange(path, method);
  };
  replace = (path) => {
    const method = history.replaceState;
    this.handleChange(path, method);
  };
}

const config = {
  mode: "hash",
};

const $router = new Router(config, document.getElementById("app"));

const Page1_btn = document.createElement("button");
Page1_btn.innerText = "to home";
Page1_btn.onclick = () => {
  $router.push("/");
};
Page1.appendChild(Page1_btn);

const Home_btn = document.createElement("button");
Home_btn.innerText = "to page1";
Home_btn.onclick = () => {
  $router.push("/page1");
};
Home.appendChild(Home_btn);
