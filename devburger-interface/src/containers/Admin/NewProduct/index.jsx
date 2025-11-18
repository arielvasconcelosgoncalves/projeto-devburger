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
  ContainerCheckBox
} from "./styles.js";
import { useState, useEffect } from "react";
import { api } from "../../../services/api.js";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

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
    file: yup
      .mixed()
      .test("required", "Escolha um arquivo para continuar", (value) => {
        return value && value.length > 0;
      })
      .test("fileSize", "Carregue arquivos até 3mb", (value) => {
        return value && value.length && value[0].size <= 3 * 1024 * 1024;
      })
      .test("type", "Carregue apenas imagens PNG ou JPEG", (value) => {
        return (
          value &&
          value.length &&
          (value[0].type === "image/jpeg" || value[0].type === "image/png")
        );
      }),
  })
  .required();

export function NewProduct() {
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
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const productFormData = new FormData();
    productFormData.append("name", data.name);
    productFormData.append("price", data.price * 100);
    productFormData.append("category_id", data.category.id);
    productFormData.append("file", data.file[0]);
    productFormData.append("offer", data.offer);
    

    await toast.promise(api.post("/products", productFormData), {
      pending: "Cadastrando novo produto...",
      success: "Produto cadastrado com sucesso!",
      error: "Erro ao adicionar o produto",
    });

    setTimeout(()=>{
        navigate('/admin/products')
    }, 2000)
    
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>
        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" {...register("price")} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>
        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              {...register("file")}
              accept="image/png, image/jpeg"
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register("file").onChange(value);
              }}
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
                <input type="checkbox" {...register("offer")} />
                <Label>Produto em Oferta?</Label>
            </ContainerCheckBox>
        </InputGroup>

        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
