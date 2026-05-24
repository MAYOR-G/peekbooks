"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function TurnstileWidget({
  siteKey,
  onToken,
}: {
  siteKey?: string;
  onToken: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!siteKey || !ref.current || !window.turnstile || widgetId.current) {
      return;
    }

    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken(""),
      theme: "light",
    });
  }, [onToken, siteKey]);

  useEffect(() => {
    render();
  }, [render]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div className="min-h-[65px]" ref={ref} />
    </>
  );
}
