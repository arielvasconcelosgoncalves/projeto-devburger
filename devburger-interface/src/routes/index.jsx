import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Menu,
  Cart,
  NewProduct,
  ChangeProduct,
  Orders,
  Products,
} from "../containers";
import { Checkout } from "../containers/Checkout";
import { CompletePayment } from "../containers/CompletePayment";
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/orders" element={<Orders />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
        <Route path="/admin/new-product" element={<NewProduct />}></Route>
        <Route path="/admin/change-product" element={<ChangeProduct />}></Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Header />
//         <Home />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <>
//         <Header />
//         <Login />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/register",
//     element: (
//       <>
//         <Header />
//         <Register />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/menu",
//     element: (
//       <>
//         <Header />
//         <Menu />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/cart",
//     element: (
//       <>
//         <Header />
//         <Cart />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <>
//         <Header />
//         <Checkout />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "/complete-payment",
//     element: (
//       <>
//         <Header />
//         <CompletePayment />
//         <Footer />
//       </>
//     ),
//   },
// ]);
