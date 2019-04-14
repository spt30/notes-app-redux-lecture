import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Note from './components/note';
import NotesList from './components/notes-list';
import store from './store';

class App extends Component {
    public render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Switch>
                        <Route path="/note/:id" component={Note} />
                        <Route path="/" component={NotesList} />
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;
