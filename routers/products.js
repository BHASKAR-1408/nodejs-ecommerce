module.exports = (products,knex)=>{
    products
        .get('/',async(req,res)=>{
            await knex('product').select('*').then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/search',async(req,res)=>{
            let name = req.query.name;
            await knex('product').select("*").where('name',name).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/:product_id',async(req,res)=>{
            await knex('product').select("*").where('product_id',req.params.product_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/inCategory/:category_id',async(req,res)=>{
            await knex('product').select('product.product_id','name',"description","price","discounted_price",'thumbnail').
            join('product_category','product_category.product_id','product.product_id').
            where('category_id',req.params.category_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .get('/inDepartment/:department_id',async(req,res)=>{
            await knex('product').select('product.product_id','product.name','product.description','price','discounted_price','thumbnail')
            .join ( "product_category" , "product_category.product_id" , "product.product_id" )
            .join ( "category" , "category.category_id" , "product_category.category_id")
            .where ( "department_id" , req.params.department_id).then (( data ) => {
                res.send ( data );
            }).catch (( err ) => {
                res.send(err);
            });
        })

        .get ( "/:product_id/details" , (req , res ) => {
            let product_id = req.params.product_id;
            knex.select ( "product_id" , "name" , "description" , "price" , "discounted_price" , "image" , "image_2" ).from ( "product" )
            .where ("product_id" , product_id) .then (( data ) => {    
                res.send (( data ));
            }).catch (( err ) => {
                console.log ( err );
            })
        })

        .get ( "/:product_id/locations" , (req , res ) => {
            let product_id = req.params.product_id;    
            knex.select ( "c.category_id" , "c.name as category_name" , "department.department_id" , "department.name as department_name").from ("category as c")
            .join ( "department" , "department.department_id" , 'c.department_id' )
            .join ("product_category" , "product_category.category_id" , "c.category_id")
            .where ( "product_id" , product_id ).then (( data ) => {
                res.send (( data ));
            }).catch (( err ) => {    
                console.log ( err ); 
            });
        })

        .get('/:product_id/review',async(req,res)=>{
            await knex('review').select("*").where('product_id',req.params.product_id).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })


        //posting a review 
        .post('/review&rating',async(req,res)=>{
            await knex('customer').select('customer_id').where('name',req.body.name).then((data)=>{
                let customer_data = data[0];
                let customer_id = customer_data.customer_id
                let dataForReview = {
                    customer_id:customer_id,
                    product_id:req.body.product_id,
                    review:req.body.review,
                    rating:req.body.rating,
                    created_on:req.body.created_on
                }

                knex('review').insert(dataForReview).then((data)=>{
                    res.send("sucessfully added the review!");
                }).catch((err)=>{
                    res.send(err);
                })
            })
            
        })
        
}
