import { Notes } from './notePublications'
import { Notebooks } from '../notebooks/notebookPublications'

Notes.addLinks({
    notebook: {
        type: 'one',
        field: 'notebookId',
        collection: Notebooks
    }
})