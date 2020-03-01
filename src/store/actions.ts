import { IAddNotePayload, IEditNotePayload, IChangeStatusPayload, ACTIONS, IAction, ExtendRandomNumber } from '../common/types';
import { Dispatch } from 'redux';

// Add Note
export const addNoteRequest = ({ note }: IAddNotePayload) => {
    return (dispatch: Dispatch) => {
        setTimeout(() => {
            const randomAsyncNumber = Math.ceil(Math.random() * 100);

            dispatch(addNoteSuccess({ note, randomAsyncNumber }))
        }, 3000)
    }
}

export const addNoteSuccess = ({ note, randomAsyncNumber }: ExtendRandomNumber<IAddNotePayload>) => ({
    type: ACTIONS.ADD_NOTE,
    payload: {
        note,
        randomAsyncNumber
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
