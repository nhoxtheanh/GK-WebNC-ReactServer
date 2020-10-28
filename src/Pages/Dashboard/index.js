import "./index.css";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

const response = [
  {
    ownerID: "1",
    isActive: true,
    _id: "5f98622f4e8ad9249428a134",
    name: "Board 1",
    createdAt: 1603822127918,
    boardID: 1,
    __v: 0,
  },
  {
    ownerID: "1",
    isActive: true,
    _id: "5f98de9bd735c30ce872d9ad",
    name: "Board 2 User 1",
    createdAt: 1603853979316,
    boardID: 2,
    __v: 0,
  },
];

const Board = function () {
  const renderBoard = function () {
    let boards = [];
    response.forEach((item) => {
      boards.push(
        <Card className="card" title="Board 1">
          <p>{item.name}</p>
        </Card>
      );
    });
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
