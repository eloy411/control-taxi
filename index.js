const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const engine = require('ejs-mate')
const path = require('node:path');
const app = express()
const cors = require('cors')
const { urlencoded } = require('express')
require('./config/database')

/**CONFIG */
app.set('port',process.env.PORT || 3001)

app.engine('ejs', engine)
app.set('view engine', 'ejs'); 

app.set('views', path.join(__dirname, 'views'));

/**MIDELWARES */

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./uploads'
}))


/**Routes */

app.use(require('./routes/cliente.routes'))
app.use(require('./routes/conductor.routes'))
app.use(require('./routes/others.routes')) 
app.use(require('./routes/admin.routes')) 


/**Static Files */

__dirname = path.resolve()

if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname,'/client/build')))

app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
}else{
    app.use(express.static(path.join(__dirname,'/client/build')))
}

/**CONNECTION */


app.listen(app.get('port'),()=>{
    console.log(`servidor conectado en el puerto ${app.get('port')}`)
})


