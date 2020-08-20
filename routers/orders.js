
module.exports = (orders,knex)=>{
    
    orders
        .post ("/" , ( req , res ) => {
        let shipping_id = req.body.shipping_id;
        let tax_id = req.body.tax_id;

        knex.insert ({
            "shipping_id" : shipping_id ,
            "tax_id" : tax_id,
            "created_on" : new Date()
        }).into ( "orders" ).then (( data ) => {
            console.log ( "Inserted" )
            knex.select ( "order_id" ).from ( "orders" ).then (( orderData ) => {
                res.send (orderData);
            }).then (( err ) => {
                console.log ( err );
            });
        }).catch (( err ) => {
            console.log  ( err )
        });
    })

    .get('/:order_id',(req,res)=>{
        knex('orders').select("*").where("order_id",req.params.order_id).then((data)=>{
            res.send(data);
        }).catch((err)=>{
            res.send(err);
        })
    })
}