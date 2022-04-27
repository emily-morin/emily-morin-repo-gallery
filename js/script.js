// selecting div class="overview" in intro section
const overview = document.querySelector(".overview");

// github username
const username = "emily-morin";

// async function to fetch username from Github profile
const usernameFetch = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const cleanData = await data.json();
    console.log(cleanData);
    // calling displayUserData with data from API request as an argument
    displayUserData(cleanData);
}
usernameFetch();

// function to display user data from usernameFetch
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
};


