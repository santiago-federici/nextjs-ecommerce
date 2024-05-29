export function useDbCartOperations() {
  const API_URL = "http://localhost:3000/api/cart";

  const apiFetch = async (
    operationRoute: string,
    options: { prodId?: number; userId?: string; stock?: number }
  ) => {
    try {
      const res = await fetch(`${API_URL}/${operationRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ options }),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQuantityDb = async (
    prodId: number,
    userId: string,
    stock: number
  ) => {
    const operationRoute = "increase-quantity";
    return await apiFetch(operationRoute, { prodId, userId, stock });
  };

  const decreaseQuantityDb = async (prodId: number, userId: string) => {
    const operationRoute = "decrease-quantity";
    return await apiFetch(operationRoute, { prodId, userId });
  };

  const removeProdDb = async (prodId: number, userId: string) => {
    const operationRoute = "remove-product";
    return await apiFetch(operationRoute, { prodId, userId });
  };

  const clearCartDb = async (userId: string) => {
    const operationRoute = "clear-cart";
    return await apiFetch(operationRoute, { userId });
  };

  return {
    increaseQuantityDb,
    decreaseQuantityDb,
    removeProdDb,
    clearCartDb,
  };
}
