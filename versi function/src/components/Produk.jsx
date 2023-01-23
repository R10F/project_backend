import { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export const Produk = (props) => {
  const produk = props.produk;
  const currency = props.currency;
  const [hargaTotal, setHargaTotal] = props.stateHargaTotal;
  const checkProdukHandler = props.checkProdukHandler;

  const minQty = 1;
  const maxQty = 7;
  const hargaProduk = produk.harga * (1 - produk.diskon / 100);

  const [qty, setQty] = useState(produk.qty);

  const changeByButtonHandler = (count) => {
    const newQty = qty + count;
    setQty(newQty);
    updateQtyHandler(newQty, count);
  };

  const inputHandler = (e) => {
    let newQty = e.target.value;
    if (newQty < 1 || newQty > 7) return;
    if (newQty === "") newQty = 1;
    setQty(newQty);
    updateQtyHandler(newQty, newQty - qty);
  };

  const updateQtyHandler = (newQty, delta) => {
    fetch(`http://localhost:8080/api/editProduk/${produk._id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: newQty })
    }).then(() => {
        const subTotal = delta * hargaProduk;
        setHargaTotal(hargaTotal + subTotal);
      });
  }

  return <>
    <div className="d-flex flex-row card rounded-3 mb-2">
      <input
        type="checkbox"
        class="checkbox"
        defaultChecked={produk.check}
        data-for="produk"
        data-id={produk._id}
        onChange={checkProdukHandler}
      />

      <div className="d-flex flex-column flex-fill">
        <div className="d-flex flex-row">
          <img className="product-img rounded-1" src={produk.gambar} alt={produk.nama} />
          <div>
            <p>{produk.nama}</p>
            {produk.diskon > 0 ? (
              <>
                <p className="fs-4 text-danger mb-0">{currency(produk.harga * (1 - produk.diskon / 100))}</p>
                <small className="text-muted text-decoration-line-through">{currency(produk.harga)}</small>
                <p>Harga Grosir</p>
              </>
            ) : (
              <p className="mb-0 fs-4">{currency(produk.harga)}</p>
            )}
          </div>
        </div>

        <div className="d-flex flex-row ms-auto">
          {/* <button className="btn text-danger fs-5" data-id={p._id} onClick={deleteProdukHanlder}><FiTrash2 /></button> */}

          <div className="d-flex">
            <button
              className="btn btn-link px-2"
              disabled={qty <= minQty ? true : false}
              onClick={() => { changeByButtonHandler(-1) }}
            >
              <FiMinus />
            </button>

            <input
              id="quantity"
              min={minQty}
              max={maxQty}
              value={qty}
              type="number"
              className="form-control form-control-sm"
              onChange={inputHandler}
            />

            <button
              className="btn btn-link px-2"
              disabled={qty >= maxQty ? true : false}
              onClick={() => { changeByButtonHandler(1) }}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
}