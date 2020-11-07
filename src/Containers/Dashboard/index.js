import React, { useState, useEffect } from "react";
import CommonLayout from "../AppLayout/CommonLayout";
import { Card, Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
//import Title from 'app/components/Title';
import Board from "../../Components/Boards";
// import { StyledDashboard } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Prompt, Alert as AlertModal } from "react-st-modal";
import Alert from "react-bootstrap/Alert";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
const APIURL = process.env.REACT_APP_APIURL;

const Dashboard = (props) => {
  const { addToast } = useToasts();
  // const { handlers, selectors } = useHooks()
  let [boards, setBoards] = useState([]);
  let [fullBoards, setFullBoards] = useState([]);

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
        if (response.data.status === 1) {
          setBoards(response.data.allBoards);
          setFullBoards(response.data.allBoards);
        }
        else {
          addToast("Forbidden Error: You don't have permission!", {
            appearance: "error",
            autoDismiss: true,
          });
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

  function checkFiltering(e) {
    if (e.target.value) onFiltering(e);
    else  outFiltering();
  }

  function onFiltering(e) {
    let filterValue = e.target.value;
    const filteredBoards = boards.filter(function (el) {
      return (el.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) && (el.isActive == true);
    });
    setBoards(filteredBoards);
  }

  function outFiltering() {
    setBoards(fullBoards);
  }

  return (
    <CommonLayout>
      <div className="dashboardPage">
        <Form inline className="searchForm input-group col-lg-4">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            id="filter-input"
            onChange={(e) => {checkFiltering(e);}}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
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
            boards.map(({ _id, name, createdAt, isActive, boardID }) => (
              <Board
                key={_id}
                name={name}
                time={moment(createdAt).format("D MMMM")}
                boardID={boardID}
                isActiveBoard={isActive}
              />
            ))
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
