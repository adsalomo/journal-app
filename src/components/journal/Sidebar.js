import React from 'react';
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/note';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleAdd = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-2">
                    <li className="far fa-moon"></li>
                    <span>{name}</span>
                </h3>

                <button
                    onClick={handleLogout}
                    className="btn"
                >
                    Logout
                </button>
            </div>

            <div
                className="journal__new-entry"
                onClick={handleAdd}
            >
                <li className="far fa-calendar-plus fa-5x"></li>
                <p className="mt-2">New entry</p>
            </div>

            <JournalEntries />

        </aside>
    )
}
