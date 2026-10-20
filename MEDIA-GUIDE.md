# Media and contact maintenance — v2.1.0

## Content
- Appointment phone: +989124917054 (۰۹۱۲۴۹۱۷۰۵۴).
- Address: تهران، خیابان شریعتی، نبش کوچه شهید جعفرزاده، پلاک ۴۹۲
- Map: address-based Google Maps search and directions. No verified coordinates were supplied; the result is not a verified office pin.
- Email preserved from the existing repository.
- No social accounts were invented.

## Real media
The three new pages are appreciations.html, gallery.html and videos.html.
They display honest empty states until real material is supplied.
Upload approved image/video files under assets/media/, then edit the matching array in assets/js/media-data.js.
The renderer only allows same-origin files under assets/media/, renders descriptions as text, and supports native video controls without autoplay.

Image entry fields:
- title: required title
- src: required path to an uploaded PNG, JPG, JPEG, WebP or AVIF
- alt: accessible description (defaults to title)
- description: optional factual caption
- width, height: optional actual positive integer dimensions
- date: optional real Gregorian date in YYYY-MM-DD; rendered in Persian

Video entry fields:
- title, src (MP4 or WebM), description, date
- poster: optional uploaded image path
- captions: optional Persian WebVTT path

Do not add an entry before uploading its file. Use actual records only.
Empty media pages use noindex,follow; after real content is published, replace it with index,follow,max-image-preview:large in the relevant page and add the page to the site's sitemap once the domain is configured.
Increment asset query versions when updating the data or scripts so cached clients get current files.

## Resume
The previously published PDF contains the superseded phone number. It is retired from the public tree in this commit; Git history retains it.
The complete HTML resume remains and supports printing / saving as PDF from the browser, with the current appointment phone and address.

## Outstanding
The uploaded IMG_0619.png logo could not be read because the execution environment is unavailable. No substitute logo was invented or installed; the existing brand icon remains.
Upload the exact logo to this repository (for example assets/images/logo.png) or provide it again when file access is available.

## Verification
Static source checks cover page links, unique IDs, script syntax, schema JSON, new phone values and navigation.
Browser rendering, clipboard permissions, native video playback, map loading and server headers were not tested: no execution/browser environment was available.
