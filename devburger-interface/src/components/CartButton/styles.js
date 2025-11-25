import styled from "styled-components";

export const ContainerButton = styled.button`
  background-color: #975ba6;
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 5px;
  font-size: 30px;
  color: #fff;

  &:hover {
    background-color: #6f357c;
  }
  &:active {
    background-color: #4b244f;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 5px;
  gap: 12px;
  div {
    width: 100%;
    height: 52px;
    background: #975ba6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    font-size: 30px;
    color: #fff;
    border-radius: 4px;
    background-color: #9758a6;
    transition: all 0.4;
    border: none;
    &:hover {
      background-color: #6f357c;
    }
  }
  h3 {
    color: #fff;
    font-size: 30px;
  }
`;
