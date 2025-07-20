"use client"; // Ensure the entire layout is client-side rendered
import "./globals.css";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recurring Scheduler</title>
        <script
          src="https://cdn.tailwindcss.com"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      'custom-blue': '#4a90e2',
                      'custom-offwhite': '#f9fafb',
                    },
                  },
                },
              };
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}