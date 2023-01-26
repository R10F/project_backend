import { Produk } from "./Produk";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export const Toko = (props) => {
  const toko = props.toko;
  const [reRender, setReRender] = props.stateReRender;

  const deleteTokoHandler = async () => {
    const id = "toko-" + toko._id;
    const productContainer = document.getElementById(id).children[1];

    let idsToko  = toko._id;
    let idsProduk = [];
    Array.from(productContainer.children).forEach((element) => {
      idsProduk.push(element.dataset.id);
    });

    fetch("http://localhost:8080/hapus-produk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idsToko, idsProduk }),
    }).then(() => {
      setReRender(reRender + 1);
    });
  }
  
  const localCheckTokoHandler = async(e) => {
    const productContainer = e.target.parentNode.nextSibling;
    //classname =  product-container

    Array.from(productContainer.children).forEach((element) => {
      const input = element.getElementsByTagName("input")[0];
      if (e.target.checked) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
    await props.checkTokoHandler(e);
  }
  return (
    <>
      <div
        className="card garis rounded-3 mb-4 shadow-sm"
        id={"toko-" + toko._id}
      >
        <div className="d-flex w-100 align-items-center p-3">
          <input
            type="checkbox"
            className="checkbox me-3 mb-2 cekToko"
            defaultChecked={toko.check}
            data-for="toko"
            data-id={toko._id}
            onChange={localCheckTokoHandler}
          />
          <div className="me-auto">
            <b>{toko.nama}</b>
            <p className="mb-0">{toko.kota}</p>
          </div>
          <div>
            <button type="button" className="btn btn-link" onClick={deleteTokoHandler}>
              <FiTrash2/>
            </button>
          </div>
        </div>

        <div className="product-container">
          {toko.produk.map((produk) => {
            return (
              <Produk
                key={produk._id}
                idToko={toko._id}
                produk={produk}
                stateRingkasanBelanja={props.stateRingkasanBelanja}
                stateReRender={props.stateReRender}
                checkProdukHandler={props.checkProdukHandler}
                updateRingkasanBelanja = {props.updateRingkasanBelanja}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
