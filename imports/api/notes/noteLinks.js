import { Notes } from './notes'
import { Notebooks } from '../notebooks/notebooks'

Notes.addLinks({
    notebook: {
        type: 'one',
        field: 'notebookId',
        collection: Notebooks
    }
})