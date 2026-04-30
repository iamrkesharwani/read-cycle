import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GENRES, CONDITIONS } from "../../../../shared/types/book";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        close();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const close = () => {
    setIsOpen(false);
    setShowFilters(false);
    setQuery("");
    setGenre("");
    setCondition("");
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
      close();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    if (isOpen) {
      handleSearch();
    } else {
      open();
    }
  };

  const activeFilterCount = [genre, condition].filter(Boolean).length;

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-w-[208px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search books..."
          className="pointer-events-auto h-9 w-52 rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
        />
      </div>

      {isOpen && (
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
      )}

      <button
        onClick={handleSearchClick}
        aria-label="Search"
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isOpen
            ? "bg-teal-50 text-teal-600"
            : "font-bold text-teal-600 hover:bg-slate-100 hover:text-teal-700"
        }`}
      >
        <Search size={17} />
      </button>

      {isOpen && showFilters && (
        <div className="absolute left-0 top-full z-50 mt-2 flex gap-2">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-xs text-gray-700 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
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
            className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-xs text-gray-700 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
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
  );
};

export default SearchBar;
