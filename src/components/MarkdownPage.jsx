import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { StarsCanvas } from "./canvas";

const DEFAULT_MARKDOWN = `# Doctrine

Write your Markdown here.

## Example Section

- Point one
- Point two
- Point three
`;

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const MarkdownPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Doctrine");
  const [slug, setSlug] = useState("doctrine");
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  const createPage = async () => {
    const finalSlug = slug || "untitled";

    setStatus("Saving...");

    const response = await fetch("/.netlify/functions/save-page", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug: finalSlug,
        markdown,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      setStatus(`Error: ${error.error || "Could not save page"}`);
      return;
    }

    const page = await response.json();

    setStatus("Saved.");
    navigate(`/${page.slug}`);
  };

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-10">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            Markdown Page Creator
          </p>

          <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Create a Markdown Page.
          </h1>

          <p className="text-secondary text-[17px] max-w-3xl leading-[30px] mt-4">
            Choose a title, write Markdown, then create a saved page like /doctrine.
          </p>
        </div>

        <div className="bg-tertiary rounded-2xl p-5 mb-6">
          <label className="text-white font-bold block mb-2">Page Title</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl bg-black-100 text-white p-4 outline-none border border-white/10 mb-4"
            placeholder="Doctrine"
          />

          <p className="text-secondary">
            URL preview:{" "}
            <span className="text-white">
              brandoncamerer.com/{slug || "untitled"}
            </span>
          </p>

          {status && <p className="text-secondary mt-3">{status}</p>}
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="bg-tertiary rounded-2xl p-5">
            <h2 className="text-white text-xl font-bold mb-4">Editor</h2>

            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full min-h-[65vh] rounded-xl bg-black-100 text-white p-5 font-mono text-sm outline-none border border-white/10"
              spellCheck="false"
            />
          </div>

          <div className="bg-tertiary rounded-2xl p-5">
            <h2 className="text-white text-xl font-bold mb-4">Preview</h2>

            <div className="min-h-[65vh] rounded-xl bg-black-100 p-5 border border-white/10 overflow-auto">
              <article className="markdown-preview">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={createPage}
            className="bg-[#915EFF] py-3 px-6 rounded-xl text-white font-bold"
          >
            Create Page
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(markdown)}
            className="bg-tertiary py-3 px-6 rounded-xl text-white font-bold border border-white/10"
          >
            Copy Markdown
          </button>
        </div>
      </div>

      <StarsCanvas />
    </div>
  );
};

export default MarkdownPage;
