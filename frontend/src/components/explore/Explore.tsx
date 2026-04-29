import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { searchBookListings } from '../../store/book/bookThunk';
import BookCard from './BookCard';
import Pagination from './Pagination';
import LoadingState from '../live/misc/LoadingState';
import ErrorState from '../live/misc/ErrorState';
import { BookOpen } from 'lucide-react';

const LIMIT = 12;

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { books, pagination, isLoading, error } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    dispatch(searchBookListings({ q: query, page, limit: LIMIT }));
  }, [query, page, dispatch]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && books.length === 0) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const showPagination = pagination && pagination.total > LIMIT;

  return (
    <div className="flex flex-col lg:h-full">
      {books.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 lg:py-0 text-center">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5">
            <BookOpen size={22} className="text-slate-300" />
          </div>
          <h2 className="text-base font-bold text-slate-700">No books found</h2>
          <p className="text-sm text-slate-400 mt-1.5 max-w-xs leading-relaxed">
            {query
              ? `Nothing matched "${query}". Try a different search.`
              : 'No books are listed yet. Check back soon!'}
          </p>
        </div>
      ) : (
        <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pb-2">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      )}

      {showPagination && (
        <div className="mt-6 lg:mt-0 lg:shrink-0 lg:pt-3 lg:border-t lg:border-slate-100">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Explore;
