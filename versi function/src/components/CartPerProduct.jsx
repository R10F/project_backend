import { useState } from "react";
// import useFetch from "../useFetch";
import { FiPlus, FiMinus } from "react-icons/fi";
export const CartPerProduct = ({ data }) => {
  let [qty, setQty] = useState(1);

  let handlechange = () => {
    setQty(qty);
  };

  const handleInput = (e) => {
    let newQty = e.target.value;
    if (newQty <= 0 && newQty !== "") return;
    if (newQty === "") newQty = 0;
    setQty(e.target.value);
  };
  return (
    <>
      <div className="d-flex flex-row mb-3">
        <div className="p-2">
          <input type="checkbox" name="cekAll" id="cekAll" />
        </div>
        <div className="p-2">
          <h3>Pilih Semua</h3>
        </div>
      </div>
      <div id="garis"></div>

      {data.map((toko) => {
        return (
          <div className="toko mt-3">
            <div className="d-flex flex-row mb-3" data-key={toko._id}>
              <div className="p-2">
                <input type="checkbox" name="cekToko" id="cekToko" />
              </div>
              <div className="p-2" key={toko._id}>
                <h3>{toko.nama}</h3>
              </div>
            </div>

            <div className="produk">
              {toko.produk.map((produk) => {
                console.log(produk);
                return (
                  <div className="d-flex flex-row mb-3" data-key={produk._id}>
                    <div className="p-2">
                      <input type="checkbox" name="cekToko" id="cekToko" />
                    </div>
                    <div className="p-2">
                      <img src={produk.gambar} alt="" width={"75px"} />
                    </div>
                    <div className="p-2">
                      <h5>{produk.nama}</h5>
                      <p>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(produk.harga)}
                      </p>
                    </div>
                    <div className="col-md-2 d-flex align-items-center my-2">
                      <div className="d-flex flex-column">
                        <div className="d-flex">
                          <button
                            className="btn btn-link px-2"
                            disabled={qty <= 1 ? 1 : 0}
                            onClick={() => {
                              // this.props.addToCart(this.props.productDetail.id, -1);
                              handlechange();
                            }}
                          >
                            <FiMinus />
                          </button>

                          <input
                            id="quantity"
                            min="1"
                            max="7"
                            value={produk.qty}
                            type="number"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                          />

                          <button
                            className="btn btn-link px-2"
                            onClick={() => {
                              // this.props.addToCart(this.props.productDetail.id, 1);
                              handlechange();
                            }}
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="garis"></div>
          </div>
        );
      })}
    </>
  );
};
