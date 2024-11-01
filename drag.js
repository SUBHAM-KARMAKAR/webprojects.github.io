document.addEventListener("DOMContentLoaded", function () {
    const lists = document.querySelectorAll(".list");
    const rightBox = document.getElementById("right");
    const leftBox = document.getElementById("left");

    lists.forEach(list => {
        list.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text", e.target.id);
            e.target.classList.add("dragging");
        });

        list.addEventListener("dragend", function (e) {
            e.target.classList.remove("dragging");
        });
    });

    [leftBox, rightBox].forEach(box => {
        box.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        box.addEventListener("drop", function (e) {
            e.preventDefault();
            const draggedItem = document.querySelector(".dragging");
            box.appendChild(draggedItem);
        });
    });
});
