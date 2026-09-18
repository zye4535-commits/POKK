const RSS = "https://rss.blog.naver.com/woojootax01.xml";

export async function onRequest() {
  try {
    const res = await fetch(RSS, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; WoojooTaxSite/1.0)" },
      cf: { cacheTtl: 600, cacheEverything: true },
    });

    if (!res.ok) {
      return new Response("upstream " + res.status, { status: 502 });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response("fetch failed", { status: 502 });
  }
}
