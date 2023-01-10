import React from "react";
import { useParams } from "react-router-dom";
import Star from "../components/Star";

export default function SingleCatalog(props) {
  let params = useParams();
  let product = props.getProduct(parseInt(params.productId, 10));

  return (
    <article className="container-fluid p-5">
      <div className="row ">
        <div className="col-lg-5">
          <div className="card">
            <img className="card-img img-fluid" src={product.src} alt={product.nama} />
          </div>
        </div>
        <div className="col-lg-7">
          <h1>{product.nama}</h1>
          {product.isSales ? (
            <h2 className="text-danger">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.salePrice)}
              <small className="text-muted text-decoration-line-through fs-4">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.harga)}</small>
            </h2>
          ) : (
            <h2>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(product.harga)}</h2>
          )}
          <p className="my-2 lh-lg">
            <Star rating={product.rating} />
            <br />
            <b>Merk: </b>ASUS
            <br />
            <b>Spesifikasi:</b> <br />
          </p>
          <ul>
            {product.deskripsi.map((desc, index) => {
              return <li key={"deskripsi" + product.id + index}>{desc}</li>;
            })}
          </ul>
          <div>
            <button
              className="btn btn-outline-dark text-right"
              onClick={() => {
                props.addToCart(product.id, 1);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
