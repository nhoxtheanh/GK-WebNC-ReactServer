import "./index.css";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaLink } from "react-icons/fa";

import { Prompt, Confirm } from "react-st-modal";
import axios from "axios";
const APIURL = process.env.REACT_APP_APIURL;

const Board = function ({ name, time, boardID, isActiveBoard }) {
  let [boardName, setboardName] = useState("");
  let [isActive, setIsActive] = useState("");

  useEffect(() => {
    setboardName(name);
    setIsActive(isActiveBoard);
  }, []);

  function renameBoard(newBoardName) {
    axios
      .post(
        APIURL + "/homeDashboard/renameBoard",
        {
          boardName: newBoardName,
          boardID: boardID,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1) setboardName(newBoardName);
        else {
          alert(response.data.msg.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteBoard() {
    axios
      .post(
        APIURL + "/homeDashboard/deleteBoard",
        {
          boardID: boardID,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1) setIsActive(!isActive);
        else {
          alert(response.data.msg.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {isActive ? (
        <Card className="card">
          <Card.Body>
            <Card.Title>
              {boardName}
              <Button
                className="btn-editBoard"
                onClick={async () => {
                  const newBoardName = await Prompt("Rename Board", {
                    title: "What is your New Board name?",
                    isRequired: true,
                    okButtonText: "Save",
                    cancelButtonText: "Cancel",
                  });

                  if (newBoardName) {
                    renameBoard(newBoardName);
                  }
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Created at {time}
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>

            <Button variant="outline-info" className="btn-shareBoard">
              <FaLink /> Share link
            </Button>
            <Button
              variant="outline-danger"
              className="btn-deleteBoard"
              onClick={async () => {
                const confirm = await Confirm(
                  "Are you sure to delete this board?",
                  "Delete Board"
                );

                if (confirm) {
                  deleteBoard();
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
};

export default Board;
