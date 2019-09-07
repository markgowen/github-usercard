/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const container = document.querySelector('.container');
let data = {};
let followersArray = [];

// const axios = require('axios');

function createGitHubCard(data) {
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const cardUser = document.createElement('p');
  const location = document.createElement('p');
  const profileLink = document.createElement('p');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const userBio = document.createElement('p');

  card.append(cardImg);
  card.append(cardInfo);
  cardInfo.append(cardName);
  cardInfo.append(cardUser);
  cardInfo.append(cardUser);
  cardInfo.append(location);
  cardInfo.append(profileLink);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(userBio);

  card.classList.add('card');
  card.classList.add('img');
  cardInfo.classList.add('card-info');
  cardInfo.classList.add('p');
  cardName.classList.add('name');
  cardUser.classList.add('username');

  cardImg.src = data.avatar_url;
  cardName.textContent = data.name;
  cardUser.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profileLink.textContent = `Profile: ${data.html_url}`;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  userBio.textContent = `Bio: ${data.bio}`;
  console.log(card);
  return card;
}

axios
  .get('https://api.github.com/users/markgowen')
  .then(function(response) {
    console.log(response);
    data = response.data;
    container.appendChild(createGitHubCard(data));
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {});

axios
  .get('https://api.github.com/users/markgowen/followers')
  .then(function(response) {
    console.log(response);
    followersArray = response.data;
    followersArray.forEach(data => {
      console.log('getting followers data');
      axios.get(data.url).then(function(response) {
        console.log(response);
        data = response.data;
        container.appendChild(createGitHubCard(data));
      });
    });
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {});
