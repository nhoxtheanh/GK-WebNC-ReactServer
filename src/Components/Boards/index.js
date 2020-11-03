import "./index.css";
//import { FileAddOutlined } from "@ant-design/icons";
import { Card } from "react-bootstrap";
import React from "react";
// const APIURL = process.env.REACT_APP_APIURL;

const Board = function ({ name, time }) {
  return (
    <div>
      <Card className="card">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Created at {time}
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Board;
