import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { COUNTRIES, filterCountries, type Country } from "../data/countries";

interface CountrySelectProps {
  country: string;
  countryCode: string;
  onChange: (country: string, countryCode: string) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function CountrySelect({
  country,
  countryCode,
  onChange,
  required = true,
  className = "",
  disabled = false,
}: CountrySelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(country || "");
  const [highlight, setHighlight] = useState(0);

  const filtered = filterCountries(query);

  useEffect(() => {
    if (!open) setQuery(country || "");
  }, [country, open]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function select(c: Country) {
    onChange(c.name, c.code);
    setQuery(c.name);
    setOpen(false);
  }

  function onInputChange(value: string) {
    setQuery(value);
    setOpen(true);
    setHighlight(0);
    // Clear selection until a country is chosen from the list
    if (countryCode) onChange("", "");
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[highlight];
      if (item) select(item);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(country || "");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-text/10 bg-white/80 px-4 py-3 text-sm font-codec text-text placeholder:text-text/35 backdrop-blur-sm transition focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/10";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label className="block space-y-1.5">
        <span className="text-xs font-poppins font-medium uppercase tracking-wider text-text/50">
          Country of Residence
        </span>
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="country-name"
          required={required}
          disabled={disabled}
          className={inputClass}
          placeholder="Search country…"
          value={query}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {/* Ensures HTML5 required works with selected ISO code */}
        <input type="hidden" required={required} value={countryCode} readOnly tabIndex={-1} aria-hidden />
      </label>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-text/10 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm font-codec text-text/50">No countries found</li>
          ) : (
            filtered.map((c, i) => (
              <li key={c.code} role="option" aria-selected={c.code === countryCode}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-codec transition ${
                    i === highlight || c.code === countryCode
                      ? "bg-primary/10 text-primary"
                      : "text-text hover:bg-text/5"
                  }`}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => select(c)}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-text/40">{c.code}</span>
                </button>
              </li>
            ))
          )}
          {filtered.length === COUNTRIES.length && (
            <li className="border-t border-text/5 px-4 py-2 text-[11px] font-codec text-text/35">
              {COUNTRIES.length} countries · type to filter
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
