import { Produk } from "./Produk";

export const Toko = (props) => {
  const toko = props.toko;
  const stateReRender = props.stateReRender;
  const stateRingkasanBelanja = props.stateRingkasanBelanja;
  const stateHargaTotal = props.stateHargaTotal;
  const stateHargaDiskon = props.stateHargaDiskon;
  const checkTokoHandler = props.checkTokoHandler;
  const checkProdukHandler = props.checkProdukHandler;

  return (
    <>
      <div className="card garis rounded-3 mb-4 shadow-sm" id={"toko-" + toko._id}>
        <div className="d-flex w-100 align-items-center p-3">
          <input
            type="checkbox"
            className="checkbox me-3 mb-2 cekToko"
            defaultChecked={toko.check}
            data-for="toko"
            data-id={toko._id}
            onChange={checkTokoHandler}
          />
          <div className="m-0">
            <b>{toko.nama}</b>
            <p className="m-0">{toko.kota}</p>
          </div>
        </div>

        <div className="product-container">
          {toko.produk.map((produk) => {
            return (
              <Produk
                key={produk._id}
                idToko={toko._id}
                produk={produk}
                stateRingkasanBelanja={stateRingkasanBelanja}
                // stateHargaTotal={stateHargaTotal}
                // stateHargaDiskon={stateHargaDiskon}
                stateReRender={stateReRender}
                checkProdukHandler={checkProdukHandler}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
