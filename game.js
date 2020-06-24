import { getClue as getClueFromCallback } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'
window.addEventListener('DOMContentLoaded', () => {

  if(localStorage.getItem("game-score")){
    const playerScore = document.getElementById('score');
    //console.log(localStorage.getItem('game-score'));
    playerScore.innerHTML = localStorage.getItem("game-score");
  } else document.getElementById('score').innerHTML = 0;
  //if(localStorage.getItem("game-id")){
  if(localStorage.getItem("clue")){
    asyncClickEventCallback(JSON.parse(localStorage.getItem("clue")));
  }
  const useCbButton = document.getElementById('use-callback');
  useCbButton.addEventListener('click', (event) => {
    getClueFromCallback((error, clue) => {
      if(error !== null) console.error(error);
      else {
        applyClues(clue);
      }
    });
  });

  const usePromiseButton = document.getElementById("use-promise");
  usePromiseButton.addEventListener('click', (event)=>{
      getClueFromPromise()
      .then(clue =>{
        applyClues(clue);
      })
      .catch(error =>{
        console.log("Error", error.message);
      })
  });

  const useAsyncButton = document.getElementById("use-async-await");
  useAsyncButton.addEventListener('click', async (event)=>{
    try{
      const clue = await getClueFromAsyncFunction()
      applyClues(clue);
    } catch (error){
        console.log("Error", error.message);
    }
  });

  document
    .getElementById('check-response')
    .addEventListener('click', event => {
      const playerRes = document.getElementById('player-response');
      const answer = document.getElementById('answer');
      const pointValue = document.getElementById('value');
      const playerScore = document.getElementById('score');

      if(playerRes.value.toLowerCase().trim() === answer.innerHTML.toLowerCase().trim()) {
        playerScore.innerHTML = Number(playerScore.innerHTML) + Number(pointValue.innerHTML);
      } else {
        playerScore.innerHTML = Number(playerScore.innerHTML) - Number(pointValue.innerHTML);
      }
      localStorage.setItem("game-score", playerScore.innerHTML);
      answer.classList.remove('is-hidden');
      document.getElementById('check-response').classList.add('is-hidden');
  });
});

function applyClues(clue){
  document.getElementById('check-response').classList.remove('is-hidden');
  document.getElementById('player-response').value = '';
  console.log("Should be setting player-resp to ''");
  document.getElementById('answer').classList.add('is-hidden')

  const {question, answer, value, category, invalidCount, id} = clue;
  // localStorage.setItem("game-id", id);
  localStorage.setItem('clue', JSON.stringify(clue));
  console.log(clue);
  document.getElementById('question').innerHTML = question;
  document.getElementById('answer').innerHTML = answer;
  document.getElementById('value').innerHTML = value;
  document.getElementById('category-title').innerHTML = category.title;
  document.getElementById('invalid-count').innerHTML = invalidCount;

}


async function asyncClickEventCallback(clue = undefined){
  try{
    //console.log(localStorage.getItem('game-id'));
    if(clue === undefined){
      // clue = await getClueFromAsyncFunction(localStorage.getItem("game-id"));
      clue = await getClueFromAsyncFunction(localStorage.getItem(""));
      localStorage.setItem('clue', JSON.stringify(clue));
    }
    applyClues(clue);
  } catch (error){
      console.log("Error", error.message);
  }
}
