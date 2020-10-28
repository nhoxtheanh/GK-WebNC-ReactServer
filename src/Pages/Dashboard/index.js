import "./index.css";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import axios from "axios";
import React, { useState,useEffect } from "react";

const Board = function () {
  let [responseData,setResponseData] = useState([]);

  useEffect(()=>{
    axios
    .get("http://localhost:8080/homeDashboard")
    .then(function (response) {
      setResponseData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[]);

  const renderBoard = function () {
    let boards = [];
    responseData.forEach((item) => {
      boards.push(
        <Card className="card" title="Board 1">
          <p>{item.name}</p>
        </Card>
      );
    });
    console.log(responseData)
    return boards;
  };

  return (
    <div>
      <div className="cards">
        <Button className="add-button">
          <FileAddOutlined /> <span>Add board</span>
        </Button>
        {renderBoard()}
      </div>
    </div>
  );
};

export default Board;
