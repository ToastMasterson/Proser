import { Notebooks } from './notebookPublications'
import { Notes } from '../notes/notePublications'

Notebooks.addLinks({
    notes: {
        collection: Notes,
        inversedBy: 'notebook'
    }
})