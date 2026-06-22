import api from './api';

export const placeOrder = async (shippingAddress) => {
  const { data } = await api.post('/orders', { shippingAddress });
  return data;
};

export const getOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

export const getOrder = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data;
};
