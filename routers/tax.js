const knex = require("../database/db");

module.exports = (tax,knex)=>{
    tax
        .get('/',(req,res)=>{
            knex('tax').select("*").then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/:tax_id',(req,res)=>{
            knex('tax').select("*").where("tax_id",req.params.tax_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        }) 
}