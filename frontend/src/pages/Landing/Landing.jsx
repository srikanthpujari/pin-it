import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const dispatch = useDispatch();

  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to PIN-IT</h1>
              <p className="subtitle">One safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <Button href="/login" size="lg">
                Login
              </Button>
              <Button href="/register" size="lg" variant="outline-primary">
                Signup
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
