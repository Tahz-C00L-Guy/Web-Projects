// ================================================================
// STAR WROUGHT IRON — WEBSITE CONTENT & LOGIC
// ================================================================
//
// This file has two parts:
//   1. A guide (below) for adding/editing pictures and projects —
//      written for someone who isn't a developer.
//   2. The code that makes the gallery grid, the lightbox, and the
//      Featured Highlights carousel actually work. You shouldn't
//      need to touch anything below the `projects` array unless
//      you're changing how the site behaves, not what it shows.
//
// ----------------------------------------------------------------
// HOW TO ADD NEW PICTURES TO AN EXISTING PROJECT
// ----------------------------------------------------------------
// Find the project in the `projects` array below (search for its
// title) and add another line inside its `images: [ ... ]` list:
//
//   images: [
//     "https://res.cloudinary.com/your-cloud/.../existing-photo.png",
//     "https://res.cloudinary.com/your-cloud/.../NEW-PHOTO-HERE.png"   <-- add like this
//   ]
//
// Rules:
//   - Every image except the LAST one in the list must end with a
//     comma. The last one must NOT have a comma after it.
//   - Paste the full Cloudinary URL, in quotes, exactly as
//     Cloudinary gives it to you.
//   - That's it — save the file. The new photo will automatically
//     show up in the gallery grid on gallery.html and can be
//     clicked open in the lightbox. You don't need to touch
//     gallery.html or SWI2.css for this.
//
// ----------------------------------------------------------------
// HOW TO ADD A COMPLETELY NEW PROJECT
// ----------------------------------------------------------------
// Copy this whole template, paste it into the `projects` array
// (anywhere between the [ and ] below — order doesn't matter), and
// fill in your own details:
//
//   {
//     title: "Your Project Title",
//     subtitle: "Category · Location",
//     category: "Stairs & Railings",
//     desc: "A paragraph describing the project — what it was, " +
//           "who it was for, what makes it interesting. This text " +
//           "shows in the lightbox when someone clicks a photo.",
//     images: [
//       "https://res.cloudinary.com/your-cloud/.../photo1.png",
//       "https://res.cloudinary.com/your-cloud/.../photo2.png",
//       "https://res.cloudinary.com/your-cloud/.../photo3.png"
//     ]
//   },
//
// Important: if you're adding this after an existing project (not
// at the very end of the list), make sure there's a comma `,`
// after the closing `}` of the project BEFORE yours. The very last
// project in the whole list should NOT have a trailing comma after
// its closing `}`.
//
// You don't need to tell the site anything else — a new project
// automatically:
//   - appears in the gallery grid (every one of its photos becomes
//     its own tile)
//   - is clickable, opening the lightbox with its title, subtitle,
//     description and photo thumbnails
//   - appears under the right button when someone filters the
//     gallery by its category (see below)
//   - appears in the Featured Highlights carousel, using its first
//     photo as the cover (see further below if you want to change
//     that)
//
// ----------------------------------------------------------------
// HOW CATEGORIES & THE FILTER BUTTONS WORK
// ----------------------------------------------------------------
// Every project needs a `category` field — it's what the filter
// buttons on gallery.html use to decide which projects to show.
// It must be spelled EXACTLY as one of these five (copy/paste one
// of these lines rather than retyping it, so nothing is misspelled):
//
//   "Stairs & Railings"
//   "Gates & Entrances"
//   "Doors & Screens"
//   "Furniture & Décor"
//   "Custom / Other"
//
// These five are also the CATEGORIES list a few lines below, and
// they must match the filter buttons on gallery.html word-for-word.
// If you ever want to rename a category, add a new one, or remove
// one, you need to change it in BOTH places:
//   1. The CATEGORIES list below in this file.
//   2. The row of <button class="gallery-filter-btn" ...> elements
//      in gallery.html, just above the gallery grid — one button
//      per category, in the same order, plus the "All" button.
// If a project's `category` doesn't match any button (a typo, or a
// category you removed), that project will still show up under
// "All" — it just won't appear when someone filters to a specific
// category. A missing `category` field falls back to "Custom /
// Other" automatically rather than breaking anything.
//
// ----------------------------------------------------------------
// HOW THE GALLERY GRID WORKS (you don't need to edit this part)
// ----------------------------------------------------------------
// gallery.html shows an Instagram-style grid of every image from
// every project, all in one flat list — that's the
// `renderGalleryGrid()` function further down. It loops through
// `projects`, and for each one loops through its `images`, making
// one grid tile per photo. So the grid always has exactly as many
// tiles as the total number of photos across all your projects,
// automatically. There is nothing to update by hand when you add
// photos or projects. The category filter buttons never remove a
// tile from the page — they just fade out the ones that don't match
// and fade in the ones that do (see `applyGalleryFilter()` further
// down if you're curious how that animation works).
//
// ----------------------------------------------------------------
// HOW TO CHANGE THE FEATURED HIGHLIGHTS (the carousel at the top
// of the gallery page)
// ----------------------------------------------------------------
// By default, EVERY project appears once in the Featured Highlights
// carousel, using the FIRST photo in its `images` list as the cover
// image that's shown.
//
// You can control this per project with two OPTIONAL fields. Add
// either of them to a project alongside its other fields (title,
// subtitle, desc, images):
//
//   1) Use a different photo as that project's carousel cover,
//      without reordering its `images` list:
//
//        featuredImage: "https://res.cloudinary.com/.../photo2.png"
//
//      The URL must be one of the URLs already in that project's
//      `images` list — copy/paste it rather than retyping it.
//
//   2) Leave a project OUT of the carousel entirely (it will still
//      show normally in the gallery grid):
//
//        featured: false
//
// Example — a project that skips the carousel:
//
//   {
//     title: "Safety Grill — Dubai Police",
//     subtitle: "Fleet Fit-Out · Dubai",
//     desc: "...",
//     images: [ "https://res.cloudinary.com/.../grill1.png" ],
//     featured: false        // <-- won't appear in Featured Highlights
//   },
//
// Example — a project that shows its 2nd photo in the carousel:
//
//   {
//     title: "Al Safa Villa — Custom Chandelier",
//     subtitle: "Interior Décor · Dubai",
//     desc: "...",
//     images: [
//       "https://res.cloudinary.com/.../wide-shot.png",
//       "https://res.cloudinary.com/.../hero-shot.png"
//     ],
//     featuredImage: "https://res.cloudinary.com/.../hero-shot.png"
//   },
//
// If you don't add either field, nothing changes — the project
// shows in the carousel using its first photo, same as today.
//
// The simplest way to change which photo shows in the carousel,
// for most projects, is just to reorder that project's `images`
// list so the photo you want is listed first — `featuredImage` is
// only needed if you want a different photo in the carousel WITHOUT
// changing which photo shows first in the gallery grid/lightbox.
//
// (For developers: the carousel-building script lives in
// gallery.html, in the <script> block right after SWI2.js loads.
// It reads this data through the `getFeaturedProjects()` helper
// defined below, so it never needs to know about `featured` /
// `featuredImage` directly.)
//
// ================================================================


// ================================================================
// CATEGORIES — the fixed list of categories the filter buttons on
// gallery.html represent, in the order the buttons appear (after
// "All", which isn't a real category and is handled separately).
// See "HOW CATEGORIES & THE FILTER BUTTONS WORK" above before
// editing this list.
// ================================================================
const CATEGORIES = [
  'Stairs & Railings',
  'Gates & Entrances',
  'Doors & Screens',
  'Furniture & Décor',
  'Custom / Other'
];
const DEFAULT_CATEGORY = 'Custom / Other'; // used if a project has no `category` at all

// ================================================================
// PORTFOLIO DATA — the single source of truth for every project
// and photo on the site. See the guide above for how to edit this.
// ================================================================
const projects = [
  {
    title: "Emirates Hills Villa — Grand Entrance Gate",
    subtitle: "Luxury Residential · Dubai",
    category: "Gates & Entrances",
    desc: "A twin-leaf driveway gate forged for a private Emirates Hills estate, built around a scrolled centrepiece and hand-riveted collars. Solid steel box sections carry the structural load while the ornamental scrollwork was shaped cold, piece by piece, to keep the lines crisp. Finished in a bronze-black powder coat with a hand-rubbed copper highlight to match the villa\u2019s façade ironwork.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481368/Screenshot_2026-06-26_172522_ala4yd.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172454_xzwh8v.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172404_qt6tw4.png"
    ]
  },
  {
    title: "Spiral Staircase & Railing System",
    subtitle: "Commercial Tower · Abu Dhabi",
    category: "Stairs & Railings",
    desc: "A full-height spiral staircase and balustrade system installed in a commercial tower lobby in Abu Dhabi. Engineered for daily foot traffic, the stringer and treads are welded from structural steel with a continuous handrail rolled in one piece for a seamless finish. Balusters were laser-cut to a simplified scrollwork pattern to echo the brand\u2019s heritage motifs without overwhelming the modern interior.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172431_sv1wrf.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172318_v09gru.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172349_vako9o.png"
    ]
  },
  {
    title: "Bespoke Iron Chandelier Collection",
    subtitle: "Interior Décor · Sharjah",
    category: "Furniture & Décor",
    desc: "A collection of custom chandeliers for a Sharjah interior fit-out, combining wrought-iron frames with cast detailing at the arms and finials. Each fixture was designed to the client\u2019s ceiling height and room proportions, hand-forged in-house, then hand-wired and fitted on site. Delivered as a matched set across the majlis and dining hall for a consistent, layered lighting scheme.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172258_ykj2zr.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171612_novzmk.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172240_nqinly.png"
    ]
  },
  {
    title: "Mashrabiya Screen — Heritage Villa",
    subtitle: "Restoration · Old Dubai",
    category: "Doors & Screens",
    desc: "Restoration of an original Mashrabiya-style screen on a heritage villa in Old Dubai. The brief called for preserving the existing geometric lattice pattern while replacing corroded sections and reinforcing the frame for long-term durability. Panels were removed, cleaned back to bare metal, repaired, and re-hung with a protective coating matched to the original patina.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171636_ua179j.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172141_bsrojb.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_2_ruhxod.png"
    ]
  },
  {
    title: "Palace Perimeter Fencing — Custom Commission",
    subtitle: "Ultra-Luxury · Umm Al Quwain",
    category: "Custom / Other",
    desc: "A large-scale perimeter fencing commission for a private estate in Umm Al Quwain, spanning several hundred metres of boundary line. Cast aluminum post caps and CNC-cut infill panels were paired with a wrought-iron top rail to balance longevity in the coastal climate with the client\u2019s request for a traditional silhouette. Installed in phases alongside the estate\u2019s main gate.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_drn5lm.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171553_iztnsw.png"
    ]
  },
  {
    title: "Black & Gold Scrollwork Staircase",
    subtitle: "Stairs & Railings · Luxury Villa",
    category: "Stairs & Railings",
    desc: "A grand staircase for a private villa, forged in matte black steel with hand-applied gold scrollwork tracing the balustrade from base to landing. Classic acanthus and scroll motifs were shaped individually and riveted into a continuous rail, giving the piece the weight and presence of a palace commission while staying true to the villa's interior palette.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058701/WhatsApp_Image_2026-09-15_at_3.57.18_PM_3_elx1g7.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058702/WhatsApp_Image_2026-09-15_at_3.57.18_PM_2_h2pvqk.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058702/WhatsApp_Image_2026-09-15_at_3.57.18_PM_1_kd0omc.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058704/WhatsApp_Image_2026-09-15_at_3.57.17_PM_1_o6n4lg.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058706/WhatsApp_Image_2026-09-15_at_3.57.14_PM_fmjqtx.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058707/WhatsApp_Image_2026-09-15_at_3.57.13_PM_b3qbrb.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058709/WhatsApp_Image_2026-09-15_at_3.57.11_PM_fuodgd.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058710/WhatsApp_Image_2026-09-15_at_3.56.59_PM_fjlbcu.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058711/WhatsApp_Image_2026-09-15_at_3.56.53_PM_1_nxf1i7.jpg"
    ]
  },
  {
    title: "Gold Floral Rose Railing",
    subtitle: "Stairs & Railings · Palace-Style Interior",
    category: "Stairs & Railings",
    desc: "A palace-style balustrade built around a repeating rose-and-vine motif, hand-forged in gold-finished steel. Each floral panel was shaped and assembled separately before being fitted to a continuous rail, giving the staircase an ornate, heirloom character suited to formal reception spaces.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058720/WhatsApp_Image_2026-09-15_at_3.56.49_PM_m2mbga.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058721/WhatsApp_Image_2026-09-15_at_3.56.48_PM_3_zvbb2a.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058723/WhatsApp_Image_2026-09-15_at_3.56.48_PM_gtotut.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058728/WhatsApp_Image_2026-09-15_at_3.56.46_PM_nuvlbr.jpg"
    ]
  },
  {
    title: "Modern Industrial Steel Staircase",
    subtitle: "Stairs & Railings · Under Construction",
    category: "Stairs & Railings",
    desc: "A clean-lined industrial staircase currently in fabrication, built from raw structural steel with minimal ornamentation. Straight stringers and simple vertical balusters give a contemporary, functional profile suited to modern interiors and commercial spaces.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058728/WhatsApp_Image_2026-09-15_at_3.56.45_PM_pv5nzu.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058730/WhatsApp_Image_2026-09-15_at_3.56.44_PM_ox7dlq.jpg"
    ]
  },
  {
    title: "Balcony Railing Installation",
    subtitle: "Stairs & Railings · On-Site Fit-Out",
    category: "Stairs & Railings",
    desc: "An on-site balcony railing installation, fabricated to precise measurements and fitted to secure structural anchors for long-term durability and everyday safety.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058719/WhatsApp_Image_2026-09-15_at_3.56.51_PM_2_fyxjew.jpg"
    ]
  },
  {
    title: "Peacock Motif Glass Entrance Doors",
    subtitle: "Doors & Screens · Ornamental Entrance",
    category: "Doors & Screens",
    desc: "A pair of glass-panel entrance doors framed in wrought iron, featuring a hand-forged peacock and bird motif worked into the upper panels. The ironwork combines fine scrollwork with figurative detailing, giving the entrance a distinctive, one-of-a-kind focal point.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058689/WhatsApp_Image_2026-09-15_at_3.57.22_PM_3_tqykwb.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058689/WhatsApp_Image_2026-09-15_at_3.57.23_PM_behfeq.jpg"
    ]
  },
  {
    title: "Red & Mint Eagle Motif Double Doors",
    subtitle: "Doors & Screens · Workshop Piece",
    category: "Doors & Screens",
    desc: "A bold double-door commission finished in red and mint with a hand-forged eagle centrepiece, photographed in the workshop ahead of installation. The colour treatment and figurative ironwork make this a striking statement entrance.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058690/WhatsApp_Image_2026-09-15_at_3.57.20_PM_2_gixrxf.jpg"
    ]
  },
  {
    title: "Elegant Arched Double Doors",
    subtitle: "Doors & Screens · Design Reference",
    category: "Doors & Screens",
    desc: "A design reference for an elegant arched double-door entrance, showcasing the proportions and detailing used as a starting point for custom client commissions in this style.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058691/WhatsApp_Image_2026-09-15_at_3.57.20_PM_1_vo4g7f.jpg"
    ]
  },
  {
    title: "Luxury Villa Entrance — Ornate Metal Doors",
    subtitle: "Doors & Screens · Luxury Residential",
    category: "Doors & Screens",
    desc: "A grand villa entrance featuring ornate wrought-iron doors set within a matching frame, combining scrollwork detailing with a substantial, formal silhouette suited to a statement front entrance.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058693/WhatsApp_Image_2026-09-15_at_3.57.20_PM_rd83nb.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058695/WhatsApp_Image_2026-09-15_at_3.57.19_PM_4_txcaqq.jpg"
    ]
  },
  {
    title: "Violin-Shaped Wrought Iron Stands",
    subtitle: "Furniture & Décor · Room Dividers",
    category: "Furniture & Décor",
    desc: "A pair of decorative wrought-iron stands shaped like violins, designed to double as freestanding room dividers or display pieces. Each silhouette was hand-shaped and welded for a fluid, sculptural outline.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058689/WhatsApp_Image_2026-09-15_at_3.57.22_PM_2_xwka67.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058689/WhatsApp_Image_2026-09-15_at_3.57.22_PM_1_crgu1m.jpg"
    ]
  },
  {
    title: "Gold Rose Chandelier",
    subtitle: "Furniture & Décor · Palace Interior",
    category: "Furniture & Décor",
    desc: "A statement chandelier forged with a repeating gold rose motif, designed for a palace-style interior. Hand-shaped floral arms radiate from a central frame, hand-wired and fitted to match the room's formal, ornamental character.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058723/WhatsApp_Image_2026-09-15_at_3.56.48_PM_1_bt0q0g.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058724/WhatsApp_Image_2026-09-15_at_3.56.47_PM_gor1cu.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058731/WhatsApp_Image_2026-09-15_at_3.56.43_PM_2_unuwvi.jpg"
    ]
  },
  {
    title: "White Villa — Decorative Fence & Gate",
    subtitle: "Gates & Entrances · Luxury Residential",
    category: "Gates & Entrances",
    desc: "A black decorative perimeter fence and matching gate set against a white villa façade. Fine vertical scrollwork panels run the length of the boundary line, framing the property while keeping clean sightlines to the entrance.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058722/WhatsApp_Image_2026-09-15_at_3.56.48_PM_2_z5wqps.jpg"
    ]
  },
  {
    title: "Visionnaire Storefront Fencing",
    subtitle: "Gates & Entrances · Commercial Storefront",
    category: "Gates & Entrances",
    desc: "Custom fencing fabricated for the Visionnaire storefront, pairing durable structural framing with decorative ironwork to give the commercial frontage a refined, branded presence.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058720/WhatsApp_Image_2026-09-15_at_3.56.50_PM_wwl4rg.jpg"
    ]
  },
  {
    title: "Palais de Danse — Hanging Signs",
    subtitle: "Custom / Other · Event Signage",
    category: "Custom / Other",
    desc: "A set of hand-forged hanging signs created for the Palais de Danse, combining custom lettering frames with decorative ironwork so each sign reads clearly while still fitting the venue's ornamental style.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058691/WhatsApp_Image_2026-09-15_at_3.57.21_PM_3_c8dzwk.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058690/WhatsApp_Image_2026-09-15_at_3.57.22_PM_b5cgix.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058690/WhatsApp_Image_2026-09-15_at_3.57.20_PM_3_ltvmfy.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058689/WhatsApp_Image_2026-09-15_at_3.57.20_PM_3_ubtwec.jpg"
    ]
  },
  {
    title: "Palais de Danse — Entrance Canopy",
    subtitle: "Custom / Other · Event Installation",
    category: "Custom / Other",
    desc: "A hand-forged entrance canopy built for the Palais de Danse, framing the venue's main entrance with ornamental ironwork that sets the tone for the space beyond.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058701/WhatsApp_Image_2026-09-15_at_3.57.21_PM_4_hte3wj.jpg"
    ]
  },
  {
    title: "Palais de Danse — Interior Arch & Event Installations",
    subtitle: "Custom / Other · Event Installation",
    category: "Custom / Other",
    desc: "A series of interior arch and installation pieces created for the Palais de Danse, blending decorative ironwork with the venue's event styling to create immersive, photograph-ready focal points throughout the space.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058697/WhatsApp_Image_2026-09-15_at_3.57.19_PM_3_aylheg.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058699/WhatsApp_Image_2026-09-15_at_3.57.19_PM_1_tgyewk.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058699/WhatsApp_Image_2026-09-15_at_3.57.19_PM_2_s8cpty.jpg"
    ]
  },
  {
    title: "Ornate Wrought Iron Dome / Gazebo",
    subtitle: "Custom / Other · Workshop Assembly",
    category: "Custom / Other",
    desc: "A large ornamental dome-style gazebo structure, shown mid-assembly in the workshop. Curved ribs and decorative scrollwork panels were fabricated in sections and fitted together to form the finished domed silhouette.",
    images: [
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058729/WhatsApp_Image_2026-09-15_at_3.56.44_PM_1_b0n5tu.jpg",
      "https://res.cloudinary.com/dt8tx4kz1/image/upload/v1790058730/WhatsApp_Image_2026-09-15_at_3.56.44_PM_1_nmf7fh.jpg"
    ]
  }
  // Add more projects here — copy the template from the guide above
  // and paste it above this line (don't forget a comma after the
  // closing `}` of the project before it).
];

// ================================================================
// FEATURED HIGHLIGHTS HELPER
// Works out which projects appear in the gallery-page carousel, and
// which photo represents each one, based on the optional `featured`
// and `featuredImage` fields described in the guide above. Projects
// that don't set either field behave exactly as before: included,
// using their first photo.
// ================================================================
function getFeaturedProjects() {
  return projects
    .map(function (p, i) { return { project: p, index: i }; })
    // Skip only projects explicitly opted out with `featured: false`.
    .filter(function (item) { return item.project.featured !== false; })
    .map(function (item) {
      const p = item.project;
      const imgs = p.images || [];
      const chosen = p.featuredImage || imgs[0] || '';
      // Find that photo's position in `images` so clicking the
      // carousel slide opens the lightbox on the right image —
      // falls back to the first photo if `featuredImage` doesn't
      // match anything in the list (e.g. a typo).
      let imageIndex = imgs.indexOf(chosen);
      if (imageIndex < 0) imageIndex = 0;
      return { index: item.index, project: p, image: chosen, imageIndex: imageIndex };
    });
}

// ============================================================
// LIGHTBOX ENGINE
// ============================================================
let currentProject = null;
let currentImg = 0;

function openLightbox(index, imgIndex) {
  const p = projects[index];
  currentProject = p;
  currentImg = 0;
  document.getElementById('lb-title').textContent = p.title;
  document.getElementById('lb-subtitle').textContent = p.subtitle;
  document.getElementById('lb-desc').textContent = p.desc;
  renderThumbs(p);
  showImage(imgIndex || 0);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function showImage(i) {
  const p = currentProject;
  const hasImages = p.images && p.images.length > 0;
  const ph = document.getElementById('lb-placeholder');
  const img = document.getElementById('lb-main-img');
  const counter = document.getElementById('lb-counter');

  if (hasImages) {
    currentImg = Math.max(0, Math.min(i, p.images.length - 1));
    ph.style.display = 'none';
    img.style.display = 'block';
    img.src = p.images[currentImg];
    counter.textContent = (currentImg + 1) + ' / ' + p.images.length;
    document.querySelectorAll('.lb-thumb').forEach((t, idx) => {
      t.classList.toggle('active', idx === currentImg);
    });
  } else {
    ph.style.display = 'flex';
    img.style.display = 'none';
    counter.textContent = '— / —';
  }
}

function lbPrev() { showImage(currentImg - 1); }
function lbNext() { showImage(currentImg + 1); }

function renderThumbs(p) {
  const container = document.getElementById('lb-thumbs');
  container.innerHTML = '';
  if (p.images && p.images.length > 0) {
    p.images.forEach((url, i) => {
      const t = document.createElement('div');
      t.className = 'lb-thumb' + (i === 0 ? ' active' : '');
      t.onclick = () => showImage(i);
      const im = document.createElement('img');
      im.src = url; im.alt = 'Project image ' + (i + 1);
      t.appendChild(im);
      container.appendChild(t);
    });
  } else {
    const t = document.createElement('div');
    t.className = 'lb-thumb active';
    t.innerHTML = '<div class="lb-thumb-ph">Add images</div>';
    container.appendChild(t);
  }
}

// Close on backdrop click & Escape key
// (guarded: index.html no longer contains the lightbox markup — only gallery.html does)
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

// ============================================================
// GALLERY PAGE — INSTAGRAM-STYLE GRID RENDER
// Flattens every image across every project into one uniform,
// square-tile grid (Instagram profile-grid style). Each tile
// still opens the shared lightbox, positioned to the exact
// image that was clicked, so `projects` stays the single
// source of truth for project data. No-ops safely if
// #gallery-grid isn't present on the page.
//
// This always shows EVERY image from EVERY project — the
// `featured` / `featuredImage` fields only affect the Featured
// Highlights carousel (see getFeaturedProjects() above), never
// this grid. Filtering by category (below) never removes these
// tiles from the page; it only shows/hides them.
// ============================================================
function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach((p, pIdx) => {
    const category = p.category || DEFAULT_CATEGORY;
    const imgs = (p.images && p.images.length) ? p.images : [''];
    imgs.forEach((src, iIdx) => {
      const tile = document.createElement('div');
      tile.className = 'ig-tile';
      tile.dataset.category = category; // read by applyGalleryFilter() below
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', 'Open ' + p.title + ' image ' + (iIdx + 1) + ' in lightbox');
      tile.innerHTML =
        '<img src="' + src + '" alt="' + p.title + '" loading="lazy">' +
        '<div class="ig-tile-overlay">' +
          '<svg class="ig-tile-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
            '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>' +
          '</svg>' +
        '</div>' +
        '<div class="ig-tile-caption">' + p.title + '</div>';
      tile.addEventListener('click', () => openLightbox(pIdx, iIdx));
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(pIdx, iIdx); }
      });
      grid.appendChild(tile);
    });
  });
}
document.addEventListener('DOMContentLoaded', renderGalleryGrid);

function initGalleryCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (!cat) return;

  const btn = document.querySelector('.gallery-filter-btn[data-category="' + cat + '"]');
  if (btn) btn.click();
}

// ============================================================
// GALLERY PAGE — CATEGORY FILTER BUTTONS + ANIMATION
//
// initGalleryFilters() wires up clicks on the `.gallery-filter-btn`
// buttons in gallery.html (see the guide at the top of this file
// for how those buttons relate to `category` on each project).
//
// applyGalleryFilter() does the actual show/hide, animated with a
// FLIP transition (First-Last-Invert-Play) so that:
//   - tiles leaving the current filter fade out + scale down in
//     place, then are pulled out of the grid's layout flow
//   - tiles entering the current filter fade in + scale up
//   - tiles that stay visible but need to shift into a new grid
//     position GLIDE there smoothly instead of instantly snapping
//     (this is what "FLIP" below refers to — it's a standard,
//     well-known technique for animating layout changes with plain
//     CSS transitions, not a library)
// `prefers-reduced-motion` skips all of this and just shows/hides
// tiles instantly.
// ============================================================
const GALLERY_FILTER_MS = 400; // keep in sync with the opacity/transform transition duration on .ig-tile in SWI2.css

function applyGalleryFilter(category) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const tiles = Array.from(grid.querySelectorAll('.ig-tile'));
  // Normalise for comparison only (trim + lowercase) so a stray typo
  // in a project's `category` doesn't silently break its filter
  // button — the visible label still comes from the button/category
  // text as written, this only affects matching.
  const norm = (s) => (s || '').trim().toLowerCase();
  const wantAll = norm(category) === 'all';
  const shouldShow = (t) => wantAll || norm(t.dataset.category) === norm(category);
  const isInFlow = (t) => !t.classList.contains('ig-tile--hidden') && !t.classList.contains('ig-tile--exiting');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    tiles.forEach((t) => {
      t.classList.remove('ig-tile--entering', 'ig-tile--exiting');
      t.style.position = ''; t.style.left = ''; t.style.top = ''; t.style.width = ''; t.style.height = '';
      t.classList.toggle('ig-tile--hidden', !shouldShow(t));
    });
    return;
  }

  // FIRST — record where every currently-visible tile sits before
  // anything changes.
  const firstRects = new Map();
  tiles.forEach((t) => { if (isInFlow(t)) firstRects.set(t, t.getBoundingClientRect()); });
  const gridRect = grid.getBoundingClientRect();

  // Move the DOM to its new state.
  tiles.forEach((t) => {
    const wasIn = isInFlow(t);
    const willBeIn = shouldShow(t);
    if (wasIn && !willBeIn) {
      // Leaving: freeze it at its current on-screen spot (so removing
      // it from normal flow causes no visible jump), then let its
      // opacity/transform transition (declared on .ig-tile in
      // SWI2.css) fade it out in place.
      const r = firstRects.get(t);
      t.style.position = 'absolute';
      t.style.left = (r.left - gridRect.left) + 'px';
      t.style.top = (r.top - gridRect.top) + 'px';
      t.style.width = r.width + 'px';
      t.style.height = r.height + 'px';
      t.classList.add('ig-tile--exiting');
    } else if (!wasIn && willBeIn) {
      // Entering: rejoin the grid's normal flow, starting invisible —
      // the fade-in itself happens in the "release" step below.
      t.classList.remove('ig-tile--hidden', 'ig-tile--exiting');
      t.style.position = ''; t.style.left = ''; t.style.top = ''; t.style.width = ''; t.style.height = '';
      t.classList.add('ig-tile--entering');
    }
  });

  // LAST — force the browser to commit that new layout, then measure
  // where each still-visible tile actually ended up.
  void grid.offsetHeight;
  tiles.forEach((t) => {
    if (isInFlow(t) && shouldShow(t) && firstRects.has(t)) {
      const first = firstRects.get(t);
      const last = t.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx || dy) {
        // INVERT — instantly (no transition) shift it back to look
        // like it never moved.
        t.style.transition = 'none';
        t.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      }
    }
  });

  // Commit that inverted position as its own frame...
  void grid.offsetHeight;

  // ...then PLAY: release the inverted tiles (they glide to their
  // real position) and fade in the entering tiles, all at once.
  tiles.forEach((t) => {
    if (t.style.transform) { t.style.transition = ''; t.style.transform = ''; }
    if (t.classList.contains('ig-tile--entering')) t.classList.remove('ig-tile--entering');
  });

  // Once the exit fade has actually finished, pull those tiles fully
  // out of the grid's layout (display:none) and clean up the inline
  // styles used to freeze them in place.
  clearTimeout(grid._filterCleanupTimer);
  grid._filterCleanupTimer = setTimeout(function () {
    tiles.forEach((t) => {
      if (t.classList.contains('ig-tile--exiting')) {
        t.classList.remove('ig-tile--exiting');
        t.classList.add('ig-tile--hidden');
        t.style.position = ''; t.style.left = ''; t.style.top = ''; t.style.width = ''; t.style.height = '';
      }
    });
  }, GALLERY_FILTER_MS);
}

function initGalleryFilters() {
  const bar = document.querySelector('.gallery-filters');
  if (!bar) return;
  const buttons = Array.from(bar.querySelectorAll('.gallery-filter-btn'));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      buttons.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      applyGalleryFilter(btn.dataset.category);
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initGalleryCategoryFromURL();
});

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
(function () {
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-mobile-panel');
  if (!toggle || !panel) return;

  function closeMenu() {
    toggle.classList.remove('open');
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    const isOpen = panel.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }
  toggle.addEventListener('click', toggleMenu);
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 640) closeMenu(); });
})();

// Redirect to Thank You page after form submission
// (guarded: only index.html has the contact form)
const contactFormEl = document.getElementById('contact-form');
if (contactFormEl) {
  contactFormEl.addEventListener('submit', function() {
    setTimeout(() => {
      window.location.href = "https://star-wrought-iron.vercel.app/ThankYou.html";
    }, 1800); // 1.8 seconds delay
  });
}
