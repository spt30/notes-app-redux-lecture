import React, { ChangeEvent, Component, Fragment, MouseEvent as ReactMouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { INITIAL_NOTE, NOTE_STATUS_NAME } from '../../common/consts';
import { IPureNote, NOTE_STATUS } from '../../common/types';

import { ApplicationState } from '../../store';
import { addNoteRequest, changeStatus } from '../../store/actions';

import './index.css';

interface OwnState {
    validation: boolean | string;
    newNote: IPureNote;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps & DispatchProps & RouteComponentProps;

class NotesList extends Component<Props, OwnState> {
    public state: OwnState = {
        validation: false,
        newNote: { ...INITIAL_NOTE }
    };

    public render() {
        const { notes } = this.props;
        const { validation } = this.state;

        return (
            <Fragment>
                <header className="header">
                    <h1>Мои заметки</h1>
                </header>
                <main className="main_list">
                    <div className="notes-list">
                        {notes &&
                            notes.map(({ id, title, description, status, created, randomAsyncNumber }) => (
                                <div className="note" key={id}>
                                    <h3 className="note__title" onClick={this.showNote(id)}>
                                        {title}
                                    </h3>
                                    {description && (
                                        <div className="note__description">{description}</div>
                                    )}
                                    <div className="note__description">Случайное число: {randomAsyncNumber}</div>
                                    <footer className="note__footer">
                                        <div className="note__created-date">
                                            {created.toLocaleDateString()}
                                        </div>
                                        <select
                                            className="note__status"
                                            value={status}
                                            onChange={this.onChangeStatusInList(id)}
                                        >
                                            {Object.values(NOTE_STATUS).map(
                                                (noteStatus: NOTE_STATUS) => (
                                                    <option value={noteStatus} key={noteStatus}>
                                                        {NOTE_STATUS_NAME[noteStatus]}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </footer>
                                </div>
                            ))}
                    </div>
                    <div className="creator">
                        <h2 className="creator__title">Добавить заметку</h2>
                        <form className="creator__form">
                            <div className="creator__input">
                                <span
                                    className={`creator__field-title ${
                                        validation ? 'creator__field-title_warning' : ''
                                    }`}
                                >
                                    Имя заметки*:
                                </span>
                                <input
                                    className="creator__field-value"
                                    type="text"
                                    value={this.state.newNote.title}
                                    onChange={this.onChangeInput('title')}
                                />
                            </div>
                            <div className="creator__input">
                                <span className="creator__field-title">Описание:</span>
                                <input
                                    className="creator__field-value"
                                    type="text"
                                    value={this.state.newNote.description}
                                    onChange={this.onChangeInput('description')}
                                />
                            </div>
                            <div className="creator__input">
                                <span className="creator__field-title">Статус:</span>
                                <select
                                    className="creator__field-value"
                                    value={this.state.newNote.status}
                                    onChange={this.onChangeStatus}
                                >
                                    {Object.values(NOTE_STATUS).map((status: NOTE_STATUS) => (
                                        <option value={status} key={status}>
                                            {NOTE_STATUS_NAME[status]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="creator__validation">{validation || ''}</div>
                            <button className="creator__button" onClick={this.onCreateButtonClick}>
                                Добавить
                            </button>
                        </form>
                    </div>
                </main>
            </Fragment>
        );
    }

    public onChangeInput = (fieldName: 'title' | 'description') => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = e.target;

        this.setState(state => ({
            newNote: {
                ...state.newNote,
                [fieldName]: value as string
            }
        }));
    };

    public onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        this.setState(state => ({
            newNote: {
                ...state.newNote,
                status: value as NOTE_STATUS
            }
        }));
    };

    public onCreateButtonClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        const { newNote } = this.state;

        if (newNote.title === '') {
            this.setState({ validation: 'Обязательное поле "Имя заметки"' });

            return;
        } else {
            this.setState({ validation: false });
        }

        newNote.created = new Date();

        this.props.addNote({ note: newNote });

        this.setState({ newNote: { ...INITIAL_NOTE } });
    };

    public onChangeStatusInList = (id: number) => (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        this.props.changeStatus({ id, newStatus: value as NOTE_STATUS });
    };

    public showNote = (id: number) => () => {
        const { history } = this.props;

        history.push(`/note/${id}`);
    };
}

function mapStateToProps(state: ApplicationState) {
    const { notes } = state;

    return {
        notes
    };
}

const mapDispatchToProps = {
    addNote: addNoteRequest,
    changeStatus
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NotesList) as any);
