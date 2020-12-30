import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/note';

export const NoteAppBar = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.note);

    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handleUploadFile = () => {
        document.querySelector("#fileSelector").click();
    }

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="note__app-bar">
            <span>28 agosto 2020</span>

            <input
                name="file"
                id="fileSelector"
                type="file"
                style={{ display: 'none' }}
                onChange={handleOnChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handleUploadFile}
                >
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
