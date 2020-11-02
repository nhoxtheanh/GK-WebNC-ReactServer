import "./index.css";
//import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useState, useEffect } from "react";
// const APIURL = process.env.REACT_APP_APIURL;

const Board = function ({ name, time }) {
  return (
    <div>
      <Card className="card" title={name}>
        <p>Created at {time}</p>
      </Card>
    </div>
  );
};

export default Board;
