import {
  fetchProducts,
  fetchProductOwners,
  fetchProductById,
  fetchProductsByType,
  fetchProductOwnersByType,
  fetchProductsByUserId,
  addProduct,
  addProductOwner,
  updateProduct,
  updateProductOwner,
} from "../api/productApi";
import { Product, ProductOwner } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  return await fetchProducts();
};

export const getProductOwners = async (): Promise<ProductOwner[]> => {
  return await fetchProductOwners();
};

export const getProductById = async (id: string): Promise<Product> => {
  return await fetchProductById(id);
};

export const getProductsByOwnerAndType = async (
  owner: string,
  type: string,
): Promise<Product[]> => {
  return await fetchProductsByType(owner, type);
};

export const getProductOwnersByType = async (
  type: string,
): Promise<ProductOwner[]> => {
  return await fetchProductOwnersByType(type);
};

export const getProductsByUserId = async (): Promise<Product[]> => {
  return await fetchProductsByUserId();
};

export const addNewProduct = async (
  productData: FormData,
): Promise<Product> => {
  return await addProduct(productData);
};

export const addNewProductOwner = async (
  productOwnerData: FormData,
): Promise<ProductOwner> => {
  return await addProductOwner(productOwnerData);
};

export const updateExistingProduct = async (
  productId: string,
  productData: FormData,
): Promise<Product> => {
  return await updateProduct(productId, productData);
};

export const updateExistingProductOwner = async (
  ownerId: string,
  productOwnerData: FormData,
): Promise<ProductOwner> => {
  return await updateProductOwner(ownerId, productOwnerData);
};
