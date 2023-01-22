import { useState } from "react";
// import useFetch from "../useFetch";
import { FiPlus, FiMinus } from "react-icons/fi";
export const CartPerProduct = () => {
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

      <div className="toko mt-3">
        <div className="d-flex flex-row mb-3">
          <div className="p-2">
            <input type="checkbox" name="cekToko" id="cekToko" />
          </div>
          <div className="p-2">
            <h3>Nama Toko</h3>
          </div>
        </div>

        <>
          <div className="d-flex flex-row mb-3">
            <div className="p-2">
              <input type="checkbox" name="cekToko" id="cekToko" />
            </div>
            <div className="p-2">
              <img
                src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/8/c8158a70-3b3b-4e8a-ad8e-ac154c63251e.jpg"
                alt=""
                width={"75px"}
              />
            </div>
            <div className="p-2">
              <h5>Frisian Flag Milky Susu UHT Chocolate 115ml [12 pcs]</h5>
              <p>Rp 35.000</p>
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
                    value={qty}
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
        </>
      </div>
    </>
  );
};
