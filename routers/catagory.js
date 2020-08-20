const { response } = require("express");

module.exports = (catagory,knex)=>{
    catagory
        .get('/',async(req,res)=>{
            const all_catagories = await knex('category').select("*");
            res.send(all_catagories);
        })

        .get('/:catagory_id',async(req,res)=>{
            const specific_catagory =await knex('category').select('*').where('category_id',req.params.catagory_id);
            res.send(specific_catagory);
        })

        .get('/inproduct/:product_id',async(req,res)=>{
            const catagory_data = await knex('product_category').select('category_id').where('product_id',req.params.product_id);
            let dict = catagory_data[0];
            let category_id = dict.category_id;
            await knex('category').select("*").where('category_id',category_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/inDepartment/:department_id',async(req,res)=>{
            await knex('category').select('*').where('department_id',req.params.department_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })
}