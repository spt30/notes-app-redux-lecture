import { IPureNote, NOTE_STATUS } from './types';

export const NOTE_STATUS_NAME: { [key in NOTE_STATUS]: string } = {
    actual: 'Актуально',
    deleted: 'Удалено',
    old: 'Не актуально'
};

export const INITIAL_NOTE: IPureNote = {
    created: new Date(),
    description: '',
    status: NOTE_STATUS.actual,
    title: ''
};
