import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";
import { inter, orbitron } from "./fonts";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Bonbon",
  description: "Bonbon",
  themeColor: "#FFFFFF",
  openGraph: {
    title: "Bonbon",
    description: "Bonbon",
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  );
}
