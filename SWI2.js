// ============================================================
// PORTFOLIO DATA
// Add your Cloudinary image URLs to the `images` arrays below.
// `desc` is where you write the project description.
// ============================================================
const projects = [
  {
    title: "Emirates Hills Villa — Grand Entrance Gate",
    subtitle: "Luxury Residential · Dubai",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481368/Screenshot_2026-06-26_172522_ala4yd.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172454_xzwh8v.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172404_qt6tw4.png"
    ]
  },
  {
    title: "Spiral Staircase & Railing System",
    subtitle: "Commercial Tower · Abu Dhabi",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481366/Screenshot_2026-06-26_172431_sv1wrf.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172318_v09gru.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172349_vako9o.png"
    ]
  },
  {
    title: "Bespoke Iron Chandelier Collection",
    subtitle: "Interior Décor · Sharjah",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481365/Screenshot_2026-06-26_172258_ykj2zr.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171612_novzmk.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172240_nqinly.png"
    ]
  },
  {
    title: "Mashrabiya Screen — Heritage Villa",
    subtitle: "Restoration · Old Dubai",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
    images: [
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171636_ua179j.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_172141_bsrojb.png",
      "https://res.cloudinary.com/detapf5a7/image/upload/v1782481364/Screenshot_2026-06-26_171908_2_ruhxod.png"
    ]
  },
  {
    title: "Palace Perimeter Fencing — Custom Commission",
    subtitle: "Ultra-Luxury · Umm Al Quwain",
    desc: "Write your project description here. Describe the scope, materials used, design inspiration, client brief and the craftsmanship that went into delivering this piece.",
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

function openLightbox(index) {
  const p = projects[index];
  currentProject = p;
  currentImg = 0;
  document.getElementById('lb-title').textContent = p.title;
  document.getElementById('lb-subtitle').textContent = p.subtitle;
  document.getElementById('lb-desc').textContent = p.desc;
  renderThumbs(p);
  showImage(0);
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
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
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
})

document.getElementById('contact-form').addEventListener('submit', function() {
    // This will run after form is submitted successfully
    setTimeout(() => {
        window.location.href = "https://star-wrought-iron.vercel.app";
    }, 1500); // 1.5 seconds delay so user sees success message
});
