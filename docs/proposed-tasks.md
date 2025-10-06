# Proposed Maintenance Tasks

## Fix Typo
- Update the header logo alt text to correctly spell the brand name as "Smash & Spice" instead of "Smash n Spice" in `src/components/Header.tsx`.

## Fix Bug
- Add the missing "wraps" category (and any other defined categories that are absent) to the category filter options in `src/components/Menu.tsx` so items like the Falafel Wrap can be discovered.

## Correct Documentation
- Align the GitHub Pages deployment guide (`GITHUB_DEPLOYMENT.md`) with the automated `deploy.sh` script: the guide instructs committing the `dist/` directory, while the script copies build artifacts into the repository root before committing.

## Improve Testing
- Introduce unit tests for the site configuration helpers in `src/config/siteConfig.ts` (e.g., `getSiteConfig`) to verify they correctly merge stored configuration with defaults and handle malformed JSON.
