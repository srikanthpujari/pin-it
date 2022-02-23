import React, { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../MainScreen/MainScreen";
import ReactMarkDown from "react-markdown";
import { deleteNote, updateNote } from "../../redux/actions/noteActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { error: errorDelete, loading: loadingDelete } = noteDelete;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userInfo) navigate("/");

    (async () => {
      const { data } = await axios.get(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    })();
  }, [id, date, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setMessage("Please fill all the fields");
      return;
    }

    dispatch(updateNote(id, title, content, category));

    resetHandler();
    navigate("/mynotes");
  };

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        <Card.Header>Edit the Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: "100px" }}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Preview</Card.Header>
                <Card.Body>
                  <ReactMarkDown>{content}</ReactMarkDown>
                </Card.Body>
              </Card>
            )}
            <Form.Group
              className="mb-3"
              controlId="formBasicCategory"
              style={{ marginTop: "10px" }}
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {(loading || loadingDelete) && <Spinner animation="border" />}
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button
              variant="danger"
              className="mx-3"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>Updated on - {date.substring(0, 10)}</Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default UpdateNote;
