import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
    itemsPerPage = 5;
    currentPage = 1;
  
    constructor(root) {
      super(root);
      this.update();
      this.onAdd();
    }
  
    displayUsers() {
      let startIndex = (this.currentPage - 1) * this.itemsPerPage;
      let endIndex = startIndex + this.itemsPerPage;
      let paginatedItems = this.users.slice(startIndex, endIndex);
  
      paginatedItems.forEach((user) => {
        const tr = this.tbody.appendChild(this.createTableRow(user));
        tr.querySelector(".remove").onclick = () => {
          const isOk = confirm("Deletar?");
          if (isOk) {
            this.delete(user);
          }
        };
      });
  
      this.displayPagination();
    }
  
    displayPagination() {
      let totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  
      let tr = document.createElement("tr");
      let td = document.createElement("td");
  
      td.innerHTML = "";
  
      let previousPage = document.createElement("button");
      let nextPage = document.createElement("button");
      let currentPage = document.createElement("button");
  
      previousPage.textContent = "Prev";
      nextPage.textContent = "Next";
      currentPage.textContent = this.currentPage;
  
      nextPage.classList.add("page-link");
      previousPage.classList.add("page-link");
      currentPage.classList.add("page-link");
  
      nextPage.addEventListener("click", () => {
        this.currentPage += 1;
        if (this.currentPage <= totalPages) {
          this.update();
        } else {
          this.currentPage = totalPages;
        }
      });
  
      previousPage.addEventListener("click", () => {
        this.currentPage -= 1;
        if (this.currentPage >= 1) {
          this.update();
        } else {
          this.currentPage = 1;
        }
      });
  
      td.appendChild(previousPage);
      td.appendChild(currentPage);
      td.appendChild(nextPage);
      tr.appendChild(td);
      td.setAttribute("colspan", "4");
      td.style.textAlign = "center";
      this.tbody.appendChild(tr);
    }
  
    onAdd() {
      const addButton = this.root.querySelector(".search button");
      addButton.onclick = (e) => {
        e.preventDefault();
        const { value } = this.root.querySelector(".search input");
        this.add(value);
      };
    }
  
    update() {
      this.removeAllTableRow();
      if (this.users.length !== 0) {
        this.displayUsers();
      } else {
        const tr = document.createElement("tr");
        tr.innerHTML = '<td colspan="4" style="text-align:center;">No user</td>';
        this.tbody.appendChild(tr);
      }
    }
  
    createTableRow(user) {
      const tr = document.createElement("tr");
  
      const formatName = (name) => {
        return name ? name.split(" ").slice(0, 2).join(" ") : user.login;
      };
  
      tr.innerHTML = `
              <td class="user">
                  
                  <a href="https://www.github.com/${user.login}" target=_blank>
                    <img src="https://www.github.com/${user.login}.png" alt="${
        user.login
      }'s photo">
                  </a>
                  <a href="https://www.github.com/${user.login}" target=_blank>
                      <p>${formatName(user.name)}</p>
                      <span>${user.login}</span>
                  </a>
              </td>
              <td>${user.public_repos}</td>
              <td>${user.followers}</td>
              <td>
                  <button class="remove">&times;</button>
              </td>
          `;
      return tr;
    }
  
    removeAllTableRow() {
      const tbody = this.root.querySelector("table tbody");
  
      tbody.querySelectorAll("tr").forEach((tr) => {
        tr.remove();
      });
    }
  }