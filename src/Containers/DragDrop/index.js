import React from "react";
import styled from "styled-components";
import Drag from "../../Components/Drag";
import Drop from "../../Components/Drop";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;

const dropStyle = {
  backgroundColor: "#555",
  width: "250px",
  height: "400px",
  margin: "32px",
};

export default function DragdropPage() {
  return (
    <Wrapper>
      <Drop id="drop1" style={dropStyle}>
        <Drag id="drag1" style={{ margin: "8px" }}>
          <Item>item 1</Item>
        </Drag>
        <Drag id="drag2" style={{ margin: "8px" }}>
          <Item>item 2</Item>
        </Drag>
      </Drop>
      <Drop id="drop2" style={dropStyle}>
        <Drag id="drag3" style={{ margin: "8px" }}>
          <Item>item 3</Item>
        </Drag>
      </Drop>
    </Wrapper>
  );
}
