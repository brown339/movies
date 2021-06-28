import './Paginator.scss';

export default function Paginator(props: any) {
  const { updatePage, currentPage, lastPage } = props;

  return (
    <div data-testid="paginator" className="paginator">
      <h2>Page</h2>
      <button disabled={currentPage === 0} onClick={() => updatePage(currentPage - 1)}>Previous</button>
      <span>{currentPage + 1}</span>
      <button disabled={currentPage === lastPage - 1} onClick={() => updatePage(currentPage + 1)}>Next</button>
    </div>
  );
}