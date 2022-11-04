import { Card, CardContent, Grid, Rating,Button,TextField } from "@mui/material";
import React from "react";
import axios from "axios"
import { useState,useEffect } from "react";

export const Home=()=>{
    const [text,settext]=useState("")
    const [rate,setrate]=useState()
    const [data,setdata]=useState([])
    const [fdata,setfdata]=useState([])
    const [catdata,setcatdata]=useState([])
    const [cat,setcat]=useState("")

    const getdata=async()=>{
        const result=await axios.get("https://fakestoreapi.com/products/category/jewelery")
        setdata(result.data)
        setfdata(result.data)
        const out=await axios.get("https://fakestoreapi.com/products/categories")
        setcatdata(out.data)
    }
    useEffect(()=>{
        getdata()
    },[])

    useEffect(()=>{
        const filtered=data.filter((item)=>item.category===cat)
        setfdata(filtered)
        },[cat])

        useEffect(()=>{
            const filtered=data.filter((item)=>item.rating.rate >= rate)
            setfdata(filtered)
        },[rate])
    
        useEffect(()=>{
            const filtered=data.filter((item)=>item.title.toUpperCase().includes(text.toUpperCase()) ||
            item.category.toUpperCase().includes(text.toUpperCase()))
            setfdata(filtered)
            setcat("")
        },[text])

    return(
        <div> <br />
            <h2>Product List</h2>
            <Grid container spacing={3}>
                <Grid item xs={8}><TextField label="Search"  variant="filled"  color="success" value={text} onChange={(e)=>settext(e.target.value)} fullWidth></TextField></Grid>
             <Grid item xs={4}>
                <Rating name="rate it" value={rate} /></Grid>
            {
                catdata.map(item=><Grid item xs={3}>
                         <Button id="b1" onClick={()=>setcat(item)} variant="contained" fullWidth>{item}</Button> </Grid>) 

                }
                </Grid>
                <Grid container spacing={3}>
                {
                    fdata.length>0 && fdata.map((item)=>{
                        return(
                            <Grid item xs={3}>
                                <Card sx={{bgcolor:"white",
                                margin:"20px",
                                color: "black",
                                border: "2px solid #4CAF50"}}>
                                    <CardContent >
                                        <h3>{item.id}</h3>
                                        <img src={item.image} height="150px" width="150px" alt="" />
                                        <h3>{item.title.slice(0,20)}</h3>
                                        <h3>{item.price}</h3>
                                        <h3>{item.id}</h3>
                                        <h3>{item.category}</h3>
                                        <Rating name="rate it" value={item.rating.rate}/>{item.rating.rate}
                                        {"("+item.rating.count+")"}
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                        )
                    })
                }
            </Grid>
        </div>
    )
}