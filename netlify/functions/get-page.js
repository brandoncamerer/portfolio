import { getStore } from "@netlify/blobs";

export default async (request) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Missing slug" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const store = getStore("markdown-pages");
    const rawPage = await store.get(slug);

    if (!rawPage) {
      return new Response(JSON.stringify({ error: "Page not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(rawPage, {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Could not load page",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
