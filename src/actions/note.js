import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const doc = await db.collection(`${uid}/journal/note`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    };
};

export const activeNote = (id, note) => {
    return {
        type: types.noteActive,
        payload: {
            id,
            ...note,
        }
    };
};

export const addNewNote = (id, note) => {
    return {
        type: types.noteAddNew,
        payload: {
            id, ...note,
        },
    }
};

export const startLoadingNote = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
}

export const setNotes = (notes) => {
    return {
        type: types.noteLoad,
        payload: notes,
    };
};

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        // FIREBASE NO SOPORTA UNDEFINED, LA URL ESTA HASTA LA CLASE 263 SIN LA URL
        if (!note.url) {
            delete note.url;
        }

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        await db.doc(`${uid}/journal/note/${note.id}`).update(noteToFireStore);

        dispatch(refreshNote(note.id, noteToFireStore));

        Swal.fire('Saved', note.title, 'success');
    }
};

export const refreshNote = (id, note) => {
    return {
        type: types.noteUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
};

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().note;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
        });

        Swal.showLoading();

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/note/${id}`).delete();

        dispatch(deleteNote(id));
    }
};

export const deleteNote = (id) => {
    return {
        type: types.noteDeleteNote,
        payload: id,
    }
};

export const noteLogout = () => {
    return {
        type: types.noteLogoutCleaning,
    }
};

