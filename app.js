const form = document.getElementById("formulario");
const input = document.getElementById("input");
const taskList = document.getElementById("lista-tareas");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let tasks = {
  //   19884987467: {
  //     id: 19884987467,
  //     text: "Tarea #1",
  //     state: false,
  //   },
  //   19884987468: {
  //     id: 19884987468,
  //     text: "Tarea #2",
  //     state: false,
  //   },
};

document.addEventListener("DOMContentLoaded", () => {
  printTasks();
});

taskList.addEventListener("click", (event) => {
  btnAction(event);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   console.log(event.target[0].value);
  //   console.log(event.target.querySelector("input").value);
  console.log(input?.value);

  setTasks(event);
});

const setTasks = (e) => {
  if (input.value.trim() === "") {
    console.log("Está vacío...");
    return;
  }

  const task = {
    id: Date.now(),
    text: input.value,
    state: false,
  };
  tasks[task.id] = task;
  //   console.log(tasks);
  formulario.reset();
  input.focus();

  printTasks();
};

const printTasks = () => {
  if (Object.values(tasks).length === 0) {
    taskList.innerHTML = `
        <div class="alert alert-dark text-center">
        No hay tareas pendientes 🤨
        </div>
    `;
    return;
  }

  taskList.innerHTML = "";
  Object.values(tasks).forEach((task) => {
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = task.text;

    if (task.state) {
      clone
        .querySelector(".alert")
        .classList.replace("alert-warning", "alert-primary");
      clone
        .querySelectorAll(".fas")[0]
        .classList.replace("fa-check-circle", "fa-undo-alt");
      clone.querySelector("p").style.textDecoration = "line-through";
    }

    clone.querySelectorAll(".fas")[0].dataset.id = task.id;
    clone.querySelectorAll(".fas")[1].dataset.id = task.id;
    fragment.appendChild(clone);
  });
  taskList.appendChild(fragment);
};

const btnAction = (e) => {
  if (e.target.classList.contains("fa-check-circle")) {
    // console.log(e.target.dataset.id);
    tasks[e.target.dataset.id].state = true;
    printTasks();
    console.log(tasks);
  }
  if (e.target.classList.contains("fa-minus-circle")) {
    delete tasks[e.target.dataset.id];
    printTasks();
    console.log(tasks);
  }
  if (e.target.classList.contains("fa-undo-alt")) {
    tasks[e.target.dataset.id].state = false;
    printTasks();
    console.log(tasks);
  }
  e.stopPropagation();
};
