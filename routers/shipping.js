const knex = require("../database/db");

module.exports = (shipping,knex)=>{

    shipping
        .get('/regions',(req,res)=>{
            knex('shipping_region').select("*").then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/regions/:shipping_region_id',(req,res)=>{
            knex('shipping_region').select("*").where("shipping_region_id",req.params.shipping_region_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })
}