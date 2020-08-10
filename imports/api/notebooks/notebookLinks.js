import { Notebooks } from './notebooks'
import { Notes } from '../notes/notes'

Notebooks.addLinks({
    notes: {
        collection: Notes,
        inversedBy: 'notebook'
    }
})