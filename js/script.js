// GLOBAL VARIABLES
// selecting div class="overview" in intro section
const overview = document.querySelector(".overview");

// github username
const username = "emily-morin";

// list where repo name list items show up
const repoNames = document.querySelector(".repo-list");

// section for all repo info
const repos = document.querySelector(".repos");

// section displaying individual repo data
const repoData = document.querySelector(".repo-data");

// search box
const searchBox = document.querySelector(".filter-repos");

// button to go back to repo gallery
const backButton = document.querySelector(".view-repos");


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FUNCTIONS

// async function to fetch user data from Github profile and display it
const usernameFetch = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const cleanData = await data.json();
    // calling displayUserData with data from API request as an argument
    displayUserData(cleanData);
};
usernameFetch();

// function to display user data
const displayUserData = function (jsonData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
    <figure>
        <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${jsonData.name}</p>
        <p><strong>Bio:</strong> ${jsonData.bio}</p>
        <p><strong>Location:</strong> ${jsonData.location}</p>
        <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div>`
    overview.append(userInfo);
    getRepos();
};

// async function to fetch repos, with params to sort by most recently updated & up to 100 per page
const getRepos = async function () {
    const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const cleanData = await data.json();
    // console.log(cleanData);
    displayRepoName(cleanData);
};

// function to display each repo name in list item h3
const displayRepoName = function (repo) {
    for (const item of repo) {
        li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoNames.append(li);
    }
    searchBox.classList.remove("hide");
};

// click event listener for repo list ul 
const repoList = repoNames.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoDetails(repoName);
    }
});

// async function to GET specific repo information
const getRepoDetails = async function (repoName) {
    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo);

    // creating array of languages used in repo
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    
    // looping through languageData object to add languages to an array
    let languages = [];
    for (const item in languageData) {
        languages.push(item);
    }
    console.log(languages);

    // calling displayRepoInfo function (defined below)
    displayRepoInfo(repoInfo, languages);
};


// function to DISPLAY specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoInfoElement = document.createElement("div");
    repoInfoElement.innerHTML = `<div>
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    </div>`;
    repoData.append(repoInfoElement);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    backButton.classList.remove("hide");
};

// event listener for button to go back to repo gallery 
backButton.addEventListener("click", function (e) {
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

// event listener for search box
searchBox.addEventListener("input", function (e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();
    for (const repo of repos) {
        const lowerRepo = repo.innerText.toLowerCase();
        if (lowerRepo.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
