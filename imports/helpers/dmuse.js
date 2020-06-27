export const DMuse = async (payload, queryType) => {

    const wordsEndpoint = 'https://api.datamuse.com/words'

    const rhymeAPI = async () => {
        const queryString = payload.searchType === true 
            ? `?ml=${payload.relatedWord}` + `&rel_rhy=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`
            : `?sl=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`

        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))

        return results
    }

    const adjAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?rel_jjb=${payload.searchWord}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_jja=${payload.searchWord}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))

        return results
    }

    switch (queryType) {
        case 'rhyme':
            return rhymeAPI()
        case 'adj':
            return adjAPI()
        default:
            break;
    }

    
}