import { getClue as getClueFromCallback } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('score').innerHTML = 0;
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
      answer.classList.remove('is-hidden');
      document.getElementById('check-response').classList.add('is-hidden');
  });
});

function applyClues(clue){
  document.getElementById('check-response').classList.remove('is-hidden');
  document.getElementById('player-response').innerHTML = '';
  document.getElementById('answer').classList.add('is-hidden')

  const {question, answer, value, category, invalidCount} = clue;

  console.log(clue);
  document.getElementById('question').innerHTML = question;
  document.getElementById('answer').innerHTML = answer;
  document.getElementById('value').innerHTML = value;
  document.getElementById('category-title').innerHTML = category.title;
  document.getElementById('invalid-count').innerHTML = invalidCount;

}
