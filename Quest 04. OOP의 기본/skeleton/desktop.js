const isProgram = (target) =>
  target.classList.contains("folder") || target.classList.contains("icon");
const isFolder = (target) => target.classList.contains("folder");
const isCloseBtn = (target) => target.classList.contains("closeBtn");
const isOpendFolder = (target) => target.classList.contains("opened");

class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, newState };
    this.render();
  }
}

// folder = { type: 'folder', inner: [{}], title: string, id: number }
// icon = { type: 'icon', title: string, id: number }

class Desktop extends Component {
  $dragging;
  setup() {
    this.$state = {
      states: [
        { type: "folder", inner: [], title: "폴더1", id: 1 },
        { type: "folder", inner: [], title: "폴더2", id: 2 },
        { type: "folder", inner: [], title: "폴더3", id: 3 },
        { type: "icon", title: "아이콘1", id: 4 },
        { type: "icon", title: "아이콘2", id: 5 },
        { type: "icon", title: "아이콘3", id: 6 },
      ],
    };
  }

  template() {
    const { states } = this.$state;
    return `${states
      .map((state) => {
        const { type } = state;
        if (type === "folder") {
          return new Folder(this.$target, state).create();
        } else {
          return new Icon(this.$target, state).create();
        }
      })
      .join("")}`;
  }

  setEvent() {
    this.$target.addEventListener("dragstart", (e) => {
      if (isOpendFolder(e.target)) return;

      this.$target
        .querySelectorAll("div")
        .forEach((p) => p.classList.remove("clicked"));
      e.target.classList.add("clicked");
      this.$dragging = e.target;
      e.target.classList.add("dragging");
    });

    this.$target.addEventListener("dragend", (e) => {
      this.$dragging = null;
      e.target.classList.remove("dragging");
    });

    this.$target.addEventListener("dragover", (e) => {
      if (isOpendFolder(e.target)) return;

      e.preventDefault();
      if (isProgram(e.target)) {
        const afterElement = getDragAfterElement(this.$target, e.clientX);
        if (!afterElement) {
          this.$target.appendChild(this.$dragging);
        } else {
          this.$target.insertBefore(this.$dragging, afterElement);
        }
      }
    });

    function getDragAfterElement(target, x) {
      const draggableElements = [
        ...target.querySelectorAll("div:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = x - box.left - box.width / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
        }
      ).element;
    }
  }
}

class Icon {
  $target;
  $state;
  constructor($target, icon) {
    const { title, id } = icon;
    this.$target = $target;
    this.$state = {
      type: "icon",
      title,
      id,
    };
  }

  create() {
    return `
      <div class="icon" id="${this.$state.id}" draggable="true">${this.$state.title}</div>
    `;
  }
}

class Folder {
  $target;
  $state;
  constructor($target, icon) {
    const { inner, title, id } = icon;
    this.$target = $target;
    this.$state = {
      type: "folder",
      inner,
      title,
      id,
    };
  }

  create() {
    return `
      <div class="folder" id="${this.$state.id}" draggable="true">${this.$state.title}</div>
    `;
  }
}

class Window {
  $target;
  $node;
  $folder;
  constructor($target) {
    this.$target = $target;
    this.setEvent();
  }

  setEvent() {
    this.$target.addEventListener("click", (e) => {
      if (isProgram(e.target)) {
        this.$target
          .querySelectorAll("div:not(.opened)")
          .forEach((p) => p.classList.remove("clicked"));
        e.target.classList.add("clicked");
      }
    });

    this.$target.addEventListener("dblclick", (e) => {
      if (isFolder(e.target)) {
        this.$node = e.target;
        this.openFolder();
      }
    });
  }

  openFolder() {
    const $folder = document.createElement("div");
    $folder.setAttribute("class", "opened");
    $folder.setAttribute("draggable", "true");
    $folder.innerHTML = `
      <header>
        <h6>${this.$node.innerText}</h6>
        <button id="${this.$node.id}" class="closeBtn">X</button>
      </header>
    `;
    this.$folder = $folder;
    this.$target.appendChild($folder);

    $folder.addEventListener("click", (e) => {
      if (isCloseBtn(e.target)) {
        const folder = e.target.closest("div");
        this.$target.removeChild(folder);
      }
    });
  }
}
