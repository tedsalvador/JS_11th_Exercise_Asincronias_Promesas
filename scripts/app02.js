// const path = "/src/data.json";

// async function app() {
//   render(await getData());
// }

// async function getData() {
//   const response = await fetch(path);
//   const data = await response.json();
//   return data;
// }

// function render(data) {
//   console.log(data.results);
//   for (let index = 0; index < data.results.length; index++) {
//     console.log(data.results[index]);
//   }
// }

fetch("./data/data.json")
  .then((response) => response.json())

  .then((data) => {
    const tableBody = document.querySelector("#todo-table tbody");
    data.results.forEach((todo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.priority}</td>
            <td>${todo.isDone}</td>
        `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));