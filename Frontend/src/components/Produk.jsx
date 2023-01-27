import { useState } from "react";
import { currency } from "../utils/utils";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export const Produk = (props) => {
  const produk = props.produk;
  const idToko = props.idToko;
  const [reRender, setReRender] = props.stateReRender;
  const checkProdukHandler = props.checkProdukHandler;
  const updateRingkasanBelanja = props.updateRingkasanBelanja;

  const minQty = 1;
  const maxQty = 7;

  const [qty, setQty] = useState(produk.qty);
  const [isChecked, setIsChecked] = useState(produk.check);
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState(produk.note);

  const changeByButtonHandler = (count) => {
    const newQty = qty + count;
    setQty(newQty);
    updateQtyHandler(newQty, count);
  };

  const inputHandler = (e) => {
    let newQty = e.target.value;
    if (newQty < 1 || newQty > 7) return;
    if (newQty === "") newQty = 1;
    updateQtyHandler(newQty, newQty - qty);
    setQty(newQty);
  };

  const updateQtyHandler = async (newQty, increment) => {
    fetch(`http://localhost:8080/api/v1/editProduk/${produk._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: newQty }),
    })
      .then((res) => res.json())
      .then((update) => {
        const id = "produk-" + produk._id;
        const isChecked = document.getElementById(id).children[0].checked;
        if (isChecked === true) {
          updateRingkasanBelanja(
            update.harga * increment,
            (update.diskon * update.harga * increment) / 100,
            increment
          );
        }
      });
  };

  const handleButtonClick = () => {
    setIsInput(true);
  };

  const handleInputChange = () => {
    setInputValue(inputValue);
  };

  const addNote = (e) => {
    if (e.key === "Enter") {
      setIsInput(false);
      let noteProduk = document.querySelector("#note").value;

      setInputValue(noteProduk);

      fetch(`http://localhost:8080/api/v1/editProduk/${produk._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note: noteProduk,
        }),
      });
    }
  };

  const localCheckProdukHandler = async (e) => {
    setIsChecked(e.target.checked);
    await checkProdukHandler(e);
  };

  const deleteProdukHanlder = async () => {
    const productContainer = document.querySelector(
      `#toko-${idToko} .product-container`
    );

    const idsToko = productContainer.childElementCount === 1 ? [idToko] : [];
    const idsProduk = [produk._id];

    fetch("http://localhost:8080/api/v1/hapus-produk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idsToko, idsProduk }),
    }).then(() => {
      setReRender(reRender + 1);
    });
  };

  return (
    <>
      <div
        className="d-flex flex-row card rounded-3 mb-2 p-3"
        id={"produk-" + produk._id}
      >
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={produk.check}
          data-for="produk"
          data-id={produk._id}
          onChange={localCheckProdukHandler}
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
                  <small className="text-muted text-decoration-line-through">
                    {currency(produk.harga)}
                  </small>
                  <p className="d-inline-block fs-4 text-danger ms-2 mb-0">
                    {currency(produk.harga * (1 - produk.diskon / 100))}
                  </p>
                  <p>Harga Grosir</p>
                </>
              ) : (
                <p className="mb-0 fs-4">{currency(produk.harga)}</p>
              )}
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="product-note p-2">
              {isInput ? (
                <textarea
                  className="form-control"
                  placeholder="Pastikan Tidak Mengandung data pribadi"
                  id="note"
                  onKeyDown={addNote}
                  onChange={handleInputChange}
                  maxLength="144"
                  autoFocus
                >
                  {inputValue
                    ? inputValue
                    : produk.note !== ""
                    ? ""
                    : inputValue}
                </textarea>
              ) : (
                <div className="d-flex flex-row mb-3">
                  <div className="p-2">
                    <p className="m-0 noteProduk">
                      {inputValue
                        ? inputValue
                        : produk.note !== ""
                        ? ""
                        : inputValue}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none text-success p-0 text-start"
                      onClick={handleButtonClick}
                    >
                      {inputValue
                        ? "Ubah"
                        : produk.note !== ""
                        ? "Tulis Catatan"
                        : "Tulis Catatan"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="qty-wrapper d-flex align-items-center p-2">
              <button className="btn btn-link" onClick={deleteProdukHanlder}>
                <FiTrash2 />
              </button>

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
