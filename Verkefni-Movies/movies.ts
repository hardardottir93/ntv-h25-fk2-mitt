import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { json } from 'node:stream/consumers';
import chalk from 'chalk';

const filePath = './movies.json';

function createId() {
  return randomUUID();
}


// Movie object
type Movie = {
  id: string;
  title: string;
  year: number;
  watched: boolean;
}

// Load list
export function loadMovies(): Movie[] {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// List movies
export function listMovies() {
    const movies = loadMovies();
    if (movies. length === 0) {
        console.log(chalk.bgCyan('No movies found. Try adding a movie!'));
        return;
    }

    console.log(chalk.greenBright('Your Movies! :'));

    movies.forEach((movie, i) => {
        const status = movie.watched ? chalk.green('[✔]') : chalk.red('[ ]');
         console.log(`${i + 1}. ${status} ${movie.title} - ${movie.year} (${movie.id})`);
    });
    return movies;
}

// Save list
export function saveMovieList(movies: Movie[]) {
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
}

// Get movie by id
export function getMovieById(id: string) {

    const movies = loadMovies();
    const movie = movies.find(m => m.id === id);

    return movie;
}

// Mark as watched
export function markAsWatched(id: string, watched = true): boolean {
    const movies = loadMovies();

    const movie = movies.find((movie) => {
        return movie.id === id;
    });

    if(!movie) {
        return false;
    }

    movie.watched = watched;
    saveMovieList(movies);
    console.log(chalk.green(`Marked ${movie.title} as done.`));
    return true;
}


// Add to list
export function addMovie(title: string, year: number) {
    const movies = loadMovies();
    const newMovie = {
        id: createId(),
        title,
        year,
        watched: false
    };
    
    movies.push(newMovie);
    saveMovieList(movies);

    return newMovie;
 }


// Remove from list
export function removeMovie(id: string) {
    const movies = loadMovies();

    if (id === undefined) {
        console.log(chalk.red('Ógildur index - Veldu mynd af lista.'));
        return;
    }


    const newList = movies.filter(movie => movie.id !== id);
    console.log(`Movie with id: ${id} has been removed.`);
    saveMovieList(newList);
}