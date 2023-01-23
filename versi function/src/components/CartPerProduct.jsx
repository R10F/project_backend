import { useState, useEffect } from "react";
// import useFetch from "../useFetch";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Toko } from "./Toko";

export const CartPerProduct = () => {
  const [toko, setToko] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [hargaTotal, setHargaTotal] = useState(0);
  // let [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/produk")
      .then((res) => res.json())
      .then((data) => {
        let tempHarga = 0;
        data.forEach(toko => {
          toko.produk.forEach(item => {
            tempHarga += (item.harga * (1 - item.diskon / 100)) * item.qty;
          })
        });
        setToko(data);
        setHargaTotal(tempHarga);
      });
  }, [reRender]);

  const checkAllHandler = (e) => {
    const checkboxList = document.getElementsByClassName("checkbox");

    Array.from(checkboxList).forEach(element => {
      if (e.target.checked) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
  }

  const checkAllSyncHandler = () => {
    const checkboxList = document.getElementsByClassName("checkbox");

    let count = 0;
    Array.from(checkboxList).forEach(element => {
      if (element.checked) count++;
    });

    const checkAll = document.getElementById("check-all");
    if (count === checkboxList.length) {
      checkAll.checked = true;
    } else {
      checkAll.checked = false;
    }
  }

  const checkTokoHandler = (e) => {
    const productContainer = e.target.parentNode.nextSibling;

    Array.from(productContainer.children).forEach(element => {
      const input = element.getElementsByTagName('input')[0];

      if (e.target.checked) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
    checkAllSyncHandler();
  }

  const checkProdukHandler = (e) => {
    const productContainer = e.target.parentNode.parentNode;

    let count = 0;
    Array.from(productContainer.children).forEach(element => {
      const input = element.getElementsByTagName('input')[0];
      if (input.checked) count++;
    });

    const checkToko = productContainer.previousSibling.getElementsByTagName('input')[0];
    if (count === productContainer.children.length) {
      checkToko.checked = true;
    } else {
      checkToko.checked = false;
    }
    checkAllSyncHandler();
  }

  const deleteCheckedHandler = async () => {
    let idsToko = [];
    let idsProduk = [];

    Array.from(document.getElementsByClassName("checkbox")).forEach(element => {
      if (element.checked) {
        if (element.dataset.for === "toko") {
          idsToko.push(element.dataset.id);
        } else {
          idsProduk.push(element.dataset.id);
        }
      }
    });

    fetch("http://localhost:8080/hapus-produk", {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idsToko, idsProduk })
    }).then(() => { setReRender(reRender + 1) });
  }

  const currency = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  }

  // const deleteProdukHanlder = (e) => {
  //   const idProduk = e.target.closest("[data-id]").dataset.id;

  //   fetch("http://localhost:8080/hapus-produk", {
  //     method: "DELETE",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ idsProduk: [idProduk] })
  //   }).then(() => { setReRender(reRender + 1) });
  // }

  // let handlechange = () => {
  //   setQty(qty);
  // };

  // const handleInput = (e) => {
  //   let newQty = e.target.value;
  //   if (newQty <= 0 && newQty !== "") return;
  //   if (newQty === "") newQty = 0;
  //   setQty(e.target.value);
  // };

  return <>
    <div className="d-flex flex-row mb-3">
      <input type="checkbox" className="p-2" name="cekAll" id="check-all" onChange={checkAllHandler} />
      <h3 className="p-2">Pilih Semua</h3>{currency(hargaTotal)}
      <button
        className="btn btn-link px-2"
        onClick={deleteCheckedHandler}
      >
        <FiTrash2 />
      </button>
    </div>
    <div id="garis"></div>

    <div className="toko mt-3">
      {toko !== undefined ? (
        toko.map(t => {
          return <Toko
            key={t._id}
            toko={t}
            currency={currency}
            checkTokoHandler={checkTokoHandler}
            checkProdukHandler={checkProdukHandler}
            stateHargaTotal={[hargaTotal, setHargaTotal]}
          />
        })
      ) : ""}
    </div>
    {/* <>
      <div className="d-flex flex-row mb-3 mt-5">
        <input type="checkbox" className="p-2" name="cekToko" />
        <div>
        </div>
        <div className="p-2">
          <h3>Nama</h3>
        </div>
      </div>

      <>
        <div className="d-flex flex-row mb-3">
          <div className="p-2">
            <input type="checkbox" name="cekToko" data-id="23" onChange={checkProdukHandler} />
          </div>
          <div className="p-2">
            <img
              src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/8/c8158a70-3b3b-4e8a-ad8e-ac154c63251e.jpg"
              alt=""
              width={"75px"}
            />
          </div>
          <div className="p-2">
            <h5>Frisian Flag Milky Susu UHT Chocolate 115ml [12 pcs]</h5>
            <p>Rp 35.000</p>
          </div>

          <div className="produk">
            {[].map((produk) => {
              console.log(produk);
              return (
                <div className="d-flex flex-row mb-3" data-key={produk._id}>
                  <div className="p-2">
                    <input type="checkbox" name="cekToko" id="cekToko" />
                  </div>
                  <div className="p-2">
                    <img src={produk.gambar} alt="" width={"75px"} />
                  </div>
                  <div className="p-2">
                    <h5>{produk.nama}</h5>
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(produk.harga)}
                    </p>
                  </div>
                  <div className="col-md-2 d-flex align-items-center my-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <button
                          className="btn btn-link px-2"
                          disabled={qty <= 1 ? 1 : 0}
                          onClick={() => {
                            // this.props.addToCart(this.props.productDetail.id, -1);
                            handlechange();
                          }}
                        >
                          <FiMinus />
                        </button>

                        <input
                          id="quantity"
                          min="1"
                          max="7"
                          value={produk.qty}
                          type="number"
                          className="form-control form-control-sm"
                          onChange={handleInput}
                        />

                        <button
                          className="btn btn-link px-2"
                          onClick={() => {
                            // this.props.addToCart(this.props.productDetail.id, 1);
                            handlechange();
                          }}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="garis"></div>
        </div>
      </>
    </> */}
  </>;
};
