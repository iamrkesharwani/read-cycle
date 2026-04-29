import type { Book } from '../../../../shared/types/book';
import BookCardDesktop from './cards/BookCardDesktop';
import BookCardTablet from './cards/BookCardTablet';
import BookCardMobile from './cards/BookCardMobile';

const BookCard = ({ book }: { book: Book }) => (
  <>
    <div className="hidden lg:block">
      <BookCardDesktop book={book} />
    </div>
    <div className="hidden sm:block lg:hidden">
      <BookCardTablet book={book} />
    </div>
    <div className="block sm:hidden">
      <BookCardMobile book={book} />
    </div>
  </>
);

export default BookCard;
