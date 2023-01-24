import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Toko } from "./Toko";
import { RingkasanBelanja } from "./RingkasanBelanja";

export const Cart = () => {
  const [toko, setToko] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [hargaDiskon, setHargaDiskon] = useState(0);

  const generateProduk = () => {
    fetch("http://localhost:8080/generate-sample-produk")
      .then((res) => res.json())
      .then((data) => {
        setToko(data);
        setReRender(reRender + 1);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/produk")
      .then((res) => res.json())
      .then((data) => {
        let tempTotalQty = 0;
        let tempHargaTotal = 0;
        let tempHargaDiskon = 0;
        data.forEach((toko) => {
          toko.produk.forEach((item) => {
            tempTotalQty += item.qty;
            tempHargaTotal += item.harga * item.qty;
            tempHargaDiskon += item.harga * item.qty * item.diskon / 100;
            if (item.check) {
            }
          });
        });
        setToko(data);
        setTotalQty(tempTotalQty);
        setHargaTotal(tempHargaTotal);
        setHargaDiskon(tempHargaDiskon);
        if (toko.length > 0) checkAllSyncHandler();
      });
  }, [reRender]);

  const checkAllHandler = async (e) => {
    const checkboxList = document.getElementsByClassName("checkbox");
    let idsToko = [];

    Array.from(checkboxList).forEach((element) => {
      if (element.dataset.for === "toko") {
        idsToko.push(element.dataset.id);
      }
      if (e.target.checked) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    console.log(idsToko);
    let promises = [];
    for (const idToko of idsToko) {
      promises.push(
        fetch(`http://localhost:8080/api/checkToko/${idToko}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            check: e.target.checked,
            toggleAll: true,
          }),
        })
      );
    }
    Promise.all(promises)
      .then(() => {
        setReRender(reRender + 1);
      })
      .catch((err) => console.log("error", err));
  };

  const checkAllSyncHandler = () => {
    const checkboxList = document.getElementsByClassName("checkbox");

    let count = 0;
    Array.from(checkboxList).forEach((element) => {
      if (element.checked) count++;
    });

    const checkAll = document.getElementById("check-all");
    if (count === checkboxList.length) {
      checkAll.checked = true;
    } else {
      checkAll.checked = false;
    }
  };

  const checkTokoHandler = (e) => {
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

    const idToko = e.target.dataset.id;
    fetch(`http://localhost:8080/api/checkToko/${idToko}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        check: e.target.checked,
        toggleAll: true,
      }),
    });

    checkAllSyncHandler();
  };

  const checkProdukHandler = (e) => {
    const productContainer = e.target.parentNode.parentNode;
    //class product-container dari toko

    let count = 0;
    Array.from(productContainer.children).forEach((element) => {
      const input = element.getElementsByTagName("input")[0];
      if (input.checked) count++;
    });

    const checkToko =
      productContainer.previousSibling.getElementsByTagName("input")[0];
    // checkbox toko
    let newCheckState;
    if (count === productContainer.children.length) {
      newCheckState = true;
    } else {
      newCheckState = false;
    }
    if (checkToko.checked ^ newCheckState) {
      const idToko = checkToko.dataset.id;
      fetch(`http://localhost:8080/api/checkToko/${idToko}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          check: e.target.checked,
          toggleAll: false,
        }),
      });
    }
    checkToko.checked = newCheckState;

    const idProduk = e.target.dataset.id;
    fetch(`http://localhost:8080/api/checkProduk/${idProduk}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        check: e.target.checked,
      }),
    }).then(() => {

    });

    checkAllSyncHandler();
  };

  const deleteCheckedHandler = async () => {
    let idsToko = [];
    let idsProduk = [];

    Array.from(document.getElementsByClassName("checkbox")).forEach(
      (element) => {
        if (element.checked) {
          if (element.dataset.for === "toko") {
            idsToko.push(element.dataset.id);
          } else {
            idsProduk.push(element.dataset.id);
          }
        }
      }
    );

    fetch("http://localhost:8080/hapus-produk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idsToko, idsProduk }),
    }).then(() => {
      setReRender(reRender + 1);
    });
  };

  return (
    <main>
      <article className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100 p-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
          </div>

          <div className="row">
            <div className="col-md-8">
              {toko !== undefined ?
                (toko.length === 0 ? (
                  <div className="alert alert-warning">
                    Oops, shopping cart is empty! &nbsp;
                    <button
                      className="btn btn-success"
                      style={{ fontWeight: 500 }}
                      onClick={generateProduk}
                    >
                      Add something to your cart !
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="d-flex mb-3 align-items-center w-100 pb-3 pt-2 shadow-sm">
                      <input
                        type="checkbox"
                        className="p-2"
                        name="cekAll"
                        id="check-all"
                        onChange={checkAllHandler}
                      />
                      <h3 className="fs-6 p-2 m-0">Pilih Semua</h3>

                      <button className="delete-all btn btn-link p-2 ms-auto me-2" onClick={deleteCheckedHandler}>
                        <FiTrash2 /> <span>Hapus</span>
                      </button>
                    </div>

                    <div className="toko mt-3 w-100 p-0">
                      {toko.map((t) => {
                        return (
                          <Toko
                            key={t._id}
                            toko={t}
                            checkTokoHandler={checkTokoHandler}
                            checkProdukHandler={checkProdukHandler}
                            stateTotalQty={[totalQty, setTotalQty]}
                            stateHargaTotal={[hargaTotal, setHargaTotal]}
                            stateHargaDiskon={[hargaDiskon, setHargaDiskon]}
                          />
                        );
                      })}
                    </div>
                  </>
                )) : ""}
            </div>
            <div className="col-md-4">
              <RingkasanBelanja
                totalQty={totalQty}
                hargaTotal={hargaTotal}
                hargaDiskon={hargaDiskon}
              />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};   
