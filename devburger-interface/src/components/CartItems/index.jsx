import { Table } from "../index.js";
import { useCart } from "../../hooks/CartContext.jsx";
import { ProductImage, ButtonGroup, EmptyCart, TrashImage } from "./styles.js";
import trashIcon from "../../assets/img/trash.svg";
import { formatPrice } from "../../utils/formatPrice.js";

export function CartItems() {
  const { cartProducts, decreaseProduct, increaseProduct, deleteProduct } =
    useCart();
  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Header>
      <Table.Body>
        {cartProducts?.length ? (
          cartProducts.map((product) => {
            return (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <ProductImage src={product.url} alt={product.name} />
                </Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.currencyValue}</Table.Td>
                <Table.Td>
                  <ButtonGroup>
                    <button onClick={() => decreaseProduct(product.id)}>
                      -
                    </button>
                    {product.quantity}
                    <button onClick={() => increaseProduct(product.id)}>
                      +
                    </button>
                  </ButtonGroup>
                </Table.Td>
                <Table.Td>
                  <p style={{ fontWeight: "bold" }}>
                    {formatPrice(product.quantity * product.price)}
                  </p>
                </Table.Td>
                <Table.Td>
                  <TrashImage
                    src={trashIcon}
                    alt="lixeira"
                    onClick={() => deleteProduct(product.id)}
                  ></TrashImage>
                </Table.Td>
              </Table.Tr>
            );
          })
        ) : (
          <EmptyCart>Carrinho Vazio</EmptyCart>
        )}
      </Table.Body>
    </Table.Root>
  );
}
