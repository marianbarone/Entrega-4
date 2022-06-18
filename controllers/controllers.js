let movies = []

//getAll

export const getAll = (req, res) => {
    if (movies.length > 0) {
        res.status(200).json(movies)
    } else {
        res.status(204).send('<h3> No existen películas </h3> <br> <h3>Ingresá el producto en /index.html</h3>')
    }
}

//add

export const addMovie = (req, res) => {
    let movieId = 0
    const { title, price, thumbnail } = req.body
    if (movies.length == 0) {
        movieId = 1
    } else {
        movies.forEach((movie, i) => {
            movie.id = i + 1;
        });
    }

    let newMovie = {
        id: movieId,
        title,
        price,
        thumbnail
    }

    movies.push(newMovie)
    res.status(201).json(movies)

}

//Get con ID

export const getById = (req, res) => {
    const id = Number(req.params.id);
    if (movies.length > 0) {
        if (!isNaN(id)) {
            let movie = movies.find(mov => mov.id === id);
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: 'Pelicula no encontrada!' });
            }
        } else {
            res.status(400).json({ error: 'El ID debe ser un número!' });
        }

    } else {
        res.status(404).json({ error: 'No existen películas' });
    }
};

//Update con id

export const updateMovie = (req, res) => {
    const id = Number(req.params.id);
    if (movies.length > 0) {
        if (!isNaN(id)) {
            const movie = movies.find(data => data.id == id);
            const updatedMovies = movies.filter(data => data.id !== id);
            if (movie) {
                const { title, price, thumbnail } = req.body;
                let movieToUpdate = {
                    id,
                    title,
                    price: Number(price),
                    thumbnail
                };

                movies = [...updatedMovies, movieToUpdate];
                res.status(200).send('Película actualizada!');
            } else {
                res.status(404).json({ error: 'Película no encontrada' });
            };
        } else {
            res.status(400).json({ error: 'El ID debe ser un número' });
        };
    } else {
        res.status(404).json({ error: 'No existen películas' });
    }
};

//Delete por id

export const deleteById = (req, res) => {

    const id = Number(req.params.id);
    if (movies.length > 0) {
        if (!isNaN(id)) {
            const updatedMovies = movies.filter(movie => movie.id != req.params.id)
            movies = updatedMovies
            res.status(200).send('Película eliminada!');
        } else {
            res.status(400).json({ error: 'El ID debe ser un número' });
        }
    } else {
        res.status(404).json({ error: 'No existen películas' });
    }

}
