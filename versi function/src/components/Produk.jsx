import { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export const Produk = (props) => {
  const produk = props.produk;
  const currency = props.currency;
  const [hargaTotal, setHargaTotal] = props.stateHargaTotal;
  const checkProdukHandler = props.checkProdukHandler;

  const minQty = 1;
  const maxQty = 7;

  const [qty, setQty] = useState(produk.qty);

  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: newQty }),
    }).then(() => {
      const hargaBersih = produk.harga * (1 - produk.diskon / 100);
      const subTotal = delta * hargaBersih;
      setHargaTotal(hargaTotal + subTotal);
    });
  };

  const klikBtn = () => {
    setIsInput(true);
  };

  const addNote = (e) => {
    if (e.key === "Enter") {
      setIsInput(false);
      let noteProduk = document.querySelector("#note").value;
      setInputValue(noteProduk);

      fetch(`http://localhost:8080/api/editProduk/${produk._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note: noteProduk,
        }),
      })
        .then((resp) => {
          resp.json();
        })
        .then((data) => {});
    }
    console.log(produk.note);
  };

  return (
    <>
      <div className="d-flex flex-row card rounded-3 mb-2 p-3">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={produk.check}
          data-for="produk"
          data-id={produk._id}
          onChange={checkProdukHandler}
        />

        <div className="d-flex flex-column flex-fill">
          <div className="d-flex flex-row">
            <div className="p-2">
              <img
                className="product-img rounded-1"
                src={produk.gambar}
                alt={produk.nama}
              />
            </div>

            <div>
              <p className="m-0">{produk.nama}</p>
              {produk.diskon > 0 ? (
                <>
                  <p className="fs-4 text-danger mb-0">
                    {currency(produk.harga * (1 - produk.diskon / 100))}
                  </p>
                  <small className="text-muted text-decoration-line-through">
                    {currency(produk.harga)}
                  </small>
                  <p>Harga Grosir</p>
                </>
              ) : (
                <p className="mb-0 fs-4">{currency(produk.harga)}</p>
              )}
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row align-items-end">
            {/* <button className="btn text-danger fs-5" data-id={p._id} onClick={deleteProdukHanlder}><FiTrash2 /></button> */}
            <div className="me-auto p-2">
              {isInput ? (
                // <form action="#" onSubmit={addNote} className="mt-3">
                //   <input
                //     type="text"
                //     class="form-control"
                //     id="note"
                //     placeholder="pastikan tidak ada data pribadi"
                //     aria-describedby="basic-addon1"
                //   ></input>
                // </form>
                <textarea
                  className="form-control"
                  placeholder="Pastikan Tidak Mengandung data pribadi"
                  id="note"
                  onKeyDown={addNote}
                ></textarea>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none text-success p-0 text-start"
                    onClick={klikBtn}
                  >
                    Tulis Catatan
                  </button>
                  <p className="m-0">{produk.note || inputValue}</p>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center p-2">
              {/* button trash */}
              {/* <button className="btn btn-link">
                <FiTrash2 />
              </button> */}
              <button
                className="btn btn-link px-2"
                disabled={qty <= minQty ? true : false}
                onClick={() => {
                  changeByButtonHandler(-1);
                }}
              >
                <FiMinus />
              </button>

              <input
                id="quantity"
                min={minQty}
                max={maxQty}
                value={qty}
                type="number"
                className="form-control form-control-sm h-25"
                onChange={inputHandler}
              />

              <button
                className="btn btn-link px-2"
                disabled={qty >= maxQty ? true : false}
                onClick={() => {
                  changeByButtonHandler(1);
                }}
              >
                <FiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
