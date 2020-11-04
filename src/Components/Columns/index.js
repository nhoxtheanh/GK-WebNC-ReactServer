import "./index.css";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";
import axios from "axios";
const APIURL = process.env.REACT_APP_APIURL;

const Column = function ({ name, color, columnID, isActiveColumn }) {
  let [columnName, setColumnName] = useState("");
  let [isActive, setIsActive] = useState("");

  useEffect(() => {
    setColumnName(name);
    setIsActive(isActiveColumn);
  }, []);


  return (
    <div>
      {isActive ? (
      <div>
        <Card className="card" bg={ (name == "Action Items") ? 'info' : (name == "To improve") ? 'danger' : 'success'}> 
        {/* TODO : chỉnh lại màu theo biến color */}
          <Card.Body>
            <Card.Title>
              {columnName}
            </Card.Title>
          
          </Card.Body>
        </Card>
        <Card className="card">
            <Button
            variant="outline-warning"
            className="add-button"
            onClick={async () => {
              const cardName = await Prompt("New Card", {
                title: "What is your New Card name?",
                isRequired: true,
                okButtonText: "Create",
                cancelButtonText: "Cancel",
              });

              if (cardName) {
                ///////createBoard(boardName);  TODO create CARD
              }
            }}
          >
            <button
              type="button-add-icon"
              class="btn btn-warning btn-circle btn-xl"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <br></br>
            <span>Add card</span>
          </Button>
          </Card>
          </div>
      ) : null}
    </div>
  );
};

export default Column;
