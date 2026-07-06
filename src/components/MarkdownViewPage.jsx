import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

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
      <div className="min-h-screen bg-[#f3f4f6]">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h1 className="text-gray-900 font-black md:text-[48px] sm:text-[40px] text-[32px]">
              {status}
            </h1>

            <p className="text-gray-600 text-[17px] leading-[30px] mt-4">
              No saved Markdown page exists for /{slug}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="markdown-preview-light bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <ReactMarkdown>{page.markdown}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default MarkdownViewPage;
