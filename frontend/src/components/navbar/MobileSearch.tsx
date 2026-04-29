import { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const MobileSearch = ({ isOpen, onOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    onOpen();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'Enter' && query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
      handleClose();
    }
  };

  return (
    <div className="flex items-center">
      <div
        className={`flex items-center gap-2 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'w-[calc(100vw-8rem)] sm:w-[calc(100vw-12rem)] md:w-96 opacity-100'
            : 'w-0 opacity-0'
        }`}
      >
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search books..."
            className="w-full h-9 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:bg-white transition-all"
          />
        </div>
        <button
          onClick={handleClose}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-gray-700 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Close search"
        >
          <X size={16} />
        </button>
      </div>

      {!isOpen && (
        <button
          onClick={handleOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-gray-700 hover:bg-slate-100 transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      )}
    </div>
  );
};

export default MobileSearch;
