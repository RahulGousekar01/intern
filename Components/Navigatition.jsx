import React from "react";
import { Link } from "react-router-dom";
export const Navigation=()=>{
    return(
        <div className="ra" >
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/product">Product</Link>
            <Link to="/profile">Profile</Link>
            </div>
    )
}