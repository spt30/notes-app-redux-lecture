import { IAddNotePayload, IEditNotePayload, IChangeStatusPayload, ACTIONS, IAction } from '../common/types';

// Add Note
export const addNote = ({ note }: IAddNotePayload) => ({
    type: ACTIONS.ADD_NOTE,
    payload: {
        note
    }
});

// Edit Note
export const editNote = ({ id, newNote }: IEditNotePayload): IAction => ({
    type: ACTIONS.EDIT_NOTE,
    payload: {
        id,
        newNote
    }
});

// Change Status Note
export const changeStatus = ({ id, newStatus }: IChangeStatusPayload) => ({
    type: ACTIONS.CHANGE_STATUS,
    payload: {
        id,
        newStatus
    }
});
