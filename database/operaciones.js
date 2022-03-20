const mysql = require('mysql')

const read = (connection,id, callback)=>{
    connection.query(`SELECT * from servidor where idRec=${id} and estado='pendiente'`,(err,res) => {
        if (err) throw err
        callback(res)
    })
}

const update = (connection,id, status, callback)=>{
    connection.query(`UPDATE servidor SET estado='${status}' Where idRec=${id} and estado='pendiente'`,(err,res) => {
        if (err) throw err
        callback(res)
    })
}

const insert = (connection,datos,callback) => {
    var QUERY = 'INSERT servidor (idEm,idRec,texto,fecha,estado) Values (?,?,?,NOW(),"pendiente")'
    var insertQuery = mysql.format(QUERY,[
        datos.idEm,
        datos.idRec,
        datos.texto
    ])
    console.log(insertQuery)

    connection.query(insertQuery,(err,res) => {
        if (err) throw err
        callback(res)
    })
}
module.exports = {read,update,insert}