import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  * {
    color: #484848;
    font-weight: 500;
  }
  .container-top {
    display: grid;
    grid-gap: 10px 30%;
    grid-template-areas:
      "title title"
      "itens itens-price"
      "deliver-tax deliver-tax-price";
  }
  .title {
    grid-area: title;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    background-color: #484848;
    color: #fff;
    width: 100%;
    padding: 15px;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .itens {
    grid-area: itens;
    padding-left: 20px;
  }
  .itens-price {
    grid-area: itens-price;
    padding-right: 20px;
  }
  .deliver-tax {
    grid-area: deliver-tax;
    padding-left: 20px;
  }

  .deliver-tax-price {
    grid-area: deliver-tax-price;
    padding-right: 20px;
  }

  .container-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    margin-top: 24px;
    padding: 20px;
    * {
      font-weight: 700;
    }
  }
`;
