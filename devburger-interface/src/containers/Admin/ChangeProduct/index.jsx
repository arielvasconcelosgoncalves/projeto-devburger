import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImageIcon } from "@phosphor-icons/react";
import {
  Container,
  Label,
  Form,
  Input,
  InputGroup,
  LabelUpload,
  Select,
  SubmitButton,
  ErrorMessage,
  ContainerCheckBox,
} from "./styles.js";
import { useState, useEffect } from "react";
import { api } from "../../../services/api.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Digite o nome do produto"),
    price: yup
      .number()
      .positive()
      .required("Digite o preço do produto")
      .typeError("Digite o preço do produto"),
    category: yup.object().required("Escolha uma categoria"),
    offer: yup.bool(),
  })
  .required();

export function ChangeProduct() {
  const {
    state: { product },
  } = useLocation();

  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("categories");
      setCategories(data);
    }
    loadCategories();
  }, []);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append("name", data.name);
    productFormData.append("price", data.price * 100);
    productFormData.append("category_id", data.category.id);
    productFormData.append("offer", data.offer ? "true" : "false");

    if (data.file && data.file.length > 0) {
      productFormData.append("file", data.file[0]);
    }

    console.log("📤 FORM DATA ENVIADO:");
    for (let pair of productFormData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await api.put(
        `/products/${product.id}`,
        productFormData
      );

      console.log("📥 RESPOSTA BACKEND:", response.data);
      toast.success("Produto editado com sucesso!");
      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (error) {
      console.log("❌ ERRO DETALHADO:", error.response?.data || error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Erro desconhecido ao editar"
      );
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register("name")}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register("price")}
            defaultValue={product.price / 100}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <Controller
              name="file"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    field.onChange(e.target.files); // salva o FileList
                    setFileName(e.target.files[0]?.name);
                  }}
                />
              )}
            />
            {fileName || "Upload do Produto"}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckBox>
            <input
              type="checkbox"
              defaultChecked={product.offer}
              {...register("offer")}
            />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckBox>
        </InputGroup>

        <SubmitButton>Alterar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
