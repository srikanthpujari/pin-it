import React, { useEffect } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Spinner,
  useAccordionButton,
} from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, listNotes } from "../../redux/actions/noteActions";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { NoteState } from "../../context/NoteProvider";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <span onClick={decoratedOnClick}>{children}</span>;
}

const MyNotes = () => {
  const navigate = useNavigate();

  const { search } = NoteState();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = noteDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(listNotes());
  }, [
    dispatch,
    successCreate,
    userInfo,
    navigate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <>
      <MainScreen title={`Welcome to notes, ${userInfo.name}`}>
        <Button href="/createnote" size="lg">
          Create New Note
        </Button>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {(loading || loadingDelete) && (
          <Spinner
            animation="border"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
        {notes
          ?.filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion>
              <Card style={{ marginTop: "20px" }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      flex: "1",
                      color: "black",
                      alignSelf: "center",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <CustomToggle eventKey="0">{note.title}</CustomToggle>
                    {/* <Accordion.C eventKey="0">Title</Accordion.C> */}
                  </span>
                  <Button href={`/updatenote/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge pill bg="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </>
  );
};

export default MyNotes;
