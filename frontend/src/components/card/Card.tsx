import './Card.scss';

export default function Card(props: any) {
  const { title, release_date, overview, genres, url } = props.movie;

  return (
    <a data-testid="movie-card" className="moviecard" href={url} target="_blank" rel="noreferrer">
      <div className="moviecard-title">
        {title} {release_date.slice(0, 4)}
      </div>
      <div className="moviecard-overview">
        {overview}
      </div>
      <div className="moviecard-genres">
        <ul> 
          {
            genres.map((genre: string) => (
              <li>{genre}</li>
            ))
          }
        </ul>
      </div>
    </a>
  );
}