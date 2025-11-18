import styled from "styled-components";
import bannerMenu from "../../assets/img/bannerMenu.svg";
import Background from "../../assets/img/background.svg";
import { Link } from "react-router-dom";
import backArrow from "../../assets/img/back.svg";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("${Background}");
`;

export const Banner = styled.div`
  background: url("${bannerMenu}");
  background-position: center;
  background-color: #1f1f1f;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 480px;
  width: 100%;
  position: relative;

  h1 {
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: #fff;
    position: absolute;
    right: 20%;
    top: 30%;
  }
  span {
    display: block;
    color: #fff;
    font-size: 20px;
  }
`;

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  justify-content: center;
  max-width: 1280px;
  gap: 60px;
  margin: 50px auto;
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  background: none;
  color: ${(props) => (props.$isActiveCategory ? "#9758a6" : "#696969")};
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 5px;
  line-height: 20px;
  border: none;
  border-bottom: ${(props) => props.$isActiveCategory && "3px solid #9758a6"};
`;

export const Back = styled.button`
  width: 80px;
  height: 80px;
  background: url("${backArrow}");
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  position: relative;
  top: 50px;
  left: 50px;
`;
