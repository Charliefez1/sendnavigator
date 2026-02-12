import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    supabase
      .from("page_views")
      .insert({
        path: location.pathname,
        referrer: document.referrer || null,
      })
      .then(({ error }) => {
        if (error) console.error("Page view tracking error:", error);
      });
  }, [location.pathname]);
}
