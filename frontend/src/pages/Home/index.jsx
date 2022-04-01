import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import './index.scss';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState(``);


  useEffect(()=>{
       getProduct();

  }, [] );

  const getProduct = async () => {
    const response = await axios.get(`/api/v3/product`);
    setProduct(response.data);
    console.log(response);
  }

  const deleteProducts = async (id) => {
   await axios.delete(`/api/v3/product/${id}`);
    getProduct();
    
  }

  const searchProduct = product.filter(products => {
    return products.name.toLowerCase().includes(search.toLowerCase() )
  })

  return(
    <div className="main">
    
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search" onChange={(e) => setSearch(e.target.value)}>
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-right">Image</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody> 
            {  searchProduct.map( (products, index)  => {
      return(        
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{products.name}</td>
            <td className="text-right">{products.price}</td>
            <td className="text-right">{products.stock}</td>
            <td className="text-right"><img src={products.image_url} alt="" style={{width:`80px`, height:`80px`}}></img></td>
            <td className="text-center">
              <Link to={`/detail/${products._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${products._id}`} className="btn btn-sm btn-warning">Edit</Link>

              <button className="btn btn-sm btn-danger"  onClick={ ()=> {
                const notif = window.confirm("Apakah anda ingin menghapus?");
                  if(notif === true){
                    deleteProducts(products._id)
                  }
                }  } 
              >Delete</button>
            </td>
        </tr> 
       

      ) 
            }) 
           
            }
            </tbody>
      </table>
    </div>
  )
}

export default Home;
