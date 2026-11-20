# Manual PDF maintenance

The printable English and French manuals are generated from Hugo's rendered pages,
including shortcodes and images. The order and membership come from
`layouts/_partials/lab_manual_tree.html`, shared with the live manual and site index.
Add new manual sections there; do not maintain a separate PDF chapter list.

One-time setup: `pnpm install` and `pnpm exec playwright install chromium`.
Run `pnpm run build` to rebuild the site and both PDFs. After a standalone Hugo
build, `pnpm run manual:pdf` regenerates only the PDFs. Outputs are
`public/downloads/sage-lab-manual-en.pdf` and `sage-lab-manual-fr.pdf`.
Generated PDFs are deployment artifacts, not source files to commit.

The GitHub build generates both PDFs on every deployment and pull-request build.
It fails if a chapter or image is missing. No manual reminder is required.
Check pagination after changing print styles, adding a new shortcode, or adding
unusually wide tables. Local preview alone does not regenerate PDFs; run the build
before reviewing PDF downloads. Keep the original page URLs stable: online links
and the manual remain the authoritative current version.
