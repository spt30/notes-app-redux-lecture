import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { INote } from '../common/types';
import reducer, { initialState } from './reducers';

export interface ApplicationState {
    notes: INote[];
}

export default createStore(reducer, initialState as any, composeWithDevTools());
