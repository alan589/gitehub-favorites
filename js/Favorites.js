import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbody = this.root.querySelector("table tbody");
    this.load();
  }
  userAlreadyExists(username) {
    return this.users.some((user) => username === user.login);
  }

  load() {
    this.users = JSON.parse(localStorage.getItem("@github-users:")) || [];
  }

  delete(deletedUser) {
    const filteredUsers = this.users.filter(
      (user) => deletedUser.login !== user.login
    );
    this.users = filteredUsers;
    this.update();
    this.save();
  }

  save() {
    localStorage.setItem("@github-users:", JSON.stringify(this.users));
  }

  async add(username) {
    try {
      if (this.userAlreadyExists(username))
        throw new Error("User already exists");

      const user = await GithubUser.search(username);
      console.log(user);
      if (user.login === undefined) throw new Error("User not found");
      this.users = [...this.users, user];
      this.update();
      this.save();
      alert('User added!')
    } catch (error) {
      alert(error.message);
    }
  }
}


