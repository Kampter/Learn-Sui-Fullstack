import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddNote from "./AddNote";
import Note from "./Note";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { NotesService } from "../utils/noteService";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const notesService = new NotesService();

    const getNotes = useCallback(async () => {
        try {
            const notes = await notesService.getNotes();
            setNotes(notes);
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    });

    const addNote = async (note) => {
        try {
            setLoading(true);
            const { title, body } = note;
            await notesService.addNote({ title, body });

            getNotes();
            toast.success(<NotificationSuccess text={"A note add successfully"}/>);
        } catch (error) {
            console.log({ error });
            toast.error(<NotificationError text={"Failed to add a note"}/>);
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            setLoading(true);
            await notesService.deleteNoteById(id);

            getNotes();
            toast.success(<NotificationSuccess text={"A note deleted successfully"}/>);
        } catch (error) {
            console.log({ error });
            toast.error(<NotificationError text={"Failed to delete a note"}/>);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fs-4 fw-bold mb-0">ZK Login</h1>
                        <AddNote save={addNote} />
                    </div>
                    <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                        {notes.map((_note) => (
                        <Note
                            note={{
                            ..._note,
                            }}
                            deleteNote={deleteNote}
                        />
                        ))}
                    </Row>
                    <Row>
                        {notes.map((note) => (
                            <Note key={note.id} note={note} deleteNote={deleteNote} />
                        ))}
                    </Row>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Notes;