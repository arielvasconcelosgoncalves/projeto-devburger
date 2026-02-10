import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DetailsContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px #000;
  background-color: #fff;
  padding: 20px;
  .divButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttonPix {
    margin-top: 20px;
    background-color: #975ba6;
    padding: 10px;
    border-radius: 20px;
    height: 5vh;
    font-size: 20px;
    text-align: center;
  }
`;
