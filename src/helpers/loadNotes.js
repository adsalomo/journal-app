import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`${uid}/journal/note`).get();
    const notes = [];

    notesSnap.forEach((n) => {
        notes.push({
            id: n.id,
            ...n.data(),
        });
    });

    //console.log(notes);

    return notes;
}