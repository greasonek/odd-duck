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

const ctx = document.getElementById('results-chart');

//>>> constructors

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  state.allProductsArray.push(this);
}

let retrievedProducts = localStorage.getItem('products');
let parsedProducts = JSON.parse(retrievedProducts);

if(retrievedProducts){
  state.allProductsArray = parsedProducts;
} else {

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
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let watercan = new Product('water-can');
  let wineglass = new Product('wine-glass');
}


console.log(state.allProductsArray);

// >>> helper functions


function getRandomIndex(){
  return Math.floor(Math.random()* state.allProductsArray.length);
}
console.log(getRandomIndex());

let allIndex = [];
function renderImgs(){
  // let indexOne = getRandomIndex();
  // let indexTwo = getRandomIndex();
  // let indexThree = getRandomIndex();
  // while(indexOne === indexTwo || indexOne === indexThree || indexTwo === indexThree){
  //   indexTwo = getRandomIndex();
  //   indexThree = getRandomIndex();
  // }

  while(allIndex.length < 6){
    let newIndex = getRandomIndex();
    if(!allIndex.includes(newIndex)){
      allIndex.unshift(newIndex);
    }
    console.log(allIndex);
  }
  let indexOne = allIndex.pop();
  let indexTwo = allIndex.pop();
  let indexThree = allIndex.pop();


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

function renderChart() {

  ctx.style.display = 'block';
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < state.allProductsArray.length; i++){
    productNames.push(state.allProductsArray[i].name);
    productVotes.push(state.allProductsArray[i].votes);
    productViews.push(state.allProductsArray[i].views);

  }

  let resultsChart = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, resultsChart);
}

function handleClick(event){
  voteCount--;
  let imgClicked = event.target.alt;
  for(let i  = 0; i < state.allProductsArray.length; i++){
    if(imgClicked === state.allProductsArray[i].name){
      state.allProductsArray[i].votes++;
      console.log(imgClicked, state.allProductsArray[i].votes);
    }
  }
  renderImgs();
  if(voteCount === 0){
    // imgContainer.removeEventListener('click', handleClick);
    imgOne.removeEventListener('click', handleClick);
    imgTwo.removeEventListener('click', handleClick);
    imgThree.removeEventListener('click', handleClick);

    let stringifiedProducts = JSON.stringify(state.allProductsArray);
    console.log(stringifiedProducts);

    localStorage.setItem('products', stringifiedProducts);

  }
  console.log(voteCount);

}

function handleShowResults(){
  if(voteCount === 0){
    for(let i = 0; i < state.allProductsArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${state.allProductsArray[i].name} was shown ${state.allProductsArray[i].views} and had ${state.allProductsArray[i].votes} votes`;
      resultsList.append(liElem);
    }
    resultsButton.style.display = 'none';
    renderChart();
  }
}
//>>>listeners

document.getElementById('img-one').addEventListener('click', handleClick);
document.getElementById('img-two').addEventListener('click', handleClick);
document.getElementById('img-three').addEventListener('click', handleClick);

// imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);
//>>> function invocations

renderImgs();
