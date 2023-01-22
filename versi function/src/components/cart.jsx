import useFetch from "../useFetch";
import { CartPerProduct } from "./CartPerProduct";

export const Cart = () => {
  const { data } = useFetch(" http://localhost:8080/produk");

  const generateProduk = () => {};
  return (
    <main>
      <>
        <article className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100 p-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>

            <div className="alert alert-warning">
              Oops, shopping cart is empty! &nbsp;
              <button
                className="btn btn-success"
                style={{ fontWeight: 500 }}
                onClick={generateProduk}
              >
                Add something to your cart !
              </button>
            </div>
            {data && <CartPerProduct data={data} />}
          </div>
        </article>
      </>
    </main>
  );
};
