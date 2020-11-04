import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";

const CardItem = function ({ cardID, content, isActiveCard }) {
  let [contentCard, setContentCard] = useState("");
  let [isActive, setIsActive] = useState("");

  useEffect(() => {
    setContentCard(content);
    setIsActive(isActiveCard);
  }, []);

    // TODO : set content

  return (
    <div className="card-item">
      {isActive ? (
          <Card border="secondary" style={{ width: '30vw', height: '94px', 'text-align': 'left' }}>
            <Card.Body>
              <Card.Text>
                {contentCard}
              </Card.Text>
            </Card.Body>
          </Card>
      ) : null}
    </div>
  );
};

export default CardItem;
