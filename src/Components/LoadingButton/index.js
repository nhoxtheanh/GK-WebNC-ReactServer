import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function LoadingButton(props) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant={props.variant ? props.variant : ""}
      disabled={isLoading || props.disabled ? props.disabled : ""}
      type={props.type ? props.type : ""}
      onClick={!isLoading ? handleClick : null}
      className={props.className ? props.className : ""}
    >
      {props.content ? props.content : ""}
    </Button>
  );
}

