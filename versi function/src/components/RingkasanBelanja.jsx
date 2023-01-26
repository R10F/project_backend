import { currency } from "../utils/utils";
import Swal from "sweetalert2";

export const RingkasanBelanja = (props) => {
  const ringkasanBelanja = props.ringkasanBelanja;

  let totalQty = ringkasanBelanja.totalQty;
  let hargaTotal = ringkasanBelanja.hargaTotal;
  let hargaDiskon = ringkasanBelanja.hargaDiskon;

  // let totalQty = 0;
  // let hargaTotal = 0;
  // let hargaDiskon = 0;
  // Object.values(ringkasanBelanja).forEach((item) => {
  //   if (item.isChecked) {
  //     totalQty += item.qty;
  //     hargaTotal += item.harga * item.qty;
  //     hargaDiskon += (item.harga * item.qty * item.diskon) / 100;
  //   }
  // });

  const btnBuy = () => {
    Swal.fire({
      icon: "success",
      title: "Terima kasih sudah Berbelanja di toko kami",
    });
  };

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

      <p className="d-flex justify-content-between mb-4">
        <span>Total Harga</span>
        <span>{currency(hargaTotal - hargaDiskon)}</span>
      </p>

      <button
        type="button"
        className="btn btn-success"
        disabled={totalQty === 0}
        onClick={btnBuy}
      >
        Beli ({totalQty})
      </button>
    </div>
  );
};
