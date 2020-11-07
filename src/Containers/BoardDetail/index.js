import React, { useState, useEffect } from "react";
import CommonLayout from "../AppLayout/CommonLayout";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
//import Title from 'app/components/Title';
import Column from "../../Components/Columns";
// import { StyledDashboard } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";
import Alert from "react-bootstrap/Alert";
import { useToasts } from "react-toast-notifications";
import "./index.css";
const APIURL = process.env.REACT_APP_APIURL;

const BoardDetailPage = function ({ boardID }) {
  const { addToast } = useToasts();
  let [columns, setColumns] = useState([]);
  let [boardName, setBoardName] = useState();

  useEffect(() => {
    fetchColumns();
  }, []);

  function fetchColumns() {
    axios
      .get(APIURL + "/boardDetail/" + boardID, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then(function (response) {
        if (response.data.status === 1) {
          setColumns(response.data.boardDetails);
          setBoardName(response.data.boardName);
        } else {
          addToast("Forbidden Error: You don't have permission!", {
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
    <CommonLayout>
      <div className="boardDetailPage">
      <h1 className="title" style={{marginLeft: '2rem'}}>{boardName}</h1>
        <div className="columnsList">
          {columns.length ? (
            columns.map(({ _id, name, color, isActive, columnID }) => (
              <Column
                key={_id}
                name={name}
                color={color}
                columnID={columnID}
                isActiveColumn={isActive}
              />
            ))
          ) : (
            <Alert variant="warning">There are no column yet</Alert>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default BoardDetailPage;
