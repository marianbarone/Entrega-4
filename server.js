import express from 'express'
const app = express()
const puerto = 8080
import rutas from './routes'
import path from 'path'

// import multer from 'multer'

//Configuracion req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/movies', routes)

app.use('/index.html', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(_dirname + '/index.html');
});

app.listen(puerto, (err) => {
    if (err) {
        console.log(`Se produjo un error al iniciar el servidor ${err}`)
    } else {
        console.log(`El servidor esta escuchando el puerto puerto $(port)`)
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