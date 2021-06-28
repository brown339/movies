import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import App from './App';

const response = {
  movies: [
    {
      "id": "1652",
      "genres": [
        "Comedy",
        "Crime"
      ],
      "release_date": "1994-12-21",
      "title": "00 Schneider - Jagd auf Nihil Baxter",
      "tagline": "Verbrechen lohnt sich wieder",
      "overview": "The funny clown Bratislav Metulskie is found dead in circus \"Apollo\". The retired commissioner 00 Schneider is asked to assume control of the case. Schneider and his aged sidekick Körschgen investigate to find the murderer.",
      "url": "https://www.imdb.com/title/tt0109000/"
    },
  ],
  lastPageCount: 100
};

const server = setupServer(
  rest.get('/api/movies', (req, res, ctx) => {
    return res(ctx.json(response));
  }),
  rest.get('/api/genres', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render paginator', () => {
  render(<App />);
  const paginator = screen.getByTestId('paginator');
  expect(paginator).toBeInTheDocument();
});

test('should render sidebar', () => {
  render(<App />);
  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toBeInTheDocument();
});

test('should fetch movies', async () => {
  render(<App />);
  const allMoviesButton = screen.getByTestId('all-movies-button');
  fireEvent.click(allMoviesButton);
  await waitFor(() => screen.getByTestId('movie-card'));
  expect(screen.getByTestId('movie-card')).toBeInTheDocument(); 
});