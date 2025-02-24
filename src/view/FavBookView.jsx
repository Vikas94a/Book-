import { useContext } from "react";
import { AppContext } from "../App";
import ProductCard from "../component/ProductCard";
import ReactLoading from 'react-loading';

export default function FavBookView() {
  const { favorite, loading } = useContext(AppContext);

  
  const containerStyles = {
    display: 'grid',
    placeItems: 'center',
    minHeight: '80vh',
    padding: '2rem 0',
    width: '100%'
  };

  const card = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    width: '90%',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const emptyState = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    color: '#F38D3B',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '2rem'
  };

  const loadingStyle = {
    display: 'grid',
    placeItems: 'center',
    height: '50vh'
  };

  return (
    <div style={containerStyles}>
      {loading ? (
        <div style={loadingStyle}>
          <ReactLoading type="spin" color="#007BFF" />
        </div>
      ) : (
        <>
          {favorite.length === 0 ? (
            <div style={emptyState}>
              <p>No favorites yet!</p>
              <p style={{ fontSize: '1rem', color: '#666' }}>
                Start adding books from the home page
              </p>
            </div>
          ) : (
            <div style={card}>
              {favorite.map((book) => (
                <ProductCard
                  key={book.id}
                  id={book.id}
                  image={book.image || book.formats["image/jpeg"]}
                  title={book.title}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}