import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

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
  const [pages, setPages] = useState([]);
  const [editingSlug, setEditingSlug] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!editingSlug) {
      setSlug(slugify(title));
    }
  }, [title, editingSlug]);

  const loadPages = async () => {
    try {
      const response = await fetch("/.netlify/functions/list-pages");

      if (!response.ok) {
        setStatus("Could not load saved pages.");
        return;
      }

      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      setStatus("Could not load saved pages.");
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const loadExistingPage = async (pageSlug) => {
    setStatus("Loading page...");

    try {
      const response = await fetch(
        `/.netlify/functions/get-page?slug=${encodeURIComponent(pageSlug)}`
      );

      if (!response.ok) {
        setStatus("Could not load that page.");
        return;
      }

      const page = await response.json();

      setTitle(page.title || page.slug);
      setSlug(page.slug);
      setMarkdown(page.markdown || "");
      setEditingSlug(page.slug);
      setStatus(`Editing /${page.slug}`);
    } catch (error) {
      setStatus("Could not load that page.");
    }
  };

  const startNewPage = () => {
    setTitle("Doctrine");
    setSlug("doctrine");
    setMarkdown(DEFAULT_MARKDOWN);
    setEditingSlug("");
    setStatus("Creating a new page.");
  };

  const savePage = async () => {
    const finalSlug = editingSlug || slug || "untitled";

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

    setEditingSlug(page.slug);
    setSlug(page.slug);
    setStatus(`Saved /${page.slug}`);

    await loadPages();

    navigate(`/${page.slug}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-gray-500 uppercase tracking-wider text-sm">
            Markdown Admin
          </p>

          <h1 className="text-gray-900 font-black md:text-[56px] sm:text-[44px] text-[32px]">
            Create or Edit Pages
          </h1>

          <p className="text-gray-600 text-[17px] max-w-3xl leading-[30px] mt-4">
            Create new Markdown pages or edit pages you already saved.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] grid-cols-1 gap-6">
          <aside className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-fit">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-gray-900 text-lg font-bold">Saved Pages</h2>

              <button
                onClick={startNewPage}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded-lg font-semibold"
              >
                New
              </button>
            </div>

            {pages.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved pages yet.</p>
            ) : (
              <div className="space-y-2">
                {pages.map((page) => (
                  <button
                    key={page.slug}
                    onClick={() => loadExistingPage(page.slug)}
                    className={`w-full text-left px-3 py-3 rounded-xl border ${
                      editingSlug === page.slug
                        ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-bold">{page.title}</div>
                    <div className="text-xs opacity-70">/{page.slug}</div>
                  </button>
                ))}
              </div>
            )}
          </aside>

          <main>
            <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-200 shadow-sm">
              <label className="text-gray-900 font-bold block mb-2">
                Page Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-gray-50 text-gray-900 p-4 outline-none border border-gray-200 mb-4"
                placeholder="Doctrine"
              />

              <label className="text-gray-900 font-bold block mb-2">
                URL Slug
              </label>

              <input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                disabled={!!editingSlug}
                className="w-full rounded-xl bg-gray-50 text-gray-900 p-4 outline-none border border-gray-200 mb-4 disabled:opacity-60"
                placeholder="doctrine"
              />

              <p className="text-gray-600">
                URL preview:{" "}
                <span className="text-gray-900 font-semibold">
                  brandoncamerer.com/{editingSlug || slug || "untitled"}
                </span>
              </p>

              {editingSlug && (
                <p className="text-gray-500 text-sm mt-2">
                  Editing an existing page. The slug is locked so the page URL
                  does not accidentally change.
                </p>
              )}

              {status && <p className="text-gray-600 mt-3">{status}</p>}
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <h2 className="text-gray-900 text-xl font-bold mb-4">
                  Editor
                </h2>

                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full min-h-[65vh] rounded-xl bg-gray-50 text-gray-900 p-5 font-mono text-sm outline-none border border-gray-200"
                  spellCheck="false"
                />
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm max-h-[75vh] overflow-y-auto">
                <h2 className="text-gray-900 text-xl font-bold mb-4 sticky top-0 bg-white pb-3 z-10">
                  Preview
                </h2>

                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <article className="markdown-preview-light">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={savePage}
                className="bg-[#4f46e5] py-3 px-6 rounded-xl text-white font-bold"
              >
                {editingSlug ? "Update Page" : "Create Page"}
              </button>

              <button
                onClick={() => navigate(`/${editingSlug || slug}`)}
                className="bg-white py-3 px-6 rounded-xl text-gray-900 font-bold border border-gray-200"
              >
                View Page
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(markdown)}
                className="bg-white py-3 px-6 rounded-xl text-gray-900 font-bold border border-gray-200"
              >
                Copy Markdown
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPage;
