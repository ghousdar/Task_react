import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { productsCreate } from "../../slices/productsSlice";
import { useGetAllProductsQuery } from "../../slices/productsApi";
const AdminPost = () => {
  // image wala km
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const { data} = useGetAllProductsQuery();

  const [credentials, setCredentials] = useState({
    productName: "",
    description: "",
    price: "",
    image: "",
    quantity: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));

    //credentials.image = file
    setCredentials({ ...credentials, image: e.target.files[0] });
    // console.log(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/createuser",
      //   formata
      // );
      // //  const json = await response.json();

      // const json = await response.data;
      // console.log(json);

      dispatch(productsCreate(credentials));
      setCredentials({
        productName: "",
        description: "",
        price: "",
        image: "",
        quantity: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

 
  

  return (
    <>
      <form className="my-3" onSubmit={handleClick}>
        <div className="my-3">
          <input type="file" onChange={onImageChange} />
          <img src={img} alt="" width={200} height={200} />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            product Name
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.productName}
            onChange={onChange}
            id="productName"
            name="productName"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.description}
            onChange={onChange}
            id="description"
            name="description"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.price}
            onChange={onChange}
            id="price"
            name="price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            value={credentials.quantity}
            onChange={onChange}
            id="quantity"
            name="quantity"
            required
          />
        </div>

        <button
          disabled={img === undefined}
          type="submit"
          className="btn btn-primary"
        >
          Add Product
        </button>
      </form>

      <div>
        <h1>Stock Details</h1>
        <div>
          {data &&
            data?.map((product) => (
              <div key={product._id}>
                <h3>{product.productName}</h3>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminPost;
