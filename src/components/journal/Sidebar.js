import React from 'react'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-2">
                    <li className="far fa-moon"></li>
                    <span>Elena</span>
                </h3>

                <button className="btn">
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <li className="far fa-calendar-plus fa-5x"></li>
                <p className="mt-2">New entry</p>
            </div>

            <JournalEntries />

        </aside>
    )
}
