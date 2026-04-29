import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { searchBookListings } from '../../store/book/bookThunk';
import BookCard from './BookCard';
import Pagination from './Pagination';
import LoadingState from '../live/misc/LoadingState';
import ErrorState from '../live/misc/ErrorState';
import { BookOpen } from 'lucide-react';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { books, pagination, isLoading, error } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    dispatch(searchBookListings({ q: query, page, limit: 12 }));
  }, [query, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && books.length === 0) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="w-full">
      {query && (
        <div className="mb-6">
          <p className="text-sm text-slate-400">
            Results for{' '}
            <span className="font-bold text-slate-900">"{query}"</span>
          </p>
        </div>
      )}

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-slate-300" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">No books found</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xs">
            There are currently no books available. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <Pagination
            currentPage={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Explore;
