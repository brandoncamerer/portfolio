import { getStore } from "@netlify/blobs";

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    const title = body.title || "Untitled";
    const slug = slugify(body.slug || title);
    const markdown = body.markdown || "";
    const updatedAt = new Date().toISOString();

    if (!slug) {
      return new Response(JSON.stringify({ error: "Missing slug" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const store = getStore("markdown-pages");

    const page = {
      title,
      slug,
      markdown,
      updatedAt,
    };

    await store.set(slug, JSON.stringify(page), {
      metadata: {
        title,
        slug,
        updatedAt,
      },
    });

    return new Response(JSON.stringify(page), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Could not save page",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
