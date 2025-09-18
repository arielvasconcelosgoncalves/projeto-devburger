import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

export const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
};

export default AppProvider;
