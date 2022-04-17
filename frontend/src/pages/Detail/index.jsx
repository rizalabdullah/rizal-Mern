import { Link } from "react-router-dom";
import './index.scss';
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [Id, setId] = useState(``);
  const [name, setName] = useState(``);
  const [price, setPrice] = useState(``);
  const [stock, setStock] = useState(``);
  const [image, setImage] = useState(``);
  const {id} = useParams();

  useEffect(() => {
    getProductById();
  },[]);
  
  const getProductById = async () => {
    const response = await axios.get(`/api/v4/product/${id}`);
    setId(response.data._id);
    setName(response.data.name);
    setPrice(response.data.price); 
    setStock(response.data.stock)
    setImage(response.data.image_url)
    console.log(response);
  };
    

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{Id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{stock}</td>
          </tr>
          <tr>
            <td>Image</td>
            <td><img src={image} style={{width:`90px`,height:`90px`}} alt=""/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;