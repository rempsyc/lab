// Print Hugo-rendered manual pages, so shortcodes and translations stay authoritative.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';

const root = resolve('public');
const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const home = await readFile(join(root, 'index.html'), 'utf8');
const canonical = home.match(/<link[^>]*rel=["']?canonical["']?[^>]*href=["']?([^\s"'>]+)/i)?.[1];
if (!canonical) throw new Error('Build Hugo first: homepage canonical URL not found.');
const site = new URL(canonical);
const prefix = site.pathname.replace(/\/$/, '');
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (prefix && path.startsWith(prefix + '/')) path = path.slice(prefix.length);
    let file = resolve(root, '.' + path);
    if (!file.startsWith(root + sep)) throw new Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    res.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg'})[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  // No external scripts, tracking, fonts, or embeds are needed for printing.
  await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  await mkdir(join(root, 'downloads'), {recursive:true});
  for (const lang of ['en', 'fr']) {
    const fr = lang === 'fr';
    const title = fr ? 'Guide du labo' : 'Lab Manual';
    const manual = `${prefix}/${fr ? 'fr/guide-labo' : 'lab-manual'}/`;
    await page.goto(origin + manual);
    const groups = await page.locator('main .prose').evaluate(el => Array.from(el.querySelectorAll(':scope > ul > li')).map(li => ({
      title: li.querySelector('strong')?.textContent,
      pages: Array.from(li.querySelectorAll('a')).map(a => ({title:a.textContent, path:new URL(a.href).pathname}))
    })));
    if (!groups.length || groups.some(g => !g.title || !g.pages.length)) throw new Error(`Manual hierarchy missing: ${lang}`);
    const entries = groups.flatMap(g => g.pages);
    const ids = Object.fromEntries(entries.map((e,i) => [e.path, `chapter-${i+1}`]));
    let chapters = '';
    for (const [i, entry] of entries.entries()) {
      const response = await page.goto(origin + entry.path);
      if (!response.ok()) throw new Error(`Missing manual chapter: ${entry.path}`);
      const body = await page.locator('main .prose').evaluate((el, {origin, site, ids, chapter}) => {
        const copy = el.cloneNode(true);
        copy.querySelectorAll('script, iframe, [data-pagefind-filter]').forEach(n => n.remove());
        copy.querySelectorAll('details').forEach(n => n.open = true);
        copy.querySelectorAll('input[type=checkbox]').forEach(n => { const box=document.createElement('span'); box.textContent='☐'; n.replaceWith(box); });
        copy.querySelectorAll('[id]').forEach(n => { n.id = chapter + '-' + n.id; });
        copy.querySelectorAll('a[href]').forEach(a => {
          const url = new URL(a.getAttribute('href'), location.href);
          if (url.origin === origin || url.origin === new URL(site).origin) {
            const id = ids[url.pathname];
            a.setAttribute('href', id ? '#' + id + (url.hash ? '-' + decodeURIComponent(url.hash.slice(1)) : '') : new URL(url.pathname + url.search + url.hash, site).href);
          }
        });
        copy.querySelectorAll('img').forEach(img => { img.src=new URL(img.getAttribute('src'), location.href).href; img.removeAttribute('loading'); img.removeAttribute('srcset'); });
        return copy.innerHTML;
      }, {origin, site:site.href, ids, chapter:ids[entry.path]});
      chapters += `<section class="chapter" id="${ids[entry.path]}"><p class="eyebrow">${i+1} / ${entries.length}</p><h1>${escape(entry.title)}</h1><p class="online"><a href="${new URL(entry.path, site).href}">${fr ? 'Lire en ligne' : 'Read online'}</a></p>${body}</section>`;
    }
    const date = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Toronto', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
    const toc = groups.map(g => `<li><strong>${escape(g.title)}</strong><ul>${g.pages.map(e => `<li><a href="#${ids[e.path]}">${escape(e.title)}</a></li>`).join('')}</ul></li>`).join('');
    await page.setContent(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>${title}</title><style>
      @page { size: A4; margin: 20mm 19mm 22mm; }
      * { box-sizing: border-box; } body { font: 10.5pt/1.55 Georgia, 'Times New Roman', serif; color: #171717; }
      h1,h2,h3,.eyebrow,.online { font-family: Arial,sans-serif; } h1 { font-size:25pt; line-height:1.18; margin:0 0 12pt; } h2 { font-size:16pt; margin:22pt 0 8pt; } h3 { font-size:12pt; margin:15pt 0 6pt; }
      h1,h2,h3,strong { break-after:avoid; } p,li { orphans:3; widows:3; } a { color:#222; text-decoration:underline; overflow-wrap:anywhere; }
      p { margin:0 0 9pt; } ul,ol { padding-left:20pt; } li { margin-bottom:5pt; } img { max-width:100%; height:auto; max-height:175mm; object-fit:contain; } figure { margin:14pt 0; break-inside:avoid; } figcaption,.online { font-size:9pt; color:#555; }
      table { width:100%; border-collapse:collapse; font-size:9pt; margin:12pt 0; } th,td { border:1px solid #bbb; padding:6pt; vertical-align:top; } tr { break-inside:avoid; } thead { display:table-header-group; } blockquote { border-left:2pt solid #aaa; padding-left:12pt; margin-left:0; }
      .cover { break-after:page; padding-top:35mm; } .cover img { width:35mm; margin-bottom:15mm; } .cover h1 { font-size:38pt; } .cover p { margin-top:14pt; } .contents { break-after:page; } .contents > ul { padding-left:0; list-style:none; } .contents > ul > li { margin:12pt 0; } .contents ul ul { margin-top:5pt; }
      .chapter { break-before:page; } .eyebrow { font-size:9pt; letter-spacing:1pt; color:#666; } pre,code { white-space:pre-wrap; overflow-wrap:anywhere; font-size:9pt; } .sage-heading-link { text-decoration:none; }
      </style><body><section class="cover"><img src="${origin}${prefix}/logo.svg" alt=""><p>SAGE Lab · UQAR</p><h1>${title}</h1><p>${fr ? 'Recherche, apprentissage et vie au labo' : 'Research, learning, and working together'}</p><p>${fr ? 'Version du' : 'Generated'} ${date}</p><p><a href="${new URL(manual, site).href}">${fr ? 'Consulter la version en ligne' : 'Visit the online manual'}</a></p></section><section class="contents"><h1>${fr ? 'Table des matières' : 'Contents'}</h1><ul>${toc}</ul></section>${chapters}</body></html>`, {waitUntil:'load'});
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all(Array.from(document.images).map(img => img.decode().catch(() => { throw new Error('Image failed: '+img.src); }))); });
    const output = join(root, 'downloads', `sage-lab-manual-${lang}.pdf`);
    await page.pdf({path:output, printBackground:true, displayHeaderFooter:true, headerTemplate:'<span></span>', footerTemplate:`<div style="font:9px Arial;width:100%;text-align:center;color:#666">SAGE Lab · ${title} &nbsp; <span class="pageNumber"></span> / <span class="totalPages"></span></div>`, tagged:true, outline:true});
    console.log(`${output}: ${entries.length} chapters`);
  }
} finally { await browser?.close(); server.close(); }
