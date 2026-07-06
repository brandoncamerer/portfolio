import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { StarsCanvas } from "./canvas";

const MarkdownViewPage = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(null);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const loadPage = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/get-page?slug=${encodeURIComponent(slug)}`
        );

        if (!response.ok) {
          setStatus("Page not found.");
          return;
        }

        const data = await response.json();
        setPage(data);
        setStatus("");
      } catch (error) {
        setStatus("Could not load page.");
      }
    };

    loadPage();
  }, [slug]);

  if (!page) {
    return (
      <div className="relative z-0 bg-primary min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] text-[36px]">
            {status}
          </h1>

          <p className="text-secondary text-[17px] leading-[30px] mt-4">
            No saved Markdown page exists for /{slug}.
          </p>

          <Link
            to="/markdown"
            className="inline-block mt-8 bg-[#915EFF] py-3 px-6 rounded-xl text-white font-bold"
          >
            Create a Markdown Page
          </Link>
        </div>

        <StarsCanvas />
      </div>
    );
  }

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link to="/markdown" className="text-secondary underline">
          ← Back to Markdown Creator
        </Link>

        <h1 className="text-white font-black md:text-[60px] sm:text-[50px] text-[36px] mt-8 mb-8">
          {page.title}
        </h1>

        <article className="markdown-preview bg-tertiary rounded-2xl p-8 border border-white/10">
          <ReactMarkdown>{page.markdown}</ReactMarkdown>
        </article>
      </div>

      <StarsCanvas />
    </div>
  );
};

export default MarkdownViewPage;
