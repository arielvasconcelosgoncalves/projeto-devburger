import { useContext, createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const putProductInCart = (product) => {
    const cartIndex = cartProducts.findIndex((prod) => prod.id === product.id);

    let newProductsInCart = [];
    if (cartIndex >= 0) {
      newProductsInCart = cartProducts;
      newProductsInCart(cartProducts).quantity =
        newProductsInCart(cartProducts).quantity + 1;

      setCartProducts(newProductsInCart);
      updateLocalStorage(newProductsInCart);
    } else {
      product.quantity = 1;
      newProductsInCart = [...cartProducts, product];
      setCartProducts(newProductsInCart);
      updateLocalStorage(newProductsInCart);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    updateLocalStorage([]);
  };

  const deleteProduct = (productId) => {
    const newCart = cartProducts.filter((prod) => prod.id !== productId);

    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const increaseProduct = (productId) => {
    const newCart = cartProducts.map((prod) => {
      return prod.id === productId
        ? { ...prod, quantity: prod.quantity + 1 }
        : prod;
    });
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const decreaseProduct = (productId) => {
    const cartIndex = cartProducts.findIndex((prod) => prod.id === productId);
    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((prod) => {
        return prod.id === productId
          ? { ...prod, quantity: prod.quantity - 1 }
          : prod;
      });
      setCartProducts(newCart);
      updateLocalStorage(newCart);
    } else {
      deleteProduct(productId);
    }
  };

  const updateLocalStorage = (products) => {
    localStorage.setItem("devburger:cartInfo", JSON.stringify(products));
  };

  useEffect(() => {
    const clientCartData = localStorage.getItem("devburger:cartInfo");

    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
    }
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProduct,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a context");
  }
  return context;
};
