import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("markdown-pages");
    const { blobs } = await store.list();

    const pages = blobs.map((blob) => ({
      slug: blob.key,
      title: blob.metadata?.title || blob.key,
      updatedAt: blob.metadata?.updatedAt || null,
    }));

    pages.sort((a, b) => a.title.localeCompare(b.title));

    return new Response(JSON.stringify({ pages }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Could not list pages",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
