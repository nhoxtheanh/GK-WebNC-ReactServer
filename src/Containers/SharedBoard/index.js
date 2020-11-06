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
import { useToasts } from 'react-toast-notifications';
import moment from "moment";
const APIURL = process.env.REACT_APP_APIURL;

const SharedBoardPage = function ({ boardKey }) {
  const { addToast } = useToasts();
  let [columns, setColumns] = useState([]);
  useEffect(() => {
    fetchColumns();
  }, []);

  function fetchColumns() {
    axios
      .get(APIURL + "/sharedBoard/" + boardKey, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then(function (response) {
        if (response.data.status === 1) setColumns(response.data.boardDetails);
        else {
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
            <Alert variant="warning">
              There are no column yet
            </Alert>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default SharedBoardPage;
