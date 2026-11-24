const topics = {
  network: {
    description: 'Built a full user-space TCP and chunked-streaming HTTP stack in C/C++ from socket fundamentals up to route handling and streaming.',
    label: 'Explore FoggyTCP',
    href: '#work'
  },
  code: {
    description: 'Writing C, C++, and Python to understand systems where packets, processes, and hardware interfaces meet.',
    label: 'See open-source work',
    href: '#open-source'
  },
  linux: {
    description: 'Building reproducible Linux environments with Git, Vagrant, and VirtualBox to debug packet loss and congestion deterministically.',
    label: 'See how I test',
    href: '#work'
  },
  hardware: {
    description: 'Built an autonomous Arduino Nano line-tracking robot car with optical sensors and calibrated PWM motor control — passed in one take.',
    label: 'Explore robot car',
    href: '#hardware-work'
  },
  open: {
    description: '5 merged pull requests across Activist.org, Kinto (Mozilla Services), and OffPDF covering security, PostgreSQL indexing, and AI licensing.',
    label: 'Explore open source',
    href: '#open-source'
  },
  tcp: {
    description: 'Implemented sliding windows, fast retransmission, congestion control, HTTP route registration, and chunked streaming over user-space TCP.',
    label: 'Explore FoggyTCP',
    href: '#work'
  }
};

const places = {
  hkust: {
    name: 'HKUST',
    role: 'BEng Electronic Engineering · 2024–2028',
    description: 'Coursework spanning Computer Networks, Signals & Systems, and analog/digital circuit labs.',
    href: '#about'
  },
  tcp: {
    name: 'FoggyTCP & FoggyHTTP',
    role: 'Systems & Networking Project · Fall 2026',
    description: 'Built a user-space TCP protocol and chunked-streaming HTTP server in C/C++ with sliding windows, loss recovery, and congestion control.',
    href: '#work'
  },
  robot: {
    name: 'Robot Car',
    role: 'Hardware & Embedded Project · Fall 2025',
    description: 'Arduino Nano autonomous line-tracking vehicle with optical sensors and differential PWM control; cleared all 17 tasks in ~20s on the first take.',
    href: '#hardware-work'
  },
  kinto: {
    name: 'Kinto',
    role: 'Open-source contributor · 2026',
    description: 'Repaired failing Read the Docs builds (#3803) and documented PostgreSQL GIN/B-tree index tuning (#3802) for Mozilla’s storage service.',
    href: '#open-source'
  },
  offpdf: {
    name: 'OffPDF',
    role: 'Open-source contributor · 2026',
    description: 'Authored a local AI runtime and model licensing matrix across 11 candidates using primary license texts (#127).',
    href: '#open-source'
  },
  activist: {
    name: 'Activist.org',
    role: 'Open-source contributor · 2026',
    description: 'Upgraded Vue to 3.5.42 for XSS remediation (#2457) and aligned Vitest coverage-v8 (#2464), verified with 1,906 unit tests.',
    href: '#open-source'
  }
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const topicButtons = [...document.querySelectorAll('.floating-word')];
const topicDescription = document.querySelector('#topic-description');
const topicLink = document.querySelector('#topic-link');

topicButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const topic = topics[button.dataset.topic];
    if (!topic) return;
    topicButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    topicDescription.textContent = topic.description;
    topicLink.innerHTML = `${topic.label} <span aria-hidden="true">↗</span>`;
    topicLink.href = topic.href;
  });
});

const placeButtons = [...document.querySelectorAll('.affiliation')];
const placeName = document.querySelector('#place-name');
const placeRole = document.querySelector('#place-role');
const placeDescription = document.querySelector('#place-description');
const placeLink = document.querySelector('.journey-detail a');

placeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const place = places[button.dataset.place];
    if (!place) return;
    placeButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    placeName.textContent = place.name;
    placeRole.textContent = place.role;
    placeDescription.textContent = place.description;
    placeLink.href = place.href;
  });
});

const filterButtons = [...document.querySelectorAll('.filter')];
const projectRows = [...document.querySelectorAll('.project-row')];
const researchCount = document.querySelector('.research-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visiblePrs = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectRows.forEach((row) => {
      const show = filter === 'all' || row.dataset.topics.split(' ').includes(filter);
      row.hidden = !show;
      if (show) visiblePrs += Number(row.dataset.prs || 1);
    });
    researchCount.textContent = `${visiblePrs} merged pull request${visiblePrs === 1 ? '' : 's'}`;
  });
});

const motionButton = document.querySelector('.motion-toggle');
const motionLabel = document.querySelector('.motion-label');

motionButton?.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(!paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume background ideas' : 'Pause background ideas');
  motionLabel.textContent = paused ? 'Motion off' : 'Motion on';
});
