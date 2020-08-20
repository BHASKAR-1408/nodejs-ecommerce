module.exports = (attributes,knex)=>{
    attributes
        .get('/',async(req,res)=>{
            await knex('attribute').select('*').then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/:attribute_id',async(req,res)=>{
            await knex('attribute').select('*').where('attribute_id',req.params.attribute_id).then((data=>{
                res.send(data);
            })).catch((err)=>{
                res.send(err);
            })
        })

        .get('/values/:attribute_id',async(req,res)=>{
            await knex('attribute_value').select('*').where('attribute_id',req.params.attribute_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/inProduct/:product_id',async(req,res)=>{
            await knex('attribute').select('name as attribute_name','attribute_value.attribute_value_id','value as attribute_value').
            join('attribute_value','attribute_value.attribute_id','attribute.attribute_id').
            join('product_attribute','product_attribute.attribute_value_id','attribute_value.attribute_value_id').
            where('product_id',req.params.product_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        // .get ( "/inProduct/:product_id" , (req ,res ) => {

        //     let product_id = req.params.product_id;
    
        //     knex.select ("name as attribute_name" , "attribute_value.attribute_value_id" , "value as attribute_value").from ("attribute")
    
        //     .join ("attribute_value" , "attribute_value. attribute_id" , "attribute.attribute_id")
    
        //     .join ( "product_attribute" , 'product_attribute.attribute_value_id' , "attribute_value.attribute_value_id" )
    
        //     .where( "product_id" , product_id).then (( data ) => {
    
        //         res.send (data);
        //     }).catch ((err) => { 
    
        //         console.log (err)
        //     });
        // });

}
