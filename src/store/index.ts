import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { INote } from '../common/types';
import reducer, { initialState } from './reducers';

export interface ApplicationState {
    notes: INote[];
}

export default createStore( reducer, initialState as any, applyMiddleware(thunk))
