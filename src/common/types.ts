export enum NOTE_STATUS {
    actual = 'actual',
    old = 'old',
    deleted = 'deleted'
}

export interface IPureNote {
    title: string;
    description: string;
    status: NOTE_STATUS;
    created: Date;
}

export interface INote extends IPureNote {
    id: number;
}

// Все типы Action'ов
export enum ACTIONS {
    ADD_NOTE = 'ADD_NOTE',
    EDIT_NOTE = 'EDIT_NOTE',
    CHANGE_STATUS = 'CHANGE_STATUS'
}

// Action Payloads – ПОЛЕЗНАЯ(!) информация,
// которая передается в action
export interface IAddNotePayload {
    note: IPureNote;
}

export interface IEditNotePayload {
    id: number;
    newNote: IPureNote;
}

export interface IChangeStatusPayload {
    id: number;
    newStatus: NOTE_STATUS;
}

// Интерфейс, который описывает Action целиком
export interface IAction {
    type: ACTIONS;
    payload:
        | IAddNotePayload
        | IEditNotePayload
        | IChangeStatusPayload;
}
