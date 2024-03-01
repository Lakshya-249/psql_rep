const pool = require("./database");

const getuser = async (req,res)=>{
    const {id}= req.params;
    const {rows} = await pool.query(`SELECT * FROM myuser WHERE emp_id=${id}`);
    if(rows.length==0){
        // await pool.end();
        return res.status(404).json({success: false,message: `No employee with id: ${id}`});
    }
    // await pool.end();
    res.status(200).json({success:true, Data: rows});
}


const insertuser = async (req,res)=>{
    const qdata = req.body;
    if(
        !qdata ||
        !qdata.firstname ||
        // !qdata.lastname ||
        !qdata.email ||
        !qdata.job_title ||
        !qdata.salary ||
        !qdata.emp_id ||
        !qdata.gender
    ){
        return res.status(400).json({success: false,message: "All fields are required..."});
    }
    const {rows} = await pool.query(`SELECT * FROM myuser WHERE emp_id=${qdata.emp_id}`);
    console.log(rows);
    if(rows.length!=0){
        // await pool.end();
        return res.status(400).json({success: false,message: "emp_id already exists..."});
    }
    if(!qdata.lastname){
        await pool.query(`INSERT INTO myuser(firstname,email,job_title,salary,emp_id,gender) 
        VALUES($1,$2,$3,$4,$5,$6)`,[qdata.firstname,qdata.email,qdata.job_title,
        qdata.salary,qdata.emp_id,qdata.gender]);
    }else{
        await pool.query(`INSERT INTO myuser(firstname,lastname,email,job_title,salary,emp_id,gender) 
        VALUES($1,$2,$3,$4,$5,$6,$7)`,[qdata.firstname,qdata.lastname,qdata.email,qdata.job_title,
        qdata.salary,qdata.emp_id,qdata.gender]);
    }
    // await pool.end();
    res.status(200).json({success: true, message: "Data inserted successfully..."});
}


const updateuser = async (req,res)=>{
    const qdata = req.query;
    if(!qdata.emp_id){
        return res.status(400).json({success: false,message: "Cannot find data without specifying the id..."});
    }
    const {rows} = await pool.query(`SELECT * FROM myuser WHERE emp_id=$1`,[qdata.emp_id]);
    if(rows.length==0){
        // await pool.end();
        return res.status(400).json({success: false,message: "emp_id doesn't exists..."});
    }
    if(qdata.firstname){
        await pool.query(`UPDATE myuser
        SET firstname= $1 WHERE emp_id=$2`,[qdata.firstname,qdata.emp_id]);
    }
    if(qdata.lastname){
        await pool.query(`UPDATE myuser
        SET lastname= $1 WHERE emp_id=$2`,[qdata.lastname,qdata.emp_id]);
    }
    if(qdata.email){
        await pool.query(`UPDATE myuser
        SET email= $1 WHERE emp_id=$2`,[qdata.email,qdata.emp_id]);
    }
    if(qdata.job_title){
        await pool.query(`UPDATE myuser
        SET job_title= $1 WHERE emp_id=$2`,[qdata.job_title,qdata.emp_id]);
    }
    if(qdata.salary){
        await pool.query(`UPDATE myuser
        SET salary= $1 WHERE emp_id=$2`,[qdata.salary,qdata.emp_id]);
    }
    if(qdata.gender){
        await pool.query(`UPDATE myuser
        SET gender= $1 WHERE emp_id=$2`,[qdata.gender,qdata.emp_id]);
    }
    // await pool.end();
    res.status(200).json({success: true,message: "Data updated successfully..."});
}


const deleteuser = async (req,res)=>{
    const {id} = req.params;
    let {rows} = await pool.query(`SELECT * FROM myuser WHERE emp_id=$1`,[id]);
    if(rows.length==0){
        // await pool.end();
        return res.status(400).json({success: false,message: "emp_id doesn't exists..."});
    }
    await pool.query(`DELETE FROM myuser WHERE emp_id=$1`,[id]);
    // await pool.end();
    res.status(200).json({success: true,message: "Data deleted succesfully"});
}

module.exports = {getuser,insertuser,updateuser,deleteuser};