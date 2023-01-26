import { Produk } from "./Produk";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export const Toko = (props) => {
  const toko = props.toko;
  const [reRender, setReRender] = props.stateReRender;
  const [isChecked, setIsChecked] = useState(toko.check);
  
  const deleteTokoHandler = (e) => {
    console.log(e.target.dataset.id);
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
    })
    setIsChecked(e.target.checked);
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
            {isChecked === true ?
              <button className="btn btn-link" onClick={deleteTokoHandler}>
                <FiTrash2/>
              </button> : 
              <div />
            }
            
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
