import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './addProducts.css';

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [addedProduct,setAddedProduct] = useState(false);

    const onSubmit = data => {
        const productData = {
            productName:data.name,
            imageURL:imageURL,
            price:data.price,
            desc:data.desc
        }
        console.log(productData)
        const url =`https://fast-beach-99961.herokuapp.com/addProduct`;
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productData)
        })
        .then(res=>{
            console.log(res)
        })

        setAddedProduct(true);
       
        
    };

    const handleImageUpload = event =>{
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'b437b2988a9a7d177ebe83d13b4dc437')
        imageData.append('image', event.target.files[0])
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
        .then(response =>{
            setImageURL(response.data.data.display_url)
        })
        .catch(error=>{
            console.log(error)
        })

    }
   

    return (
        <div className="form-container">
            <h3>Add products</h3>
           {
               addedProduct? <h3>New Product added Successfully</h3>
               : <form  onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control">
               <div>
                 <label htmlFor="">Product Name</label>
                  <br/>
               <input className="input" placeholder="new t-shirt name" {...register('name')} />
                     <br/>
               <label htmlFor="">Product Desc</label>
                 <br/>
               <input className="input" placeholder="short description" {...register('desc')} />
                 </div>
                
                 
                
              <div>
              <label htmlFor="">Price</label>
              <br/>
               <input className="input" placeholder="price in $" {...register('price')} />
               <br/>
               <label htmlFor="">Add Photo</label>
               <br/>
               <input className="input" type="file" onChange={handleImageUpload} />
                
              </div>
               </div>
              <div>
              <input className="save-btn" type="submit" />
              </div>
             </form> 
           }
        </div>
    );
};

export default AddProducts;