import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import AdminEachProduct from "./AdminDetailProduct/AdminEachProduct";
import { useInRouterContext, useNavigate } from "react-router-dom";
import "./adminCss/admincss.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [products, setProducts] = useState();
  const [url, seturl] = useState(`store/product/?ordering=-id`);

  const FechProduct = () => {
    dispatch(
      apiCallBegin({
        url: url,
        onSuccess: (res) => {
          if (products) {
            setProducts((prev) => {
              let middleProduct = res.data;
              middleProduct.results = [...prev.results, ...res.data.results];
              return middleProduct;
            });
          } else {
            setProducts(res.data);
          }
          //   console.log(res.data)
        },
        onError: "onError",
      })
    );
  };

  const seeMoreHandler = () => {
    if (products?.next == null) return;
    seturl(products?.next);
  };

  useEffect(() => {
    FechProduct();
  }, [url]);

  const onPostClickHandler = ()=>{
    navigate('/admin/products/post')
  }

  return (
    <div className="adminproduct__main__cont">
      <div className="adminproduct__addpostbtn__cont">
        <h1></h1>
        <button onClick={onPostClickHandler} className="adminproduct__addpostbtn">Post +</button>
      </div>
      {products?.results?.map((product) => (
        <AdminEachProduct product={product} key={product.id} />
      ))}
      <button className="slogan__btns" onClick={seeMoreHandler}>see more</button>
    </div>
  );
};

export default AdminProducts;
