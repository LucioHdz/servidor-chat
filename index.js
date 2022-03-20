
// importamos el framework de express
const express = require('express')
const app = express()
const {read,update,insert} = require('./database/operaciones')
const mysql = require('mysql');
const cors = require('cors');

const connectionDB = mysql.createConnection({
    host: "localhost",
    database: "whatsappserver",
    user: "root",
    password: "root",
})


// middlewares
app.use(express.json())
app.use(cors())

//definimos un puerto 
app.listen(3000,()=>console.log("servidor en puerto 3000"))


//Conexion a la Base de datos
connectionDB.connect((err) => {
    if (err) throw err;
    console.log('connected successfully');
})




//Peticion hacia la API
app.get("/:id",(req,res)=>{
    id = req.params.id
    read(connectionDB,id,response =>{
        res.status(200).json(response)
    })
})

app.patch('/:id',(req,res)=>{
    const id = req.params.id
    const status = req.body.estado
    update(connectionDB,id,status,response =>{
        res.status(200).json(response)
    })
})

app.post('/', (req,res) =>{
    const datos = req.body
    insert(connectionDB,datos,response =>{
        res.status(200).json(response)
    })
})
