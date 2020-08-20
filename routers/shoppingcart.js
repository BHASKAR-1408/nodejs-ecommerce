
module.exports = (shoppingcart,knex)=>{
    shoppingcart
        .get('/generateUniqueId',async(req,res)=>{ 
            let uniqueId = "";
            let forUniqueId = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxz1234567890!@#$%^&()";
            let listOfunique = forUniqueId.split("")
            // res.send(listOfunique);
            for(var i = 0;i<11;i++){
                uniqueId += listOfunique[ Math.floor ( Math.random() * (listOfunique.length - 1))]
            }
            res.send(uniqueId);  
        })

        .post('/add',async(req,res)=>{
            let total = req.body
            let dataOfshopping_cart = {
                cart_id:total.cart_id,
                product_id:total.product_id,
                attributes:total.attributes,
                quantity:total.quantity,
                added_on:new Date()
            }
            await knex('shopping_cart').insert(dataOfshopping_cart).then((data)=>{ 
                    res.send("sucessfully added to cart");
                }).catch((err)=>{
                    res.send(err);
            })
        })

        .get('/data/:product_id',(req,res)=>{
            let product_id = req.params.product_id
            knex('shopping_cart').select('*').where({product_id:product_id}).then((data)=>{
                console.log(data);
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })


        .put('/update/:item_id',(req,res)=>{
            let attributes = req.body.attributes;
            let quantity = req.body.quantity;

            knex('shopping_cart').update({attributes:attributes,quantity:quantity}).where('item_id',req.params.item_id).then((data)=>{
                knex('shopping_cart').select("*").then((data)=>{
                    res.send(data);
                }).catch((err)=>{
                    res.send(err)
                })
            })   
        })

        .delete('/remove/:product_id',(req,res)=>{
            knex('shopping_cart').where('product_id',req.params.product_id).del().then((data)=>{
                knex('shopping_cart').select("*").then((data)=>{
                    res.send(data);
                }).catch((err)=>{
                    res.send(err);
                })
            })
        })

        .get('/totalamount/:item_id',(req,res)=>{
            knex('product').select('shopping_cart.quantity','price')
            .join ( "shopping_cart" , "shopping_cart.product_id" , "product.product_id" )
            .where ( "item_id" , req.params.item_id ).then (( data ) => {
                let total_amount = data[0].quantity * data[0].price;
                res.send  ({ "total_amount" : total_amount })
            });
        })

        .get  ( "/saveForLater/:item_id" , ( req , res ) => {
            let item_id = req.params.item_id;
            knex.schema.hasTable ( "save_for_later" ).then (( exists ) => {
                if (exists) {
                    knex.select ( "cart_id" , "product_id" , "attributes" ).from ( "shopping_cart" )
                    .where ( "item_id" , item_id ).then (( data ) => {
                        knex( "save_for_later" ).insert ({
                            "item_id" : item_id , 
                            "product_id" : data[0]["product_id"] ,
                            "attributes" : data[0]["attributes"] ,
                            "cart_id" : data[0]["cart_id"]
                        }).then ( ( data ) => {
                            console.log ( "Inserted!" );
                            res.send ( data )
                            knex( "shopping_cart" ).where ( "item_id" , item_id ).del()
                            .then (() => {
                            console.log ( "Saved for later" ) 
                            }).catch (( err ) => {
                                console.log ( err )
                            })
                        }).catch (( err ) => {
                            console.log ( err );
                            res.send ( err )
                        });
                    });
                }else {
                    knex.schema.createTable ( "save_for_later" , ( table ) => {
    
                        table.integer ( "item_id" ) ,
                        table.integer ( "product_id" ),
                        table.string ( "cart_id" ),
                        table.string ( "attributes" )
    
                    }).then (() => {
                        console.log ("Created!")
                    }).catch (( err ) => {
                        console.log ( err )
                    });
                };
            });
        })

        .get ("/moveToCart/:item_id" , ( req , res ) => {

            let item_id = req.params.item_id;
    
            knex.select ().from ( "save_for_later" ).then (( data ) => { 
    
                data[0]["added_on"] = new Date();
    
                knex ( "shopping_cart" ).insert ({
    
                    "item_id" : data[0]["item_id"] , 
                    "cart_id" : data[0]["cart_id"] , 
                    "product_id" : data[0]["product_id"] ,
                    "attributes" : data[0]["attributes"] , 
                    "quantity" : 1 , 
                    "added_on" : data[0]["added_on"]
                }).then (( ) => {
    
                    knex("save_for_later").where ( "item_id" , item_id ).del()
                    .then (() => {
    
                        console.log ( "Moved in Cart" )
                    })
    
                }).catch (( err ) => { 
    
                    console.log ( err );
                })
            });
        })

        .delete('/remove/:item_id',(req,res)=>{
            knex('shopping_cart').where('item_id',req.params.item_id).del().then((data)=>{
                knex('shopping_cart').select("*").then((data)=>{
                    res.send(data);
                }).catch((err)=>{
                    res.send(err);
                })
            })
        })
}