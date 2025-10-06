import express from 'express';
import { addMovie, loadMovies, markAsWatched, removeMovie } from './movies';

const app = express();
const port = 3009;

app.use(express.json());


// GET /movies - Sækja lista af myndum á watchlistanum
app.get("/movies", (request, response) => {
  const movies = loadMovies();
  response.status(200).json(movies);
});


// GET /movies/:id - Sækja staka mynd eftir ID
app.get("/movies/:id", (request, response) => {
  const movies = loadMovies();
  const id = request.params.id;
  const movie = movies?.filter(movie => movie.id !== id);
  response.json(movie);
});

// POST /movies - Bæta mynd við á listann
app.post('/movie', (request, response) => {
  const { title, year } = request.body as { title: string; year: number };
  const addedMovie = addMovie(title, year);

  response.status(201).json(addedMovie);
});

// PATCH /movies/:id - Uppfæra eigindi á movie, við fókusum helst á að geta uppfært "watched" hérna til að segja til hvort maður er búinn að horfa eða ekki.
app.patch('/movies/:id', (request, response) => {
    const { id } = request.params as { id: string };
    const { watched } = request.body as {
    watched: boolean;
  };

  const movies = loadMovies();
  const foundMovie = movies.find((movie) => {
    return movie.id === id;
  });

  if (!foundMovie) {
    response.status(404).send(null);
    return;
  }
  
  markAsWatched(foundMovie.id, watched);
  response.status(204).send('');
});

// DELETE /movies/:id - Henda mynd af watchlistanum
app.delete('/movies/:id', (request, response) => {
  const { id } = request.params as { id: string };
  const movies = loadMovies();
  const movie = movies.find((movie) => {
    return movie.id === id;
  });

  if (!movie) {
    response.status(404).send(null);
    return;
  }

  removeMovie(movie.id);
  response.status(204).send('');

});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
