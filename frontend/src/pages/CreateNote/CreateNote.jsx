import React, { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import ReactMarkDown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/actions/noteActions";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setMessage("Please all the fields");
      return;
    }
    dispatch(createNote(title, content, category));
    setMessage("");

    resetHandler();
    navigate("/mynotes");
  };

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <Card.Header>Create a new Note</Card.Header>
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
            {loading && <Spinner animation="border" />}
            <Button variant="primary" type="submit">
              Create
            </Button>
            <Button variant="danger" className="mx-3" onClick={resetHandler}>
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
