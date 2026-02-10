import styled from "styled-components";
import Background from "../../assets/img/background.svg";

export const Container = styled.div`
  height: 100vh;
  background-image: url(${Background});
  #payment-status {
    border: solid 1px #000;
    background-color: #fff;
  }
`;
