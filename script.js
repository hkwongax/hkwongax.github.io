const topics = {
  network: {
    description: 'Building a user-space TCP stack in C++ and learning how timing, loss, and congestion shape reliable networking.',
    label: 'Explore FoggyTCP',
    href: '#work'
  },
  code: {
    description: 'Using C, C++, and Python to understand systems at the level where packets, processes, and interfaces meet.',
    label: 'See technical work',
    href: '#open-source'
  },
  linux: {
    description: 'Building reproducible Linux environments with Git, Vagrant, and VirtualBox so changes are easier to test and explain.',
    label: 'See how I test',
    href: '#work'
  },
  hardware: {
    description: 'Circuit labs and Arduino work give me a practical bridge between software behaviour and physical constraints.',
    label: 'More about me',
    href: '#about'
  },
  open: {
    description: 'Merged documentation, dependency, and test improvements across Activist, Kinto, and OffPDF.',
    label: 'Explore open source',
    href: '#open-source'
  },
  tcp: {
    description: 'Working through connection setup, sliding-window transmission, retransmission, and congestion control in a course project.',
    label: 'Explore FoggyTCP',
    href: '#work'
  }
};

const places = {
  hkust: {
    name: 'HKUST',
    role: 'BEng Electronic Engineering · 2024–2028',
    description: 'Building a foundation in networks, systems, circuits, and practical engineering.',
    href: '#about'
  },
  tcp: {
    name: 'FoggyTCP',
    role: 'Course project · 2026–present',
    description: 'Developing a user-space TCP implementation in C++ with a reproducible Linux test environment.',
    href: '#work'
  },
  kinto: {
    name: 'Kinto',
    role: 'Open-source contributor · 2026',
    description: 'Repaired failing documentation builds and contributed PostgreSQL indexing guidance for Mozilla’s storage service.',
    href: '#open-source'
  },
  offpdf: {
    name: 'OffPDF',
    role: 'Open-source contributor · 2026',
    description: 'Researched licence terms for local AI runtimes and candidate models using primary sources.',
    href: '#open-source'
  },
  activist: {
    name: 'Activist.org',
    role: 'Open-source contributor · 2026',
    description: 'Merged frontend dependency security and testing-tool updates with a full regression test pass.',
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
    let visible = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectRows.forEach((row) => {
      const show = filter === 'all' || row.dataset.topics.split(' ').includes(filter);
      row.hidden = !show;
      if (show) visible += 1;
    });
    researchCount.textContent = `${visible} merged pull request${visible === 1 ? '' : 's'}`;
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
