import "./App.css";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function App() {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const [editing, setEditing] = useState(false);
    const [editingNote, setEditingNote] = useState("");

    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id: Date.now(),
            text: note,
        };
        setNotes([...notes].concat(newNote));
        setNote("");
    };

    const archiveNote = (id) => {
        let activeNotes = [...notes].filter((note) => note.id !== id);
        setNotes(activeNotes);
    };

    const editNote = (id) => {
        const activeNotes = [...notes].map((note) => {
            if (note.id === id) {
                note.text = editingNote;
            }
            return note;
        });
        setNotes(activeNotes);
        setEditing(null);
    };

    return (
        <div className="App">
            <h1>Notes</h1>
            <div>
                <form>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                    />
                </form>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Add Note
                </Button>
            </div>
            <div className="notes-container">
                {notes.map((note) => (
                    <Card className={classes.root} key={note.id} id={note.id}>
                        <CardContent>
                            {note.id === editing ? (
                                <TextField
                                    type="text"
                                    onChange={(e) =>
                                        setEditingNote(e.target.value)
                                    }
                                />
                            ) : (
                                <>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        note
                                    </Typography>

                                    <Typography variant="h5" component="h2">
                                        {note.text}
                                    </Typography>
                                </>
                            )}

                            {note.id === editing ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => editNote(note.id)}
                                >
                                    Finished
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setEditing(note.id)}
                                >
                                    Edit
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => archiveNote(note.id)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default App;
