# Upload set — Star Wrought Iron compliance update (swi.ae)

Built from the files you uploaded (your filled-in policy wording is kept). Google Fonts is back; the `fonts/` folder is NOT needed.

## Upload these 12 files to the site root (same folder as index.html)
| File | Status | What changed |
|---|---|---|
| `consent.js` | NEW | Cookie banner + map gate. (In your upload it was saved under the name `cookie-policy.html`; the code is unchanged.) |
| `cookie-policy.html` | NEW | The real Cookie Policy page (your file of that name contained the consent.js code, so I rebuilt the page). |
| `privacy-policy.html` | replace | Google Fonts disclosed; `swi.ae`; fonts preloads removed. Your filled-in details kept. |
| `terms-and-conditions.html` | replace | `swi.ae`; Google Fonts link. Your filled-in details kept. |
| `refund-policy.html` | replace | Google Fonts link. |
| `index.html` | replace | Google Fonts link; form redirect `_next` now `https://swi.ae/ThankYou.html`. |
| `gallery.html` | replace | Google Fonts link; "Over 2,000 satisfied clients" line softened; WhatsApp button in a landmark. |
| `ThankYou.html` | replace | Google Fonts link; privacy-note styling; `<main>` landmark. |
| `SWI2.css` | replace | Your original CSS + new styles appended at the bottom (see below). |
| `SWI2.js` | replace | Your original JS + new form handler (no more redirect to the vercel.app URL), lightbox focus fix, image alt text. |
| `vercel.json` | NEW (optional) | Basic security headers. Skip it if you prefer. |

## About SWI2.css
Your original rules are untouched at the top. Two blocks were appended:
- **Part A (required):** styles for the cookie banner, map placeholder, form consent box, footer legal links, policy pages. Doesn't change any existing colour.
- **Part B (optional):** small contrast fixes (slightly lighter faint text, darker button fills) for WCAG 2.1 AA. If you want the old colours exactly, delete everything from the line `PART B` to the end of the file; everything still works.

## swi.ae
All `vercel.app` links are replaced (index.html form `_next`, privacy + terms + cookie pages). `SWI2.js` now uses a relative `ThankYou.html`, so it works on any domain.

## Checks after upload (2 minutes)
1. Private/incognito window on https://swi.ae: banner appears, Accept and Reject look the same.
2. Press **Reject**, scroll to Contact: the map is blocked and shows "Load map". Press **Load map**: the Google map appears.
3. Footer **Cookie settings** reopens the banner.
4. Send a test enquiry with the consent box ticked: you should land on https://swi.ae/ThankYou.html and get the email.
5. If you use Vercel, redeploy; hard-refresh once (Ctrl/Cmd+Shift+R) so old `SWI2.css/js` aren't cached.

## Things to know
- **Google Fonts and privacy.** Loading Google Fonts sends visitors' IP addresses to Google, so I added it to the Privacy Policy and Cookie Policy honestly. It is not behind the cookie banner (the banner only gates the map). If a lawyer or customer objects later, the fix is to self-host the fonts again (I can provide the files).
- **Formspree.** If you ever restrict allowed domains in Formspree, add `swi.ae`.
- **Email domain.** The site's email addresses are `@starwroughtiron.ae`, not `@swi.ae`. Fine if that is intentional; make sure `privacy@starwroughtiron.ae` (used in your Privacy Policy) really receives mail.
- **Hosting.** The policies name Vercel as the host. If swi.ae is hosted elsewhere, update that name.
- The earlier lawyer/owner checklist (licence address, "since 1990", testimonial consent, image rights) still applies.
