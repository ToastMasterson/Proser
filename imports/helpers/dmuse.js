export const DMuse = async (payload, queryType) => {

    const wordsEndpoint = 'https://api.datamuse.com/words'

    const rhymeAPI = async () => {
        const queryString = payload.searchType === true 
            ? `?ml=${payload.relationWord}` + `&rel_rhy=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`
            : `?ml=${payload.relationWord}` +`?sl=${payload.wordToRhyme}` + `&max=${payload.numberOfResults}`

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

    const finderAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?ml=${payload.description}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_trg=${payload.description}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))

        return results
    }

    const synAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?rel_syn=${payload.searchWord}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_ant=${payload.searchWord}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
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
        case 'finder':
            return finderAPI()
        case 'syn':
            return synAPI()
        default:
            break;
    }

    
}