"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    document.title = "Murder Mystery Studio";

    // Favicon - use cropped icon without white space
    const faviconUrl =
      "https://raw.createusercontent.com/1fe2a88d-8dd2-4629-a3bd-3470ce3544cc/";
    const existingFavicon = document.querySelector("link[rel='icon']");
    if (existingFavicon) {
      existingFavicon.href = faviconUrl;
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
    }

    // Apple touch icon
    const appleIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (!appleIcon) {
      const appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      appleLink.href = faviconUrl;
      document.head.appendChild(appleLink);
    }

    // Open Graph meta tags
    const ogTags = {
      "og:title": "Murder Mystery Studio",
      "og:description": "Create your perfect murder mystery party in seconds",
      "og:image":
        "https://raw.createusercontent.com/2146ee47-b53a-45fa-8ad1-35912c76d21a/",
      "og:type": "website",
      "twitter:card": "summary_large_image",
      "twitter:title": "Murder Mystery Studio",
      "twitter:description":
        "Create your perfect murder mystery party in seconds",
      "twitter:image":
        "https://raw.createusercontent.com/2146ee47-b53a-45fa-8ad1-35912c76d21a/",
    };

    Object.entries(ogTags).forEach(([key, value]) => {
      const isOg = key.startsWith("og:");
      const selector = isOg ? `meta[property='${key}']` : `meta[name='${key}']`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        if (isOg) {
          tag.setAttribute("property", key);
        } else {
          tag.setAttribute("name", key);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    });

    // Also add description meta tag
    let descTag = document.querySelector("meta[name='description']");
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute(
      "content",
      "Create your perfect murder mystery party in seconds",
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
