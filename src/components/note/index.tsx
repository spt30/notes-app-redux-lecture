import React, { ChangeEvent, Component, Fragment, MouseEvent as ReactMouseEvent } from 'react';

import { connect } from 'react-redux';
import { NOTE_STATUS_NAME } from '../../common/consts';
import { INote, NOTE_STATUS } from '../../common/types';

import { ApplicationState } from '../../store';
import { changeStatus, editNote } from '../../store/actions';

import { withRouter, RouteComponentProps } from 'react-router';
import { getNoteById } from '../../store/selectors';

import './index.css';

interface IOwnState {
    validation: boolean | string;
    currentNote: INote;
}

interface IRouteProps {
    id: string;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps & DispatchProps & RouteComponentProps<IRouteProps>;

class Note extends Component<Props, IOwnState> {
    public static getDerivedStateFromProps(props: Props, state: IOwnState): IOwnState {
        return {
            currentNote: {
                ...state.currentNote,
                status: props.currentNote.status
            },
            validation: state.validation
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            currentNote: props.currentNote,
            validation: false
        };
    }

    public render() {
        const {
            validation,
            currentNote: { id, title, description, created, status }
        } = this.state;

        return (
            <Fragment>
                <header className="header">
                    <h1>
                        {title} (#{id})
                    </h1>
                </header>
                <main className="main_note note-page">
                    <div className="note-page__field">
                        <input
                            type="text"
                            className="note-page__title"
                            value={title}
                            onChange={this.onChangeInput('title')}
                        />
                    </div>
                    <div className="note-page__field">
                        <textarea
                            className="note-page__description"
                            onChange={this.onChangeInput('description')}
                            value={description}
                        />
                    </div>
                    <div className="note-page__field">
                        <div className="note-page__created-date">
                            {created.toLocaleDateString()}
                        </div>
                    </div>
                    <div className="note-page__field">
                        <select
                            className="note-page__status"
                            value={status}
                            onChange={this.onChangeStatus}
                        >
                            {Object.values(NOTE_STATUS).map((noteStatus: NOTE_STATUS) => (
                                <option value={noteStatus} key={noteStatus}>
                                    {NOTE_STATUS_NAME[noteStatus]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="creator__validation">{validation || ''}</div>
                    <button className="creator__button" onClick={this.onEditButtonClick}>
                        Сохранить
                    </button>
                </main>
            </Fragment>
        );
    }

    public onChangeInput = (fieldName: 'title' | 'description') => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target;

        this.setState(state => ({
            currentNote: {
                ...state.currentNote,
                [fieldName]: value as string
            }
        }));
    };

    public onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const { id } = this.props.match.params;

        this.props.changeStatus({
            id: parseInt(id, 10),
            newStatus: value as NOTE_STATUS
        });
    };

    public onEditButtonClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        const { currentNote } = this.state;

        if (currentNote.title === '') {
            this.setState({ validation: 'Обязательное поле "Имя заметки"' });

            return;
        } else {
            this.setState({ validation: false });
        }

        currentNote.created = new Date();
        const { id } = this.props.match.params;

        this.props.editNote({ id: parseInt(id, 10), newNote: currentNote });
    };
}

function mapStateToProps(state: ApplicationState, props: RouteComponentProps<IRouteProps>) {
    const currentNote = getNoteById(state, props.match.params.id);

    return {
        currentNote
    };
}

const mapDispatchToProps = {
    editNote,
    changeStatus
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Note));
