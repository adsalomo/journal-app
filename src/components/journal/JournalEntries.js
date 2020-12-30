import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.note);

    return (
        <div className="journal__entries">
            {
                notes && notes.map((note) => {
                    return <JournalEntry
                        key={note.id}
                        {...note}
                    />
                })
            }
        </div>
    )
}
