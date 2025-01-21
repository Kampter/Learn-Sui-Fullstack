import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddNote from "./AddNote";
import Note from "./Note";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { NotesService } from "../../utils/notesService";

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
}