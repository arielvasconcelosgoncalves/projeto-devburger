import styled from "styled-components";
import Select from "react-select";

export const ProductImage = styled.img`
  height: 80px;
  padding: 12px;
  border-radius: 16px;
`;

export const SelectStatus = styled(Select)`
  width: 240px;
`;

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 50px;
`

export const FilterOptions = styled.button`
    cursor: pointer;
    background: none;
    font-size: 18px;
    line-height: 20px;
    border: none;
    color: ${(props)=> props.$isActiveStatus ? props.theme.purple : props.theme.darGray};
    border-bottom: ${(props)=> props.$isActiveStatus ? `2px solid ${props.theme.purple}` : `none`};
    padding-bottom: 5px;
`
