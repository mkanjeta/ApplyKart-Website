const URL = "https://applykart.co/";
 
function generateSiteMap(slugs) {
    console.log(slugs)
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
        <loc>${URL}</loc>
        <lastmod>2024-01-19T13:18:48+00:00</lastmod>
        <priority>1.00</priority>
    </url>

    <url>
        <loc>https://www.applykart.co/</loc>
        <lastmod>2024-01-19T13:18:48+00:00</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>https://applykart.co/terms</loc>
        <lastmod>2024-01-19T13:18:48+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://applykart.co/privacy</loc>
        <lastmod>2024-01-19T13:18:48+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://applykart.co/contact</loc>
        <lastmod>2024-01-19T13:18:48+00:00</lastmod>
        <priority>0.80</priority>
    </url>
     ${slugs ? slugs.map((slug) => {
         return `
           <url>
               <loc>${`${URL}jobs/${slug.toLowerCase()}`}</loc>
               <priority>0.80</priority>
           </url>
         `;
       })
       .join("") : ""}
   </urlset>
 `;
}
 
export async function getServerSideProps({ res }) {
    let fields_data;
    try {
        //Award
        const response = await fetch('https://buraaq.in/my-api/getSitemapData.php', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        });

        fields_data = await response.json();
        console.log('======>',fields_data);
    } catch {
        console.log('Api not calling');
    }

    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap(fields_data?.data?.slug);
    
    res.setHeader("Content-Type", "text/xml");
    // Send the XML to the browser
    res.write(sitemap);
    res.end();
    
    return {
        props: {},
    };
}
 
export default function SiteMap() {}