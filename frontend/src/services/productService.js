import api from './api';

export const getProducts = async (search = '', category = '', page = 1, limit = 8) => {
  const params = { page, limit };
  if (search) params.search = search;
  if (category) params.category = category;
  const { data } = await api.get('/products', { params });
  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post('/products', product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createProductReview = async (productId, review) => {
  const { data } = await api.post(`/products/${productId}/reviews`, review);
  return data;
};
