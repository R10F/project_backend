import { Produk } from "./Produk";

export const Toko = (props) => {
  const toko = props.toko;
  const currency = props.currency;
  const stateHargaTotal = props.stateHargaTotal;
  const checkTokoHandler = props.checkTokoHandler;
  const checkProdukHandler = props.checkProdukHandler;

  return <>
    <div className="card garis rounded-3 mb-4">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={toko.check}
          data-for="toko"
          data-id={toko._id}
          onChange={checkTokoHandler}
        />
        <div>
          <b>{toko.nama}</b>
          <p>{toko.kota}</p>
        </div>
      </div>

      <div className="product-container">
        {toko.produk.map(produk => {
          return <Produk
            key={produk._id}
            produk={produk}
            currency={currency}
            stateHargaTotal={stateHargaTotal}
            checkProdukHandler={checkProdukHandler}
          />
        })}
      </div>
    </div>
  </>;
}