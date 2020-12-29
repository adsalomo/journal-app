import React from 'react';
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {
    return (
        <div className="note__main-content">

            <NoteAppBar />

            <div className="note__content">

                <input
                    className="note__title-input"
                    type="text"
                    placeholder="Input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="Escribe aquí"
                    className="note__textarea"
                ></textarea>

                <div className="note__image">
                    <img
                        src="https://computacioninteractiva.com/wp-content/uploads/2019/07/INVERTIR-EN-TECNOLOGIA.png"
                        alt="imagen"
                    />
                </div>

            </div>

        </div>
    )
}
