/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import Head from "next/head";
import Image from "next/image";

import Link from "next/link";

export const siteTitle = "blog-nextjs";
import Navbar from "../navbar/index.js";

import { css } from "@emotion/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
        `}
      >
        {children}
      </div>
    </>
  );
}
