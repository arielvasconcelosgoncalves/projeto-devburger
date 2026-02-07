import styled from "styled-components";

export const OptionsDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  margin-top: 30px;
`;

export const Container = styled.div`
  height: 100vh;
`;
