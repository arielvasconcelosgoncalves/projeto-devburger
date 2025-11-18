import {
  Container,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
} from "./styles.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, userInfo } = useUser();

  function logoutUser() {
    logout();
    navigate("/login");
  }
  return (
    <Container>
      <Navigation>
        <div>
          <HeaderLink to="/" $isActive={pathname === "/"}>
            Home
          </HeaderLink>
          <hr></hr>
          <HeaderLink to="/menu" $isActive={pathname === "/menu"}>
            Cardápio
          </HeaderLink>
        </div>
      </Navigation>
      <Options>
        <Profile>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            Olá, <span>{userInfo.name}</span>
          </div>
          <Logout onClick={() => logoutUser()}>Sair</Logout>
        </Profile>
        <LinkContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
          </svg>

          <HeaderLink to="/cart">Carrinho</HeaderLink>
        </LinkContainer>
      </Options>
    </Container>
  );
}
