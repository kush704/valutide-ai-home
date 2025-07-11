export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://valucommerce.vercel.app/</loc></url>
  <url><loc>https://valucommerce.vercel.app/ai-dashboard</loc></url>
  <url><loc>https://valucommerce.vercel.app/updates</loc></url>
  <url><loc>https://valucommerce.vercel.app/law-updates</loc></url>
  <url><loc>https://valucommerce.vercel.app/feedback</loc></url>
</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
