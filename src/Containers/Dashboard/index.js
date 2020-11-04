import React, { useState, useEffect } from "react";
import CommonLayout from "../AppLayout/CommonLayout";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
//import Title from 'app/components/Title';
import Board from "../../Components/Boards";
// import { StyledDashboard } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";
import Alert from "react-bootstrap/Alert";

import moment from "moment";
// import useHooks from './hooks';
const APIURL = process.env.REACT_APP_APIURL;

const Dashboard = (props) => {
  // const { handlers, selectors } = useHooks();

  let [boards, setBoards] = useState([]);
  useEffect(() => {
    fetchBoards();
  }, []);

  function fetchBoards() {
    // gọi API lấy tất cả boards của user
    axios
      .get(APIURL + "/homeDashboard", {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then(function (response) {
        if (response.data.status === 1) setBoards(response.data.allBoards);
        else {
          alert("Forbidden Error: You don't have permission!");
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createBoard(boardName) {
    // gọi API tạo Board mới
    axios
      .post(
        APIURL + "/homeDashboard/createBoard",
        {
          boardName: boardName,
        },
        {
          headers: { Authorization: localStorage.getItem("jwtToken") },
        }
      )
      .then(function (response) {
        if (response.data.status === 1) fetchBoards();
        else {
          alert(response.data.msg.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <CommonLayout>
      <div className="dashboardPage">
        <div className="boardsList">
          {" "}
          <Button
            variant="outline-warning"
            className="add-button"
            onClick={async () => {
              const boardName = await Prompt("New Board", {
                title: "What is your New Board name?",
                isRequired: true,
                okButtonText: "Create",
                cancelButtonText: "Cancel",
              });

              if (boardName) {
                createBoard(boardName);
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
            <span>Add board</span>
          </Button>
          {boards.length ? (
            boards.map(({ _id, name, createdAt, isActive }) =>
              isActive ? (
                <Board
                  key={_id}
                  name={name}
                  time={moment(createdAt).format("D MMMM")}
                />
              ) : null
            )
          ) : (
            <Alert variant="warning">
              <br></br>
              <br></br>
              <br></br>
              ←&nbsp;click&nbsp;to&nbsp;create&nbsp;your&nbsp;first&nbsp;board
            </Alert>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
