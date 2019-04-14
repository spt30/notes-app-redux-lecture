import { Reducer } from 'redux';

import { ApplicationState } from '.';
import { initialNotes } from '../common/mocks';
import { IAddNotePayload, IChangeStatusPayload, IEditNotePayload, IAction, ACTIONS, INote } from '../common/types';

export const initialState = {
    notes: initialNotes
};

const notesReducer = (state: ApplicationState = initialState, action: IAction) => {
    const { type, payload } = action;
    const { notes } = state;

    switch (type) {
        case ACTIONS.ADD_NOTE: {
            const { note: newPureNote } = payload as IAddNotePayload;

            const id = Math.max(...notes.map((note: INote) => note.id)) + 1;

            const newNote = {
                ...newPureNote,
                id
            };

            return {
                ...state,
                notes: [...notes, newNote]
            };
        }
        case ACTIONS.EDIT_NOTE: {
            const { id, newNote } = payload as IEditNotePayload;
            const noteWithId = { ...newNote, id };

            const noteIndex = notes.findIndex((note: INote) => note.id === id);

            const stateCopy: ApplicationState = {
                ...state,
                notes: [...notes]
            };
            stateCopy.notes.splice(noteIndex, 1, noteWithId);

            return stateCopy;
        }
        case ACTIONS.CHANGE_STATUS: {
            const { id, newStatus } = payload as IChangeStatusPayload;

            const noteIndex = notes.findIndex((note: INote) => note.id === id);
            const newNote = { ...notes[noteIndex], status: newStatus };

            const stateCopy: ApplicationState = {
                ...state,
                notes: [...notes]
            };
            stateCopy.notes.splice(noteIndex, 1, newNote);

            return stateCopy;
        }
        default:
            return state;
    }
};

export default notesReducer as Reducer;
