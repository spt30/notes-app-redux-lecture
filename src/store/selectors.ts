import { ApplicationState } from './index';

export function getNoteById(state: ApplicationState, id: string) {
    const { notes } = state;

    return notes.find(note => note.id === parseInt(id, 10)) || notes[notes.length - 1];
}

export function getAllNotes(state: ApplicationState) {
    return state.notes;
}

export function getLastStatus({ notes }: ApplicationState) {
    return notes[notes.length - 1].status;
}
