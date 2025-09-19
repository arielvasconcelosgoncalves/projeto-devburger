import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Row } from "./row";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { orderStatusOptions } from "./orderStatus";
import { Filter, FilterOptions } from "./styles.js";

export function Orders() {
  const [orders, setOrders] = useState([]); //BACKUP
  const [filteredOrders, setFilteredOrders] = useState([]); //OS VALORES QUE ESTÃO NA TELA
  const [rows, setRows] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get("orders");
      setOrders(data);
    }
    loadOrders();
  }, []);

  function createData(orders) {
    return {
      name: orders.user.name,
      orderId: orders._id,
      date: orders.createdAt,
      status: orders.status,
      products: orders.products,
    };
  }

  useEffect(() => {
    const newRows = filteredOrders.map((order) => {
      return createData(order);
    });
    setRows(newRows);
  }, [filteredOrders]);

  useEffect(() => {
    if (activeStatus === 0) {
      setFilteredOrders(orders);
    } else {
      const statusIndex = orderStatusOptions.findIndex(
        (item) => item.id === activeStatus
      );

      const newFilteredOrders = orders.filter(
        (order) => order.status === orderStatusOptions[statusIndex].value
      );
      setFilteredOrders(newFilteredOrders);
    }
  }, [orders]);

  function handleStatus(status) {
    if (status.id === 0) {
      setFilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setFilteredOrders(newOrders);
    }
    setActiveStatus(status.id);
  }

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOptions
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
          </FilterOptions>
        ))}
        ;
      </Filter>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
