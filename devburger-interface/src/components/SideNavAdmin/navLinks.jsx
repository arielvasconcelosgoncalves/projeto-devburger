import { Receipt, List, ListPlus } from "@phosphor-icons/react";

export const navLinks = [
  {
    id: 1,
    label: "Pedidos",
    path: "/admin/orders",
    icon: <Receipt />,
  },
  {
    id: 2,
    label: "Produtos",
    path: "/admin/products",
    icon: <List />,
  },
  {
    id: 3,
    label: "Cadastrar Produto",
    path: "/admin/new-product",
    icon: <ListPlus />,
  },
];
