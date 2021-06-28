import './App.scss';

import React, { useEffect, useState } from 'react';

import Card from './components/card/Card';
import Paginator from './components/paginator/Paginator';
import Sidebar from './components/sidebar/Sidebar';
import { GetMovieResponse } from './models/GetMovieResponse';
import { Movie } from './models/Movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);                // Movies to display
  const [genres, setGenres] = useState({});                         // All movie genres
  const [genre, setGenre] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [lastPage, setlastPage] = useState<number>(Number.MAX_SAFE_INTEGER);

  const limit = 500;

  /** Called on first page load */
  useEffect(() => {
    fetchGenres();
  }, []);

  /** Called when genre or page are updated */
  useEffect(() => {
    fetchMovies();
  }, [genre, page]);

  function fetchMovies(): void {
    const from = String(limit * page);

    let url = new URL('/api/movies', window.location.origin);

    // example: /api/movies?genre=Animation
    if (genre) {
      url.searchParams.append('genre', genre);
    }

    // example: /api/movies?from=500
    if (from) {
      url.searchParams.append('from', from);
    }

    fetch(url.toString())
      .then(response => response.json())
      .then((data: GetMovieResponse) => {
        setMovies(data.movies);
        setlastPage(data.lastPageCount);
      });
  }

  function fetchGenres(): void {
    fetch('/api/genres')
      .then(response => response.json())
      .then(genres => {
        setGenres(genres);
      });
  }

  /** All movies button clicked */
  function fetchAllMovies(): void {
    setPage(0);
    setGenre('');
  }

  /** Next or previous button clicked */
  function updatePage(pageNum: number): void {
    // Clamp pages between 0 and max
    if (pageNum < 0 || pageNum >= lastPage) {
      return;
    }

    setPage(pageNum);
  }

  /** Genre button clicked */
  function updateGenre(genre: string): void {
    setGenre(genre);
    setPage(0);
  }

  return (
    <div className="container">
      <aside>
        <Paginator
          updatePage={(i: number) => updatePage(i)}
          currentPage={page}
          lastPage={lastPage}
        />

        <Sidebar
          genres={genres}
          currentGenre={genre}
          fetchAllMovies={() => fetchAllMovies()}
          updateGenre={(genre: string) => updateGenre(genre)}
        />
      </aside>


      <main>
        {
          movies.map(movie => (
            <Card
              movie={movie}
            />
          ))
        }
      </main>
    </div>
  );
}

export default App;
