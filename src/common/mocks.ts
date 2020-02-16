import { INote, NOTE_STATUS } from './types';

export const initialNotes: INote[] = [
    {
        created: new Date('2019-04-09T12:49:59.790Z'),
        description: '',
        id: 1,
        status: NOTE_STATUS.actual,
        title: 'Проверить домашки'
    },
    {
        created: new Date('2019-04-03T16:59:59.834Z'),
        description: 'Не забыть показать Redux DevTools',
        id: 2,
        status: NOTE_STATUS.actual,
        title: 'Прочитать лекцию про Redux'
    },
    {
        created: new Date('2019-01-22T21:05:16.356Z'),
        description:
            '// @ts-check – встроенная директива VSCode, которая проверяет доступную типизацию в js-файлах',
        id: 3,
        status: NOTE_STATUS.old,
        title: 'Рассказать про // @ts-check'
    }
];
