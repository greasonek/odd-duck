'use strict';

let voteCount = 25;
const state = {
  allProductsArray: [],
};

//>>> DOM references
let imgContainer = document.getElementById('products');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('results-button');
let resultsList = document.getElementById('results-list');

//>>> constructors

// utilizing default value for file extensions
// if nothing is passed in it will default to this value
// if a value is passed in it will utilize that
function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  state.allProductsArray.push(this);
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petsweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
// let sweep = new Product('sweep');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let watercan = new Product('water-can');
let wineglass = new Product('wine-glass');

console.log(state.allProductsArray);

// >>> helper functions - randomly generate and index and render function - target the attribute of that img element to add path


function getRandomIndex(){
  return Math.floor(Math.random()* state.allProductsArray.length);
}
console.log(getRandomIndex());

function renderImgs(){
  let indexOne = getRandomIndex();
  let indexTwo = getRandomIndex();
  let indexThree = getRandomIndex();
  while(indexOne === indexTwo){
    indexTwo = getRandomIndex();
  }
  imgOne.src = state.allProductsArray[indexOne].photo;
  imgOne.alt = state.allProductsArray[indexOne].name;
  state.allProductsArray[indexOne].views++;
  console.log(state.allProductsArray[indexOne].views++);

  imgTwo.src = state.allProductsArray[indexTwo].photo;
  imgTwo.alt = state.allProductsArray[indexTwo].name;
  state.allProductsArray[indexTwo].views++;
  console.log(state.allProductsArray[indexTwo].views++);

  imgThree.src = state.allProductsArray[indexThree].photo;
  imgThree.alt = state.allProductsArray[indexThree].name;
  state.allProductsArray[indexThree].views++;
  console.log(state.allProductsArray[indexThree].views++);
}
//>>> event handlers
function handleClick(event){
  voteCount--;
  // pulling info from alt attribute on our target allows us to compare duck names
  let imgClicked = event.target.alt;
  for(let i  = 0; i < state.allProductsArray.length; i++){
    if(imgClicked === state.allProductsArray[i].name){
      state.allProductsArray[i].votes++;
      console.log(imgClicked, state.allProductsArray[i].votes++);
    }
  }
  // ensures images will regenerate on click
  renderImgs();
  // stop votes
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
  console.log(voteCount);
}
function handleShowResults(){
  //display results in a list; only work if vote count is 0
  if(voteCount === 0){
    for(let i = 0; i < state.allProductsArray.length; i++){
      let liElement = document.createElement('li');
      liElem.textContent = `${state.allProductsArray[i].name} was shown ${state.allProductsArray[i].views} and had ${state.allProductsArray[i].votes} votes`;
      resultsList.append(liElem);
    }
  }
}
//>>>listeners

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);
//>>> function invocations

renderImgs();
