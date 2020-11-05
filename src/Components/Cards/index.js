import "./index.css";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Confirm } from "react-st-modal";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
const APIURL = process.env.REACT_APP_APIURL;

const CardItem = function ({ cardID, content, isActiveCard, color }) {
  const { addToast } = useToasts();
  let [contentCard, setContentCard] = useState("");
  let [isActive, setIsActive] = useState("");

  useEffect(() => {
    setContentCard(content);
    setIsActive(isActiveCard);
  }, []);

  function editCard(newContent) {
    axios
      .post(
        APIURL + "/boardDetail/editCard",
        {
          newContent: newContent,
          cardID: cardID,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1)
          setContentCard(response.data.card.content);
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

  function deleteCard() {
    axios
      .post(
        APIURL + "/boardDetail/deleteCard",
        {
          cardID: cardID,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1)
          setIsActive(response.data.card.isActive);
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

  return (
    <div className="card-item">
      {isActive ? (
        <Card
          border={
            color == "blue"
              ? "info"
              : color == "red"
              ? "danger"
              : color == "green"
              ? "success"
              : "dark"
          }
          style={{ width: "30vw", height: "94px", "text-align": "left" }}
        >
          <Card.Body>
            <Card.Text>{contentCard}</Card.Text>
          </Card.Body>
          <div className="actionButtons">
            <button
              className="actionBtn"
              onClick={async () => {
                const newContent = await Prompt("Edit Card", {
                  title: "Content",
                  isRequired: true,
                  okButtonText: "Save",
                  cancelButtonText: "Cancel",
                });

                if (newContent) {
                  editCard(newContent);
                }
              }}
            >
              <FontAwesomeIcon icon={faPen} style={{ color: color }} />
            </button>
            <button
              className="actionBtn"
              onClick={async () => {
                deleteCard();
              }}
            >
              <FontAwesomeIcon
                className="actionBtn"
                icon={faTrash}
                style={{ color: color }}
              />
            </button>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default CardItem;
