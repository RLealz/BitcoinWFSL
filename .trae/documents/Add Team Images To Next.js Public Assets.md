## What I Found
- Existing team images in repo:
  - `c:\Users\homeh\Documents\GitHub\BitcoinWFSL\client\public\team\joao-gomes.jpg`
  - `c:\Users\homeh\Documents\GitHub\BitcoinWFSL\client\public\team\d4rk0s.jpg`
  - `c:\Users\homeh\Documents\GitHub\BitcoinWFSL\client\public\team\placeholder-profile.jpg`
- Next.js serves static files from `public/`; currently, no `c:\Users\homeh\Documents\GitHub\BitcoinWFSL\public` directory exists, so `/team/*.jpg` requests 404.

## Plan
1. Create `public/team/` in the Next.js app root.
2. Copy the three images from `client/public/team/` into `public/team/`.
3. Keep Team component using `/team/*.jpg` paths (already set), so images load without code changes.
4. Run dev and verify that the previous 404s disappear and images render in the Team dialog cards.

## Notes
- No changes to component code are necessary; static asset placement is sufficient.
- If you prefer optimized images, I can convert Team to use `next/image` later, but this is optional.