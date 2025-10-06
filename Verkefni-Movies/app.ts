#!/usr/bin/env node
import chalk from 'chalk';
import { addMovie, listMovies, markAsWatched, removeMovie } from './movies.ts';

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'add':
    if (!arg1 || !arg2) {
      console.log(chalk.red('Error: Please provide a Title and a year.'));
    } else {
      addMovie(arg1, parseInt(arg2));
    }
    break;

  case 'list':
    listMovies();
    break;

  case 'watched':
    if (!arg1) {
      console.log(chalk.red('Error: Please provide the movie id.'));
    } else {
      markAsWatched(arg1);
    }
    break;

  case 'remove':
    removeMovie(arg1);
    break;

  }
