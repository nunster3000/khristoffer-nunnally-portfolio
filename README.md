# Khristoffer Nunnally — Portfolio

A responsive static portfolio for CoreRunner, Rydr, Proverbs 31 Cleaning, and DriveCoach. The site is in `public/`; no build step, backend, or API keys are needed.

## Preview

From this directory, run `python3 -m http.server 4174 --bind 127.0.0.1 --directory public`, then open http://127.0.0.1:4174.

## Content and interactions

Personalized for Khristoffer Nunnally, with LinkedIn and email links, for employers and potential clients. Dark/light theme persistence, project filters, copy-email, an animated IDE illustration, project accent lights, and a motion pause control are implemented in plain JavaScript and CSS. Reduced-motion preferences show static code and stop decorative animations.

CoreRunner links to https://corerunner-courier.vercel.app and uses a screenshot of the live demo. Rydr links to https://www.rydr-go.com and uses a screenshot of that live website. DriveCoach still uses a labeled project cover pending approved product screenshots and details. Proverbs 31 Cleaning links to https://proverbs-31-cleaning.vercel.app and includes a live-site screenshot. Its booking, account, and payment interactions are simulated.

## Hosting and updates

Live site: https://khristoffer-nunnally-portfolio.vercel.app

Vercel project: `khristoffer-nunnally-portfolio`, on the owner's Hobby account. This site is static and requires no paid database, API, or server. Vercel Hobby is for personal, non-commercial use and remains subject to its usage limits.

Repository root is the project root. Framework preset: Other. Output Directory: `public`. No build command is required; `vercel.json` supplies the output configuration.

The GitHub integration is connected to `nunster3000/khristoffer-nunnally-portfolio`. Pushes to `main` automatically deploy to production. Other branches receive preview deployments. For manual deployment, run `npx vercel --prod` from this directory while authenticated to the correct account.

## Files

- `public/index.html`: page content and project links.
- `public/styles.css`: responsive design, themes, and accent animations.
- `public/app.js`: project filters, theme persistence, copy-email, and IDE animation.
- `public/assets/`: project screenshots and favicon.
- `vercel.json`: static hosting configuration.

Typography uses Google Fonts with local fallbacks. Project copy avoids unverified usage metrics and commercial results. CoreRunner is a hosted portfolio demo; DriveCoach remains in development.

Official hosting documentation: https://vercel.com/docs/plans/hobby
