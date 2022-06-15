import {Router} from 'express'
const router = Router()

let movies = []

//getAll

export const getAll = (req, res) => {
    if (movies.length > 0) {
        res.status(200).json(movies)
    } else {
        res.status(204).send('No existen películas')
    }
}

//add

export const addMovie = (req, res) => {
    
}