import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

interface PageSearchProps {
  /** Optional label override */
  label?: string;
}

export function PageSearch({ label = "Search this page" }: PageSearchProps) {
  const [query, setQuery] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const marksRef = useRef<HTMLElement[]>([]);

  const clearHighlights = useCallback(() => {
    const marks = document.querySelectorAll("mark[data-page-search]");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      }
    });
    marksRef.current = [];
    setMatchCount(0);
    setCurrentMatch(0);
  }, []);

  const highlight = useCallback(
    (searchText: string) => {
      clearHighlights();
      if (!searchText || searchText.length < 2) return;

      try {
      const contentArea = document.querySelector("main") || document.body;
      const walker = document.createTreeWalker(contentArea, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (["script", "style", "input", "textarea", "mark"].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("[data-page-search-bar]")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      const marks: HTMLElement[] = [];
      const lowerSearch = searchText.toLowerCase();

      textNodes.forEach((textNode) => {
        const text = textNode.textContent || "";
        const lowerText = text.toLowerCase();
        let idx = lowerText.indexOf(lowerSearch);
        if (idx === -1) return;

        const frag = document.createDocumentFragment();
        let lastIdx = 0;

        while (idx !== -1) {
          frag.appendChild(document.createTextNode(text.slice(lastIdx, idx)));
          const mark = document.createElement("mark");
          mark.setAttribute("data-page-search", "true");
          mark.className = "bg-primary/30 text-foreground rounded-sm px-0.5";
          mark.textContent = text.slice(idx, idx + searchText.length);
          frag.appendChild(mark);
          marks.push(mark);
          lastIdx = idx + searchText.length;
          idx = lowerText.indexOf(lowerSearch, lastIdx);
        }

        frag.appendChild(document.createTextNode(text.slice(lastIdx)));
        textNode.parentNode?.replaceChild(frag, textNode);
      });

      marksRef.current = marks;
      setMatchCount(marks.length);
      if (marks.length > 0) {
        setCurrentMatch(1);
        marks[0].scrollIntoView({ behavior: "smooth", block: "center" });
        marks[0].className = "bg-primary/60 text-foreground rounded-sm px-0.5 ring-2 ring-primary";
      }
      } catch (err) {
        console.warn("PageSearch: highlight failed", err);
      }
    },
    [clearHighlights]
  );

  const goToMatch = useCallback(
    (index: number) => {
      const marks = marksRef.current;
      if (marks.length === 0) return;
      marks.forEach((m) => {
        m.className = "bg-primary/30 text-foreground rounded-sm px-0.5";
      });
      const wrapped = ((index - 1 + marks.length) % marks.length) + 1;
      setCurrentMatch(wrapped);
      const target = marks[wrapped - 1];
      target.className = "bg-primary/60 text-foreground rounded-sm px-0.5 ring-2 ring-primary";
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    []
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => highlight(query), 300);
    return () => clearTimeout(timer);
  }, [query, highlight]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearHighlights();
  }, [clearHighlights]);

  return (
    <div data-page-search-bar className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={label}
          className="w-full pl-9 pr-3 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      {query && (
        <>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {matchCount > 0 ? `${currentMatch}/${matchCount}` : "0 results"}
          </span>
          {matchCount > 1 && (
            <div className="flex gap-0.5">
              <button
                onClick={() => goToMatch(currentMatch - 1)}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground"
                aria-label="Previous match"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToMatch(currentMatch + 1)}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground"
                aria-label="Next match"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
          <button
            onClick={() => {
              setQuery("");
              clearHighlights();
            }}
            className="p-1 rounded hover:bg-muted/50 text-muted-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
