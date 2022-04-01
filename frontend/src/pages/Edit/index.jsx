import Input from "../../components/Input";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState(``);
  const [price, setPrice] = useState(``);
  const [stock, setStock] = useState(``);
  const [image, setImage] = useState(``);
  const {id} = useParams();

const history = useHistory();
   

const updateProduct = async (e) => {
 e.preventDefault();

    const data = new FormData();
    data.append(`name`, name);
    data.append(`price`, price);
    data.append(`stock`, stock);
    data.append(`image`, image);

   await axios.put(`/api/v3/product/${id}`, data)
  .then(() => {
    history.push(`/`)
  })
  .catch((error)=> {
    console.log(error);
  })
}

useEffect(() => {
  getProductById();
},[]);

const getProductById = async () => {
  const response = await axios.get(`/api/v3/product/${id}`);
  setName(response.data.name);
  setPrice(response.data.price); 
  setStock(response.data.stock);
  console.log(response);
};

  

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct} autoComplete="off">
        <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name}  onChange={ (event) =>setName(event.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price}  onChange={(event) => {
            const {value} = event.target;
            setPrice(value);
          }}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock}  onChange={(event) => {
            const {value} = event.target;
            setStock(value);} }/>
           <Input name="image" type="file" placeholder="Gambar Produk..." label="Image"   onChange={(event) => {
            const file = event.target.files[0];
            setImage(file);
          }}/>
         
          <Input name="status" type="checkbox" label="Active" defaultChecked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;
