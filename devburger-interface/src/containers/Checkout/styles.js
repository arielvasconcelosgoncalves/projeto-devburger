import styled from "styled-components";
import Background from "../../assets/img/background.svg";

export const OptionsDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-image: url(${Background});
`;
export const ButtonPayment = styled.button`
  background-color: #975ba6;
  height: 10vh;
  width: 15vw;
  font-size: 28px;
  border-radius: 30px;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.4;
  }
`;

export const Title = styled.h2`
  padding-top: 30px;
  .text {
    background-color: #fff;
  }
`;

export const Container = styled.div`
  height: 100vh;
  background-image: url(${Background});
`;
