import { NavLink, NavLinkContainer, Container, Footer } from "./styles.js";
import { navLinks } from "./navLinks.jsx";
import Logo from "../../assets/img/Logo.svg";
import { useUser } from "../../hooks/UserContext.jsx";
import { useLocation } from "react-router-dom";

export function SideNavAdmin() {
  const { logout } = useUser();
  const { pathname } = useLocation();
  return (
    <Container>
      <img src={Logo} alt="Hamburguer Logo DevBurger" />
      <NavLinkContainer>
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            $isActive={pathname === link.path}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onClick={logout}>
          {/* <SignOut /> */}
          <p>Sair</p>
        </NavLink>
      </Footer>
    </Container>
  );
}
