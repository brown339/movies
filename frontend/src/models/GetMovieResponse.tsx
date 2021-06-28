import { Movie } from './Movie';

export interface GetMovieResponse {
  movies: Movie[];
  lastPageCount: number;
}