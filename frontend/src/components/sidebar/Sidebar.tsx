import './Sidebar.scss';

export default function Sidebar(props: any) {
  const { genres, currentGenre, fetchAllMovies, updateGenre } = props;

  return (
    <div data-testid="sidebar" className="sidebar">
      <h2>🎬 Movies App</h2>

      <ul>
        <li data-testid="all-movies-button" onClick={() => fetchAllMovies()}>(all movies)</li>
      </ul>

      <h3>By Genre</h3>
      <ul id="genres">
        {
          Object.entries(genres).map(([genre, count]) => (
            <li className={currentGenre === genre ? 'active' : ''} onClick={() => updateGenre(genre)}>{genre} ({count})</li>
          ))
        }
      </ul>
    </div>
  );
}