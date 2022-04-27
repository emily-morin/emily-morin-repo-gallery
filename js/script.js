// GLOBAL VARIABLES
// selecting div class="overview" in intro section
const overview = document.querySelector(".overview");

// github username
const username = "emily-morin";

// list where repo info shows up
const repoList = document.querySelector(".repo-list");


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FUNCTIONS

// async function to fetch user data from Github profile and display it
const usernameFetch = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const cleanData = await data.json();
    // console.log(cleanData);
    // calling displayUserData with data from API request as an argument
    displayUserData(cleanData);
};
usernameFetch();

// function to display user data
const displayUserData = function (jsonData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<div>
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
    displayRepoInfo(cleanData);
};

// function to display repo info
const displayRepoInfo = function (repo) {
    for (const item of repo) {
        li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(li);
    }
};