import { useState, useEffect } from "react";
// import useFetch from "../useFetch";
import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
export const CartPerProduct = () => {
  const [toko, setToko] = useState();
  const [reRender, setReRender] = useState(0);
  let [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/produk")
      .then((res) => res.json())
      .then((data) => {
        setToko(data);
      });
  }, [reRender]);

  const checkAllHandler = (e) => {
    Array.from(document.getElementsByClassName("checkbox")).forEach(element => {
      if (e.target.checked) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
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
    })
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
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ idsToko, idsProduk })
    }).then(() => { setReRender(reRender + 1) });
  }

  let handlechange = () => {
    setQty(qty);
  };

  const handleInput = (e) => {
    let newQty = e.target.value;
    if (newQty <= 0 && newQty !== "") return;
    if (newQty === "") newQty = 0;
    setQty(e.target.value);
  };
  return (
    <>
      <div className="d-flex flex-row mb-3">
        <input type="checkbox" className="p-2" name="cekAll" id="cekAll" onChange={checkAllHandler} />
        <h3 className="p-2">Pilih Semua</h3>
        <button
          className="btn btn-link px-2"
          onClick={deleteCheckedHandler}
        >
          <FiTrash />
        </button>
      </div>
      <div id="garis"></div>
      
      <div className="toko mt-3">
        {toko !== undefined ? (
          toko.map(t => {
            return <>
              <div>
                <div>
                  <input type="checkbox" class="checkbox" defaultChecked={t.check} data-for="toko" data-id={t._id} onChange={checkTokoHandler} />
                  <b>{t.nama}</b>
                </div>
                <div className="product-container">
                  {t.produk.map(p => {
                    return <>
                      <div>
                        <input type="checkbox" class="checkbox" defaultChecked={p.check} data-for="produk" data-id={p._id} onChange={checkProdukHandler} />
                        {p.nama}
                      </div>
                    </>
                  })}
                </div>
              </div>
            </>
          })
        ) : ""}
      </div>
      <>
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
              {toko.produk.map((produk) => {
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
      </>
    </>
  );
};
