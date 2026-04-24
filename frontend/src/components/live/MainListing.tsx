import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchBookById } from '../../store/book/bookThunk';
import { resetBookStatus } from '../../store/book/bookSlice';
import { ChevronLeft } from 'lucide-react';
import LoadingState from './misc/LoadingState';
import NotFoundState from './misc/NotFoundState';
import ErrorState from './misc/ErrorState';
import BookImageGallery from './BookImageGallery';
import BookMeta from './BookMeta';
import ListingMeta from './ListingMeta';
import ListingActions from './ListingActions';

const MainListing = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBook: book, isLoading, error } = useAppSelector((s) => s.book);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
    return () => {
      dispatch(resetBookStatus());
    };
  }, [id, dispatch]);

  const handleShare = () =>
    navigator.clipboard?.writeText(window.location.href);
  const handleSwapRequest = () => {
    /* wire to swap flow */
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!book) return <NotFoundState />;

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all group"
        >
          <ChevronLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to explore
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[44%_56%] min-h-0 overflow-hidden">
        <div className="hidden lg:flex border-r border-slate-100 p-6 min-h-0 overflow-hidden">
          <BookImageGallery images={book.images ?? []} title={book.title} />
        </div>

        <div
          className="flex flex-col min-h-0 overflow-y-auto px-6 lg:px-10 py-5 gap-6"
          style={
            {
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            } as React.CSSProperties
          }
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          <div className="lg:hidden h-56 flex-shrink-0">
            <BookImageGallery images={book.images ?? []} title={book.title} />
          </div>

          <BookMeta
            title={book.title}
            author={book.author}
            condition={book.condition}
            description={book.description}
          />

          <ListingMeta
            ownerId={book.ownerId}
            createdAt={book.createdAt}
            genre={book.genre}
          />

          <ListingActions
            onSwapRequest={handleSwapRequest}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default MainListing;
