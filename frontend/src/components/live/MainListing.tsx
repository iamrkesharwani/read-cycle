import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchBookById } from '../../store/book/bookThunk';
import { resetBookStatus } from '../../store/book/bookSlice';
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

  const actions = (
    <ListingActions onSwapRequest={handleSwapRequest} onShare={handleShare} />
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!book) return <NotFoundState />;

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[44%_56%] min-h-0 overflow-hidden">
        <div className="hidden md:flex border-r border-slate-100 p-6 min-h-0 overflow-hidden">
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

          <div className="md:hidden h-56 flex-shrink-0">
            <BookImageGallery images={book.images ?? []} title={book.title} />
          </div>

          <BookMeta
            title={book.title}
            author={book.author}
            condition={book.condition}
            description={book.description}
            actionsSlot={actions}
          />

          <ListingMeta
            owner={book.owner}
            createdAt={book.createdAt}
            genre={book.genre}
          />

          <div className="hidden md:block">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default MainListing;
