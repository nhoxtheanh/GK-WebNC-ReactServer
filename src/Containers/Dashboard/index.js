import React, { useState, useEffect } from "react";
import CommonLayout from "../AppLayout/CommonLayout";
import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
//import Title from 'app/components/Title';
import Board from "../../Components/Boards";
// import { StyledDashboard } from './styles';

import moment from "moment";
// import useHooks from './hooks';
const APIURL = process.env.REACT_APP_APIURL;

const Dashboard = (props) => {
  // const { handlers, selectors } = useHooks();

  let [boards, setBoards] = useState([]);
  useEffect(() => {
    // gọi API lấy tất cả boards
    axios
      .get(APIURL + "/homeDashboard")
      .then(function (response) {
        setBoards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <CommonLayout>
      <div className="dashboardPage">
        <Button className="add-button">
          <FileAddOutlined /> <span>Add board</span>
        </Button>
        <div className="boardsList">
          {boards.map(({ _id, name, createdAt }) => (
            <Board
              key={_id}
              name={name}
              time={moment(createdAt).format("D MMMM")}
            />
          ))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
