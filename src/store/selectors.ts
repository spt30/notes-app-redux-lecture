import { createSelector } from 'reselect'

import { ApplicationState } from './index';

import { INote } from '../common/types';

export function getNoteById(state: ApplicationState, id: string) {
    const { notes } = state;

    return notes.find(note => note.id === parseInt(id, 10)) || notes[notes.length - 1];
}

export function getAllNotes(state: ApplicationState) {
    return state.notes;
}

export function getLastNote(state: ApplicationState) {
    console.log('recomputed last note selector');
    const { notes } = state;

    return notes[notes.length - 1]
}

// export function getLastStatus(state: ApplicationState) {
//     console.log('recomputed status selector');
//     return getLastNote(state).status;
// }

export const getLastStatus = createSelector(
    [getLastNote],
    (lastNote: INote) => {
        console.log('recomputed status selector');
        return lastNote.status;
    }
)
