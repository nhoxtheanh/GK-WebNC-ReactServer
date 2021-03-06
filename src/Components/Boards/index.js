import "./index.css";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaLink } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { Prompt, Confirm, CustomDialog } from "react-st-modal";
import axios from "axios";
import ShowBoardURLModal from "../Modals";
const APIURL = process.env.REACT_APP_APIURL;

const Board = function ({ name, time, boardID, isActiveBoard }) {
  const { addToast } = useToasts();
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
          addToast(response.data.msg.message, {
            appearance: "error",
            autoDismiss: true,
          });
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
          addToast(response.data.msg.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getBoardDetail(boardID) {
    window.location.href = "/boardDetail/" + boardID;
  }

  function shareBoard(boardID) {
    let host = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port) host += ":" + window.location.port;
    axios
      .post(
        APIURL + "/sharedBoard",
        {
          boardID: boardID,
          host: host,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1) {
          const result = CustomDialog(
            <ShowBoardURLModal URL={response.data.board.sharedURL} />,
            {
              title: "Nice! Now you can share this URL with your partner",
            }
          );

          // if (url) {
          //   deleteBoard();
          // }
        } else {
          addToast(response.data.msg.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {isActive ? (
        <Card className="card" border="dark">
          <Card.Body>
            <Card.Title>{boardName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Created at {time}
            </Card.Subtitle>
            <Card.Text>
              <Button
                variant="light"
                className="btn-boardDetail"
                onClick={() => getBoardDetail(boardID)}
              >
                Board Detail
              </Button>
            </Card.Text>
            <div class="btn-action-container">
              <Button
                variant="outline-info"
                className="btn-shareBoard"
                onClick={() => shareBoard(boardID)}
              >
                <FaLink /> Share link
              </Button>
              <Button
                variant="outline-primary"
                className=""
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
            </div>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
};

export default Board;
