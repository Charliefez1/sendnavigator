import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function getOrCreateId(key: string, storage: Storage): string {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
}

function getDeviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function usePageView() {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid duplicate tracking for the same path
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;

    // Skip admin pages from analytics
    if (location.pathname.startsWith("/admin")) return;

    const visitorId = getOrCreateId("srn_vid", localStorage);
    const sessionId = getOrCreateId("srn_sid", sessionStorage);

    supabase
      .from("page_views")
      .insert({
        path: location.pathname,
        referrer: document.referrer || null,
        visitor_id: visitorId,
        session_id: sessionId,
        device_type: getDeviceType(),
      })
      .then(({ error }) => {
        if (error) console.error("Page view tracking error:", error);
      });
  }, [location.pathname]);
}
