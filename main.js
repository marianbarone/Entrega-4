const fs = require('fs')

const express = require('express')

const app = express()

const port = 8080

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        fs.promises.readFile(`./${fileName}`, 'utf-8')
    }
    async save(movie) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
        if (!data) {
            movie.id = 1
            const array = [movie]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(array))
            return movie.id
        } else {
            data = JSON.parse(data)
            movie.id = data.length + 1
            data.push(movie)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
            return movie.id
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            data = JSON.parse(data)
            data = data.find(movie => movie.id === id)

            if (data) {
                console.log(data)
            } else {
                console.log(null)
            }
        } catch {
            console.log('No existen películas')
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            return JSON.parse(data)
        }
        catch {
            console.log('No existen películas')
        }
    }

    async getRandom() {
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            data = JSON.parse(data)
            const random = data[Math.floor(Math.random() * data.length)]

            return random
        }
        catch {
            console.log('No existen películas')
        }
    }


    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            data = JSON.parse(data)
            data = data.filter(movie => movie.id != id)

            console.log(data)
        } catch {
            console.log('No existe la película')
        }
    }

    async deleteAll() {

        try {

            await fs.promises.writeFile('./movies.txt', '[]')

            console.log('Todas las películas del archivo fueron eliminadas.')

        } catch (error) {

            console.log(`Ocurrió un error: ${error}`)

        }

    }
}

const movies = new Contenedor('movies.txt')

// const movie1 = {
//     title: 'Inception',
//     price: 950,
//     thumbnail: 'https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_SY741_.jpg',
// }

// const movie2 = {
//     title: 'Interstellar',
//     price: 1000,
//     thumbnail: 'https://m.media-amazon.com/images/I/71LNVGVpWYL._AC_SY679_.jpg',
// }

// const movie3 = {
//     title: 'Tenet',
//     price: 1200,
//     thumbnail: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tenet-1593638684.jpeg?crop=1xw:1xh;center,top&resize=480:*',
// }

// const movie4 = {
//     title: 'Dunkirk',
//     price: 800,
//     thumbnail: 'https://m.media-amazon.com/images/I/61jphewUR6L._AC_SL1111_.jpg',
// }

// const entrega = async () => {
// await movies.save(movie1)
// await movies.save(movie2)
// await movies.save(movie3)
// await movies.save(movie4)
// await movies.getById(1)
// await movies.getById(2)
// await movies.getById(3)
// await movies.getById(5)
// await movies.getAll()
// await movies.deleteById(5)
// await movies.deleteAll()
// }

// entrega()

app.listen(port, () => {
    console.log(`Servidor escuchando puerto: ${port}`)
})

app.get('/movies', async (req, res) => {

    try {
        const response = await movies.getAll()

        res.send(response)

    } catch (error) {

        console.log(`Ocurrió un error: ${error}`)

    }


})

app.get('/moviesRandom', async (req, res) => {

    try {
        const response = await movies.getRandom()

        res.send(response)

    } catch (error) {

        console.log(`Ocurrió un error: ${error}`)

    }

})

