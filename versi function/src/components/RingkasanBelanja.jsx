import { currency } from "../utils/utils";

export const RingkasanBelanja = (props) => {
  const totalQty = props.totalQty;
  const hargaTotal = props.hargaTotal;
  const hargaDiskon = props.hargaDiskon;

  return (
    <div className="card p-3">
      <h3 className="fs-5">Ringkasan Belanja</h3>

      <p className="d-flex justify-content-between">
        <span>Total Harga ({totalQty} barang)</span>
        <span>{currency(hargaTotal)}</span>
      </p>

      <p className="d-flex justify-content-between">
        <span>Total Diskon Barang</span>
        <span>{currency(hargaDiskon)}</span>
      </p>

      <p className="d-flex justify-content-between mb-0">
        <span>Total Harga</span>
        <span>{currency(hargaTotal - hargaDiskon)}</span>
      </p>

      <br />
      <button
        type="button"
        className="btn btn-success"
        disabled={totalQty === 0}
      >
        Beli ({totalQty})
      </button>
    </div>
  );
};
