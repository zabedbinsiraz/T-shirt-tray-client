import React, { useState } from 'react';
import './Shirts.css'

const Shirts = (props) => {
    const handleBuyNow = props.handleBuyNow;
    const tShirt = props.tShirt;
    
    

    return (
        <div>

            
            <div className="product-card">
                    <img className="image-style" src={tShirt.imageURL} alt="" />
                    <div className="card-desc">
                        <p><strong>{tShirt.productName}</strong></p>
                        <h3> <span>${tShirt.price}</span> <button className='btn' onClick={() => handleBuyNow(tShirt._id)}>Buy Now</button></h3>
                        
                    </div>

                </div>
        </div>
    );
};

export default Shirts;