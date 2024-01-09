import "./addRestaurant.css";

export default function RestaurantInfo(props) {
  const { resData, setResData } = props;

  const handleProductFormdata = (e) => {
    setResData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="product-form">
      <h3>Restaurant Information</h3>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label"> Restaurant Name</label>
          <input
            className="p-input-text"
            type="text"
            name="resName"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Address</label>
          <input
            className="p-input-text"
            name="address"
            type="text"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Owner Name</label>
          <input
            className="p-input-text"
            name="resowner"
            type="text"
            placeholder="Resturant Owner Name"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Mobile Number</label>
          <input
            className="p-input-text"
            name="resnumber"
            type="text"
            placeholder="Mobile Number"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Password</label>
          <input
            className="p-input-text"
            type="password"
            name="password"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
    </div>
  );
}
