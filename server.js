import express from 'express'
const app = express()
const port = 8080
import routes from './api/movies.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//import multer from 'multer'

//Configuracion req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use('/index.html', express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//     res.sendFile(_dirname + '/index.html');
// });

app.listen(port, (err) => {
    if (err) {
        console.log(`Se produjo un error al iniciar el servidor ${err}`)
    } else {
        console.log(`El servidor esta escuchando el puerto ${port}`)
    }
})

// storage
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname+ '-' +Date.now())
//     }
// })

// var upload = multer({ storage: storage })