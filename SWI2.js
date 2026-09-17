// ============================================================
// PORTFOLIO DATA
// Add your Cloudinary image URLs to the `images` arrays below.
// `desc` is where you write the project description.
// ============================================================
const projects = [
  {
    title: "Emirates Hills Villa — Grand Entrance Gate",
    subtitle: "Luxury Residential · Dubai",
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
    desc: "A large-scale perimeter fencing commission for a private estate in Umm Al Quwain, spanning several hundred metres of boundary line. Cast aluminum post caps and CNC-cut infill panels were paired with a wrought-iron top rail to balance longevity in the coastal climate with the client\u2019s request for a traditional silhouette. Installed in phases alongside the estate\u2019s main gate.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_drn5lm.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171553_iztnsw.png"
    ]
  }
];

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
// ============================================================
function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach((p, pIdx) => {
    const imgs = (p.images && p.images.length) ? p.images : [''];
    imgs.forEach((src, iIdx) => {
      const tile = document.createElement('div');
      tile.className = 'ig-tile';
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
