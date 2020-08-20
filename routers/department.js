

module.exports = (department,knex)=>{
    department
        .get('/',async(req,res)=>{
            const all_departments = await knex('department').select("*")
            res.send(all_departments);
        })

        .get('/:department_id',async(req,res)=>{
            const specific_dept = await knex('department').select("*").where('department_id',req.params.department_id);
            res.send(specific_dept);
        })
}