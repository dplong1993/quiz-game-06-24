import { getClue as getClueFromCallback } from './callback-version.js'

window.addEventListener('DOMContentLoaded', () => {
  const useCbButton = document.getElementById('use-callback');
  useCbButton.addEventListener('click', (event) => {
    getClueFromCallback((error, clue) => {
      if(error !== null) console.error(error);
      else {
        const {question, answer, value, categoryTitle, invalidCount} = clue;
        document.getElementById('question').innerHTML = question;
        document.getElementById('answer').innerHTML = answer;
        document.getElementById('value').innerHTML = value;
        document.getElementById('category-title').innerHTML = categoryTitle;
        document.getElementById('invalid-count').innerHTML = invalidCount;


      }
    });
  });
});

// import { getClue as getClueFromCallback } from './callback-version.js'

// document
//   .getElementById('use-callback')
//   .addEventListener('click', () => {
//     getClueFromCallback((err, clue) => {
//       if (err !== null) return console.error(err);

//       document.getElementById('answer').innerHTML = clue.answer;
//       document.getElementById('value').innerHTML = clue.value;
//       document.getElementById('category-title').innerHTML = clue.category.title;
//       document.getElementById('invalid-count').innerHTML = clue.invalid_count;
//       document.getElementById('question').innerHTML = clue.question;
//     });
//   });
