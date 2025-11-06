import pool from '../config/db.js'

export interface Movie {
    name: string;
}

export const getAllMovies = async (): Promise<Movie[]> => {
  const result = await pool.query('SELECT *FROM movies');
  console.log('Movies fetched from database:', result);
  return result;
}

export const createMovie = async (title: string, done: boolean): Promise<Movie[]> => {
    const result = await pool.query(
        'INSERT INTO movies (title, done) VALUES ($1, $2) RETURNING *', [title, done]
    );
    return result;
}