import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/note';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body, id } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(note.id, { ...formValues }));

    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id))
    }

    return (
        <div className="note__main-content">

            <NoteAppBar />

            <div className="note__content">

                <input
                    className="note__title-input"
                    type="text"
                    name="title"
                    placeholder="Input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    className="note__textarea"
                    placeholder="Escribe aquí"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    note.url &&
                    <div className="note__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                    </div>
                }

            </div>

            <div
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </div>
        </div>
    )
}
