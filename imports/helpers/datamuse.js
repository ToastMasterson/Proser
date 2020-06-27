export const Datamuse = async (payload) => {
    const wordsEndpoint = 'https://api.datamuse.com/words'

    const queryString = payload.searchType === true 
        ? `?ml=${payload.relatedWord}` + `&rel_rhy=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`
        : `?sl=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`

    const results = await fetch(wordsEndpoint + queryString)
        .then(res => res.json())
        .catch(error => console.log(error))

    return results
}