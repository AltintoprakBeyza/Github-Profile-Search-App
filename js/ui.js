class UI {
  constructor() {
    this.profileContentDiv = document.querySelector("#profileContentDiv");
    this.githubNameInput = document.querySelector("#githubname");
    this.tableContent = document.querySelector("#tableContent");
    this.table = document.querySelector("#table");
    this.searchedUserList = document.querySelector("#searchedUserList");
    this.isShowRepo = true;
  }

  formatDate(dateString) {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  }

  fillSearchedUserToUIFromStorage() {
    const users = Storagex.getSearchedUserFromStorage();
    if (users != null && users.length > 0) {
      users.forEach((user) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = user;
        this.searchedUserList.appendChild(li);
      });
    }
  }

  addSearchedUserToUI(username) {
    if (Storagex.checkUser(username)) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = username;
      this.searchedUserList.appendChild(li);
    }

    //<li class="list-group-item">n.a</li>
  }

  addUserProfileToUI(user) {
    this.profileContentDiv.innerHTML = `
      <div class="col-sm-12 col-md-4 col-lg-4">
          <div id="profileDiv">
            <img
              class="mb-3"
              id="profilImg"
              src="${user.avatar_url}"
              width="200px"
              height="200px"
              alt=""
            />
            <hr style="border: 1px solid lightgreen; width: 200px" />
            <span>${user.name}</span>
            <span>Yazılım Geliştirici</span>
          </div>
        </div>

        <div class="col-sm-12 col-md-8 col-lg-8">
          <div id="badgeDiv" class="mt-2">
            <button type="button" class="btn btn-primary btn-sm mr-2">
              Takipçi <span class="badge text-bg-secondary">${
                user.followers
              }</span>
            </button>
            <button type="button" class="btn btn-success btn-sm mr-2">
              Takip Edilen <span class="badge text-bg-secondary">${
                user.following
              }</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm">
              Repolar <span class="badge text-bg-secondary">${
                user.public_repos
              }</span>
            </button>
          <div id="infoDiv" class="mt-3">
            <div class="info mt-2">
              <img src="images/company.png" alt="" height="35px" width="35px" />
              <span>${user.company == null ? "" : user.company}</span>
            </div>
            <div class="info">
              <img
                src="images/location.png"
                height="33px"
                width="33px"
              />
              <span>${user.location == null ? "" : user.location}</span>
            </div>
            <div class="info">
              <img src="images/mail.png" alt="" height="35px" width="30px" />
              <span>${user.email == null ? "" : user.email}</span>
            </div>
            <div class="info">
              <a id="showRepo" href="#">Repoları Göster</a>
            </div>
            </div>
    `;
  }

  checkMessage() {
    const showRepoLink = document.querySelector("#showRepo");

    if (this.isShowRepo) {
      showRepoLink.textContent = "Repoları Göster";
    } else {
      showRepoLink.textContent = "Repoları Kapat";
    }
  }

  showRepos(repos) {
    if (this.isShowRepo) {
      if (repos != null && repos.length > 0) {
        let sayac = 1;
        repos.forEach((repo) => {
          this.tableContent.innerHTML += `
         <tr>
              <th scope="row">${sayac}</th>
              <td>${repo.name}</td>
              <td>${this.formatDate(repo.created_at)}</td>

            </tr>
        `;
          sayac++;
        });
      }
      this.isShowRepo = false;
      this.checkMessage();
    } else {
      this.isShowRepo = true;
      this.checkMessage();
      this.tableContent.innerHTML = "";
    }
  }

  clearSearchedUsers() {
    this.searchedUserList.innerHTML = "";
  }

  clearInput() {
    this.githubNameInput.value = "";
    this.profileContentDiv.innerHTML = "";
    this.tableContent.innerHTML = "";
  }
}
