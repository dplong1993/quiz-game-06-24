export function getClue(cb){

    const xmlRequest = new XMLHttpRequest();

    xmlRequest.addEventListener("readystatechange", ()=>{
        if(xmlRequest.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if(xmlRequest.status !== 200){
            cb(xmlRequest.status);
        } else {
            const data = JSON.parse(xmlRequest.responseText);
            cb(null, data);
        }
    });
    xmlRequest.open("GET", 'https://jservice.xyz/api/random-clue')

    xmlRequest.send();



}

//// callback-version.js
// export function getClue(callback) {
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('readystatechange', () => {
//     if (xhr.readyState !== XMLHttpRequest.DONE) return;

//     if (xhr.status !== 200) {
//       callback(xhr.status);
//     } else {
//       const clue = JSON.parse(xhr.responseText);
//       callback(null, clue);
//     }
//   });

//   xhr.open('GET', 'https://jservice.xyz/api/random-clue');
//   xhr.send();
// }
