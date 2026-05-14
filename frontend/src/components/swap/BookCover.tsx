import { BookMarked } from "lucide-react";
import { BASE_URL } from "./MySwaps";
import { cls } from "./style";

const BookCover = ({ src, title }: { src?: string; title?: string }) => (
  <div className={cls.cover}>
    {src ? (
      <img src={`${BASE_URL}${src}`} alt={title} className={cls.img} />
    ) : (
      <div className={cls.placeholder}>
        <BookMarked size={16} className="text-slate-300" />
      </div>
    )}
  </div>
);

export default BookCover;
