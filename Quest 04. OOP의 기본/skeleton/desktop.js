class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(icon, folder) {
    this.icon = icon;
    this.folder = folder;

    const $desktop = document.querySelector(".desktop");

    for (let i = 0; i < folder; i++) {
      const folder = document.createElement("div");
      folder.className = "folder";
      folder.setAttribute("data-id", i);
      folder.innerText = `폴더 ${i}`;
      $desktop.appendChild(folder);
    }

    for (let i = 0; i < icon; i++) {
      const icon = document.createElement("div");
      icon.className = "icon";
      icon.setAttribute("data-id", +i + +folder);
      icon.innerText = `아이콘 ${+i + +folder}`;
      $desktop.appendChild(icon);
    }

    $desktop.addEventListener("click", (e) => {
      if (e.target.className === "folder" || e.target.className === "icon") {
        new Window(e.target);
      }
    });
  }
}

class Icon {
  /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
}

class Folder {
  /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(node) {
    this.node = node;

    node.onmousedown = function (event) {
      node.classList.add("drag");
      // node.style.position = "absolute";
      // node.style.zIndex = 1000;

      function moveAt(pageX, pageY) {
        node.style.left = pageX - node.offsetWidth / 2 + "px";
        node.style.top = pageY - node.offsetHeight / 2 + "px";
      }

      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      node.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        node.onmouseup = null;
      };

      node.ondragstart = function () {
        return false;
      };
    };
  }
}
