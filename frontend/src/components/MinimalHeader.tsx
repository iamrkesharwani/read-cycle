import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

const MinimalHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <Book size={28} />
          <span>Read Cycle</span>
        </Link>
      </div>
    </header>
  );
};

export default MinimalHeader;
