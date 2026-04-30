import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const MinimalHeader = () => {
  return (
    <header className="border-b-2 border-teal-50 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen size={22} strokeWidth={2.4} className="text-teal-600" />
          <span className="text-[17px] font-extrabold tracking-tight">
            Read <span className="text-teal-600">Cycle</span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default MinimalHeader;
