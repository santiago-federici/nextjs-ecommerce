export function useDbCartOperations() {
  const increaseQuantityDb = async (
    prodId: number,
    userId: string,
    stock: number
  ) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/cart/increase-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prodId, userId, stock }),
        }
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantityDb = async (prodId: number, userId: string) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/cart/decrease-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prodId, userId }),
        }
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const removeProdDb = async (prodId: number, userId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/remove-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prodId, userId }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const clearCartDb = async (userId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/clear-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    increaseQuantityDb,
    decreaseQuantityDb,
    removeProdDb,
    clearCartDb,
  };
}
