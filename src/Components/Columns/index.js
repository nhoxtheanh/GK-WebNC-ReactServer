import "./index.css";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";
import CardItem from '../Cards'
import axios from "axios";
const APIURL = process.env.REACT_APP_APIURL;

const Column = function ({ name, color, columnID, isActiveColumn }) {
  let [columnName, setColumnName] = useState("");
  let [isActive, setIsActive] = useState("");
  let [cards, setCards] = useState([]);

  useEffect(() => {
    setColumnName(name);
    setIsActive(isActiveColumn);
    fetchCards();
  }, []);

  function addCard(content) {
    axios
      .post(
        APIURL + "/boardDetail/addCard",
        {
          content: content,
          columnID: columnID
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1) fetchCards();  ////TODO : fetch cards
        else {
          alert(response.data.msg.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchCards() {
    axios
      .get(APIURL + "/boardDetail/getCards/" + columnID, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then(function (response) {
        if (response.data.status === 1) setCards(response.data.cards);
        else {
          alert(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


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

        {cards.length ? (
            cards.map(({ _id, cardID, content, isActive }) => (
              <CardItem
                key={_id}
                cardID={cardID}
                content={content}
                isActiveCard={isActive}
              />
            ))
          ) : (
            null
          )}

        <Card className="card btn-addCard">
            <Button
            variant="outline-warning"
            className="add-button"
            onClick={async () => {
              const content = await Prompt("New Card", {
                title: "Content",
                isRequired: true,
                okButtonText: "Add",
                cancelButtonText: "Cancel",
              });

              if (content) {
                addCard(content);
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
