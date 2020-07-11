export const DMuse = async (payload, queryType) => {

    console.log(payload)

    const wordsEndpoint = 'https://api.datamuse.com/words'

    const rhymeAPI = async () => {
        const queryString = payload.searchType === true 
            ? `?ml=${payload.relationWord}` + `&rel_rhy=${payload.searchWordOrPhrase}` + `&max=${payload.numberOfResults}`
            : `?ml=${payload.relationWord}` +`&sl=${payload.searchWordOrPhrase}` + `&max=${payload.numberOfResults}`

        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))


        console.log(queryString, results)
        return results
    }

    const adjAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?rel_jjb=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_jja=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))

        return results
    }

    const finderAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?ml=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_trg=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
        const results = await fetch(wordsEndpoint + queryString)
            .then(res => res.json())
            .catch(error => console.log(error))

        return results
    }

    const synAPI = async () => {

        const queryString = payload.searchType === true 
            ? `?rel_syn=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
            : `?rel_ant=${payload.searchWordOrPhrase}` + `&topics=${payload.relationWord}` + `&max=${payload.numberOfResults}`
    
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
            break
    }

    
}