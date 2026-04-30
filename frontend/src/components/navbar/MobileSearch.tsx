import { useRef, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GENRES, CONDITIONS } from "../../../../shared/types/book";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const MobileSearch = ({ isOpen, onOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleOpen = () => {
    onOpen();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClose = () => {
    setQuery("");
    setGenre("");
    setCondition("");
    setShowFilters(false);
    onClose();
  };

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (genre) params.set("genre", genre);
    if (condition) params.set("condition", condition);
    return `/?${params.toString()}`;
  };

  const handleSearch = () => {
    if (query.trim() || genre || condition) {
      navigate(buildUrl());
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "Enter") {
      handleSearch();
    }
  };

  const activeFilterCount = [genre, condition].filter(Boolean).length;

  return (
    <div ref={containerRef} className="relative flex items-center">
      {isOpen ? (
        <div className="flex w-[calc(100vw-8rem)] flex-col gap-2 sm:w-[calc(100vw-12rem)] md:w-96">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search books..."
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-gray-900 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
              />
            </div>

            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                showFilters || activeFilterCount > 0
                  ? "bg-teal-50 text-teal-600"
                  : "text-slate-400 hover:bg-slate-100 hover:text-gray-700"
              }`}
              aria-label="Filters"
            >
              <SlidersHorizontal size={15} />
              {activeFilterCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-medium text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <button
              onClick={handleSearch}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white transition-colors hover:bg-teal-600"
              aria-label="Submit search"
            >
              <Search size={15} />
            </button>

            <button
              onClick={handleClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-gray-700"
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </div>

          {showFilters && (
            <div className="absolute left-0 top-full z-50 mt-2 flex gap-2">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-2 text-xs text-gray-700 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
              >
                <option value="">All Genres</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-2 text-xs text-gray-700 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
              >
                <option value="">All Conditions</option>
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-gray-700"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      )}
    </div>
  );
};

export default MobileSearch;
