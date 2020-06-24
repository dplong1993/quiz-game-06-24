export async function getClue(id = undefined){
    let response;
    if(id === undefined) response = await fetch("https://jservice.xyz/api/random-clue");
    else response = await fetch(`https://jservice.xyz/api/clues/${id}`);
    if (!response.ok){
        throw new Error(response.status);
    } else {
        return await response.json()
    }
}
