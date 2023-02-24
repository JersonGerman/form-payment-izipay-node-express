const path = require('path');
const chalk= require('chalk');
const express =  require('express');
const cors = require('cors');
const PORT = 4000;

const {paymentRouter} = require('./routes/payment.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",paymentRouter)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/public/index.html"));
})

app.listen(PORT,()=>{
    console.log('Server running');
    console.log(chalk.cyan('Press CRTL + click ==>   http://localhost:'+PORT));
})