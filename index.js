const express = require("express");
const app = express();
const pool = require("./db");
app.use(express.json());

const cors = require("cors");
app.use(cors({
    origin: '*'
}));

app.get("/employee", async (req, res)=>{
    try{
        const allEmp =await pool.query("SELECT * FROM employeeinfo");
        res.json(allEmp.rows);
    }catch (err){
        console.error(err.message);
    }
});

app.get("/feedback",async (req,res)=>{
    try{
        const allFeed = await pool.query("SELECT * FROM feedbackinfo");
        res.json(allFeed.rows);
    }catch(err){
        console.error(err.message);
    }
});
app.get("/experience",async (req,res)=>{
    try{
        const allEx = await pool.query("SELECT * FROM experience");
        res.json(allEx.rows);
    }catch(err){
        console.error(err.message);
    }
});
app.get("/ctc",async (req,res)=>{
    try{
        const allCtc = await pool.query("SELECT * FROM ctc");
        res.json(allCtc.rows);
    }catch(err){
        console.error(err.message);
    }
});
app.get("/ctc_history",async(req,res)=>{
    try{
        const allCtcHistory = await pool.query("SELECT * FROM ctc_history");
        res.json(allCtcHistory.rows);
    }catch(err){
        console.error(err.message);
    }
});
app.get("/joining_details",async(req,res)=>{
    try{
        const allDetails = await pool.query("SELECT * FROM joining_details");
        res.json(allDetails.rows);
    }catch(err){
        console.error(err.message);
    }
});
app.post("/employee",async(req,res)=>{
    try{ 
        const { name,contact_no,email,current_company,joining_location,skill,tower,current_status } = req.body;
    const newEmp = await pool.query(
        "INSERT INTO employeeinfo (name,contact_no,email,current_company,joining_location,skill,tower,current_status)VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [name,contact_no,email,current_company,joining_location,skill,tower,current_status]
    );
    res.json(newEmp)
    }catch(err){
        console.error(err.message);
    }
});
app.post("/experinece",async(req,res)=>{
    try{
        const {total_ex,relevant_ex,level,grade,deviation}=req.body;
        const newEx = await pool.query(
            "INSERT  INTO experience (total_ex,relevant_ex,level,grade,deviation) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [total_ex,relevant_ex,level,grade,deviation]
        );
        res.json(newEx)
    }catch(err){
        console.error(err.message);
    }
});
app.post("/ctc",async(req,res)=>{
    try{
        const {current,expected,offered,in_words,average,hike,threshold}=req.body;
        const newCtc = await pool.query(
            "INSERT INTO ctc (current,expected,offered,in_words,average,hike,threshold) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
       [current,expected,offered,in_words,average,hike,threshold]
            );
            res.json(newCtc)
    }catch(err){
        console.error(err.message);
    }
});
app.post("/ctcHistory",async(req,res)=>{
    try{
        const {offered,holding_offer,created_by,date}=req.body;
        const newHis = await pool.query(
            "INSERT INTO ctc_history (offered,holding_offer,created_by,date) VALUES ($1,$2,$3,$4) RETURNING *",
        [offered,holding_offer,created_by,date]
            );
            res.json(newHis)
    }catch(err){
        console.error(err.message);
    }
});
app.post("/joining",async(req,res)=>{
try{
    const {doj,moj,notice_period}=req.body;
    const newJoin = await pool.query(
        "INSERT INTO joining_details (doj,moj,notice_period) VALUES ($1,$2,$3)RETURNING *",
        [doj,moj,notice_period]
    );
    res.json(newJoin)
}catch(err){
    console.error(err.message);
}
});
app.post("/feedback",async(req,res)=>{
try{ 
    const {panel_name,rating}=req.body;
    const newFeed = await pool.query(
        "INSERT INTO feedbackinfo (panel_name,rating) VALUES ($1,$2) RETURNING *",
        [panel_name,rating]
    );
    res.json(newFeed)
}catch(err){
    console.error(err.message);
}
});
app.listen(5000, ()=>{
    console.log("server is listening on post 5000");
});
// androidpro