import "./addRestaurant.css";

export default function RestaurantTime(props) {
  const { resData, setResData } = props;

  const handleProductFormdata = (e) => {
    setResData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="product-form">
      <h3>Restaurant Type & Timings</h3>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Opening Time</label>
          <input
            className="p-input-text"
            type="time"
            name="resopentime"
            onChange={handleProductFormdata}
          ></input>
        </div>
        <div>
          <label className="p-form-label">Closing Time</label>
          <input
            className="p-input-text"
            name="resclosetime"
            type="time"
            onChange={handleProductFormdata}
          ></input>
        </div>
      </div>
      <div className="p-form-inputs">
        <div>
          <label className="p-form-label">Type</label>
          <select
            className="p-select-text"
            onChange={handleProductFormdata}
            name="restype"
          >
            <option></option>
            <option>Fine Dining</option>
            <option>Food Truck</option>
            <option>Cafe</option>
            <option>Pub</option>
          </select>
        </div>

        <div>
          <label className="p-form-label">Cuisine Type</label>
          <select
            className="p-select-text"
            onChange={handleProductFormdata}
            name="cuisine"
          >
            <option></option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Thai</option>
            <option>Italian</option>
          </select>
        </div>
      </div>
    </div>
  );
}
