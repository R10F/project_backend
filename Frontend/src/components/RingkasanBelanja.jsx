import { currency } from "../utils/utils";

export const RingkasanBelanja = (props) => {
  const ringkasanBelanja = props.ringkasanBelanja;

  let totalQty = ringkasanBelanja.totalQty;
  let hargaTotal = ringkasanBelanja.hargaTotal;
  let hargaDiskon = ringkasanBelanja.hargaDiskon;

  return (
    <div className="ringkasan-belanja card p-3 position-sticky">
      <h3 className="fs-5">Ringkasan Belanja</h3>

      <p className="d-flex justify-content-between">
        <span>Total Harga ({totalQty} barang)</span>
        <span>{currency(hargaTotal)}</span>
      </p>

      <p className="d-flex justify-content-between">
        <span>Total Diskon Barang</span>
        <span>{currency(hargaDiskon)}</span>
      </p>

      <p className="d-flex justify-content-between mb-4">
        <span>Total Harga</span>
        <span>{currency(hargaTotal - hargaDiskon)}</span>
      </p>

      <button
        type="button"
        className="btn btn-success"
        disabled={totalQty === 0}
        onClick={props.shopping}
      >
        Beli ({totalQty})
      </button>
    </div>
  );
};
