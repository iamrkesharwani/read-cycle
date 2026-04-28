import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  const open = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const close = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleBlur = () => {
    if (!query) close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Enter' && query.trim()) {
      // Will write search query later
      close();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-w-[208px] opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search books..."
          className="h-9 w-52 bg-slate-50 border border-slate-300 rounded-xl text-sm text-gray-900 placeholder:text-slate-400 outline-none px-3 pointer-events-auto focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:bg-white transition-colors"
        />
      </div>

      <button
        onClick={isOpen ? close : open}
        aria-label="Search"
        className={`w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-colors ${
          isOpen
            ? 'text-teal-600 bg-teal-50'
            : 'text-slate-400 hover:text-gray-700 hover:bg-slate-100'
        }`}
      >
        <Search size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
