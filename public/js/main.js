(function () {
  const inputSearch = document.querySelector('#inputSearch');
  const buttonSearch = document.querySelector('#buttonSearch');
  const panelUsers = document.querySelector('.userItem');
  const url = 'https://api.github.com/users';

  async function getUser(user) {
    const profileResponse = await fetch(`${url}/${user}`);
    const reposResponse = await fetch(`${url}/${user}/repos`);
    const starredResponse = await fetch(`${url}/${user}/starred`);
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    const starred = await starredResponse.json();

    return { profile, repos, starred };
  }

  function showProfile(user) {
    panelUsers.innerHTML = `
    <header>
      <img src="${user.avatar_url}"/>
      <div>
        <strong>${user.name}</strong>
        <span>${user.login}</span>
      </div>
    </header>
        <p> ${user.bio} </p>
    <footer>
        <div id="repos"></div>
    </footer>
        <div id="starred"></div>`;
  }

  function showRepos(repos) {
    let output = '';

    repos.forEach((repo) => {
      output += `
      <div class="repoItem">
        <span class="repoItemUrl" ><a href="${repo.html_url}" target="_black">${repo.name}</a></span>
        <span class="repoItemStarts">Starts: ${repo.stargazers_count}</span>
        <span class="repoItemWatch">Watch: ${repo.watchers_count}</span>
        <span class="repoItemForks">Forks: ${repo.forks_count}</span>
      </div>`;
    });
    document.querySelector('#repos').innerHTML = output;
  }
  //configuration starred
  function showStarred(starred) {
    let output = '';

    starred.forEach((starred) => {
      output += `
      <div class="starredItem">
      <span class="starredItemUrl" >Name: ${starred.name}</span>
        <span class="starredItemStarts">Starts: ${starred.stargazers_count}</span>
        <span class="starredItemWatch">Watch: ${starred.watchers_count}</span>
      </div>
       `;
    });
    document.querySelector('#starred').innerHTML = output;
  }

  buttonSearch.addEventListener('click', (e) => {
    e.preventDefault();
    const user = inputSearch.value;
    if (user.length > 0) {
      getUser(user).then(({ profile, repos, starred }) => {
        showProfile(profile);
        showRepos(repos);

        const buttonRepos = document.querySelector('#inputRepos');
        buttonRepos.addEventListener('click', buttonRepositorios);
        function buttonRepositorios(e) {
          e.preventDefault();
          document.querySelector('#starred').innerHTML = '';
          showRepos(repos);
        }

        const buttonFavo = document.querySelector('#inputFavorte');
        buttonFavo.addEventListener('click', buttonFavorite);
        function buttonFavorite(e) {
          e.preventDefault();
          document.querySelector('#repos').innerHTML = '';
          showStarred(starred);
        }
      });
    } else {
      document.querySelector('.userItem').innerHTML = `
      <p class="noResults">Nenhum usuário encontrado com sua pesquisa.</p>
      `;
    }
  });
})();
