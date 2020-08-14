import React from 'react'
import ToolForm from '../modals/ToolForm'

const tools = [
    {
        header: 'Rhyme',
        options: ['Rhymes With', 'Sounds Like'],
        searchPhrases: ['Word to Rhyme', 'Word that Sounds Like'],
        placeholder: ['orange', 'jirraf'],
        searchType: 'rhyme'
    }, {
        header: 'Adjective or Noun',
        options: ['Find Adjectives', 'Find Nouns from Adjective'],
        searchPhrases: ['Word to Describe', 'Adjective to Find Noun From'],
        placeholder: ['ocean', 'sticky'],
        searchType: 'adj'
    }, {
        header: 'Word',
        options: ['Use Description', 'Use Association Word'],
        searchPhrases: ['Description or Phrase', 'Association Word'],
        placeholder: ['ringing in the ears', 'cover'],
        searchType: 'finder'
    }, {
        header: 'Synonym or Antonym',
        options: ['Synonyms', 'Antonyms'],
        searchPhrases: ['Search Word', 'Search Word'],
        placeholder: ['happy', 'sad'],
        searchType: 'syn'
    }
]

export const checkTool = (toolType, closeTool) => {
    switch (toolType) {
        case 'rhyme':
            return <ToolForm closeTool={closeTool} tool={tools[0]} />
        case 'adj':
            return <ToolForm closeTool={closeTool} tool={tools[1]} />
        case 'finder':
            return <ToolForm closeTool={closeTool} tool={tools[2]} />
        case 'syn':
            return <ToolForm closeTool={closeTool} tool={tools[3]} />
        default:
            break
    }
}