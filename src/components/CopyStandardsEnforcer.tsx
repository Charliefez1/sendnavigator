import { useEffect } from "react";
import { normaliseCopyToUkEnglish } from "@/lib/copy-standards";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "KBD", "SAMP", "TEXTAREA", "INPUT"]);

function shouldSkipNode(node: Text): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  if (SKIP_TAGS.has(parent.tagName)) return true;
  if (parent.closest("[data-copy-normalise='off']")) return true;
  return !node.nodeValue?.trim();
}

function normaliseTextNode(node: Text) {
  if (shouldSkipNode(node)) return;
  const original = node.nodeValue ?? "";
  const normalised = normaliseCopyToUkEnglish(original);
  if (normalised !== original) {
    node.nodeValue = normalised;
  }
}

function normaliseTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    normaliseTextNode(root as Text);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    normaliseTextNode(current as Text);
    current = walker.nextNode();
  }
}

export function CopyStandardsEnforcer() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    normaliseTree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
          normaliseTextNode(mutation.target as Text);
          continue;
        }

        for (const node of Array.from(mutation.addedNodes)) {
          normaliseTree(node);
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
