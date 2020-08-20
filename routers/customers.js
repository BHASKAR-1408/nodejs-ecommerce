const jwt = require("jsonwebtoken");

module.exports = (customer,knex)=>{
    customer
        .post('/',async(req,res)=>{
            await knex('customer').insert(req.body).then((data)=>{
                res.send(`Mr.${req.body.name} sucessfully registered!`);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .post('/login',async(req,res)=>{
            let email = req.body.email
            let password = req.body.password
            await knex('customer').select("*").where({email:email,password:password}).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err)
            })
        })

        .get('/gettingcustomerdata',async(req,res)=>{
            await knex('customer').select("*").then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            })
        })

        .put("/update",verifyToken,async(req,res)=>{
            let name = req.body.name;
            await knex('customer').where("name",name).update(req.body).then((data)=>{
                res.send("updated sucessfully!")
            }).catch((err)=>{
                res.send(err);
            })
        })


        .post('/token/:name',async(req,res)=>{
            var name = req.params.name;
            await knex('customer').select("*").where("name",name).then((data)=>{
                res.send(jwt.sign(name,"my_secrete_key"));
            }).catch((err)=>{
                res.send(err);
            })
    
        })

        function verifyToken(req,res,next){        // function verifyToken(req,res,next){
            const header = req.headers['authorization']
            const verification = jwt.verify(header,"my_secrete_key")
    
            if(verification == req.body.name){
                next()
            }else{
                res.send('your are not authenticate properly!!!!')
            }
        }
}