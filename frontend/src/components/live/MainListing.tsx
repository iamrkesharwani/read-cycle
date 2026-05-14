import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { fetchBookById } from "../../store/book/bookThunk";
import { resetBookStatus } from "../../store/book/bookSlice";
import LoadingState from "./state/LoadingState";
import NotFoundState from "./state/NotFoundState";
import ErrorState from "./state/ErrorState";
import BookImageGallery from "./BookImageGallery";
import BookMeta from "./BookMeta";
import ListingMeta from "./ListingMeta";
import ListingActions from "./ListingActions";
import { resetSwapStatus } from "../../store/swap/swapSlice";
import { proposeSwap } from "../../store/swap/swapThunk";
import ProposeSwapModal from "../swap/stepsAndModal/ProposeSwapModal";

const MainListing = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    currentBook: book,
    isLoading: isBookLoading,
    error,
  } = useAppSelector((s) => s.book);
  const {
    isLoading: isSwapping,
    success,
    error: swapError,
  } = useAppSelector((s) => s.swap);
  const authUser = useAppSelector((s) => s.auth.user);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [swapOwnError, setSwapOwnError] = useState(false);

  const isOwnBook = !!authUser && !!book && book.ownerId === authUser.id;

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
    return () => {
      dispatch(resetBookStatus());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (success) {
      setisModalOpen(false);
      dispatch(resetSwapStatus());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (swapError) {
      dispatch(resetSwapStatus());
    }
  }, [swapError, dispatch]);

  const handleShare = () =>
    navigator.clipboard?.writeText(window.location.href);

  const handleSwapRequest = () => {
    if (isOwnBook) {
      setSwapOwnError(true);
      setTimeout(() => setSwapOwnError(false), 3500);
      return;
    }
    setisModalOpen(true);
  };

  const handleSwapSelection = (offeredBookId: string) => {
    if (book?._id && offeredBookId) {
      dispatch(proposeSwap({ offeredBookId, requestedBookId: book._id }));
    }
  };

  const actions = (
    <ListingActions
      bookId={book?._id}
      onSwapRequest={handleSwapRequest}
      onShare={handleShare}
      isOwnBook={isOwnBook}
    />
  );

  if (isBookLoading && !book) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!book) return <NotFoundState />;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[44%_56%]">
        <div className="hidden min-h-0 overflow-hidden border-r border-slate-100 p-6 md:flex">
          <BookImageGallery images={book.images ?? []} title={book.title} />
        </div>

        <div
          className="flex min-h-0 flex-col gap-6 overflow-y-auto px-6 py-5 lg:px-10"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties
          }
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          <div className="h-56 flex-shrink-0 md:hidden">
            <BookImageGallery images={book.images ?? []} title={book.title} />
          </div>

          <BookMeta
            title={book.title}
            author={book.author}
            condition={book.condition}
            description={book.description}
            actionsSlot={actions}
          />

          {swapOwnError && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              You cannot request a swap on your own book.
            </div>
          )}

          <ListingMeta
            owner={book.owner}
            createdAt={book.createdAt}
            genre={book.genre}
          />

          <div className="hidden md:block">{actions}</div>
        </div>
      </div>

      <ProposeSwapModal
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
        onSelect={handleSwapSelection}
        isSubmitting={isSwapping}
      />
    </div>
  );
};

export default MainListing;
