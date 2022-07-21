const itemsList = document.querySelector(".itemsList");
const form = document.querySelector("form");
const data = JSON.parse(localStorage.getItem("todoList")) || [];
// const deleted = JSON.parse(localStorage.getItem("deleted")) || [];

function addItem(e) {
    e.preventDefault();
    let inputText = this.querySelector("[name='item']").value;
    if (inputText == "" || inputText == null) return;
    let item = {
        id: randomInteger(10000,19000),
        text: inputText,
        done: false,
    };
    data.push(item);
    localStorage.setItem("todoList", JSON.stringify(data));
    createList(JSON.parse(localStorage.getItem("todoList")));
    form.reset();
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function toggleDone(e) {
    if (!e.target.matches("li")) return;
    const el = e.target;
    const current = data.find((i) => i.id == el.dataset.id);
    current.done = !current.done;
    localStorage.setItem("todoList", JSON.stringify(data));
    createList(data);
}

function removeItem(e) {
    const lis = document.querySelectorAll(".listItem");
    lis.forEach((i) => {
        const active = i.firstElementChild;
        if (active) {
            active.addEventListener("click", (e) => {
                data.splice(
                    data.indexOf(
                        data.find(
                            (i) => i.id == e.target.closest("li").dataset.id
                        )
                    ),
                    1
                );
                // localStorage.setItem("deleted", JSON.stringify(deleted))
                localStorage.setItem("todoList", JSON.stringify(data));
                createList(JSON.parse(localStorage.getItem("todoList")));
            });
        }
    });
}

function createList(_data) {
    let list = "";
    _data.forEach(
        (i) =>
            (list += `<li data-id="${i.id}" class="${
                i.done == true ? "done listItem" : "listItem"
            }">${i.text}<div class="${i.done ? "active" : ""}">X</div></li>`)
    );
    itemsList.innerHTML = list;
}

createList(data);

form.addEventListener("submit", addItem);

itemsList.addEventListener("click", toggleDone);

itemsList.addEventListener("click", removeItem);
