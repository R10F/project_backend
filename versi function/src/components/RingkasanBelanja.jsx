import { currency } from "../utils/utils";
import Swal from "sweetalert2";

export const RingkasanBelanja = (props) => {
  const ringkasanBelanja = props.ringkasanBelanja;

  let totalQty = 0;
  let hargaTotal = 0;
  let hargaDiskon = 0;
  Object.values(ringkasanBelanja).forEach((item) => {
    console.log(item);
    if (item.isChecked) {
      totalQty += Number(item.qty);
      hargaTotal += Number(item.harga) * Number(item.qty);
      hargaDiskon +=
        (Number(item.harga) * Number(item.qty) * Number(item.diskon)) / 100;
    }
  });

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
