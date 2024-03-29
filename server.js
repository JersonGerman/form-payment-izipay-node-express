const path = require('path');
const chalk= require('chalk');
const express =  require('express');
const cors = require('cors');
const PORT = 3000;

const {paymentRouter} = require('./routes/payment.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",paymentRouter)

app.use(express.static(path.join(__dirname, 'public')))

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname,"public"));
// })
// app.get("/redireccion", (req, res) => {
//     res.sendFile(path.join(__dirname+"/public/redireccion.html"))
// })
// app.get("/incrustado", (req, res) => {
//     res.sendFile(path.join(__dirname+"/public/incrustado.html"))
// })


app.listen(PORT,()=>{
    console.log('Server running');
    console.log(chalk.cyan('Press CRTL + click ==>   http://localhost:'+PORT));
})