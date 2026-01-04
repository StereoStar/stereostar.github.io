// Game state
let fucks = 0;
let fucksPerClick = 1;
let upgradeCost = 10;
let fucksPerSecond = 0;

let autoCost = 50;

// DOM elements
const fuckCountSpan = document.getElementById('fuck-count');
const clickButton = document.getElementById('click-button');
const upgradeButton = document.getElementById('upgrade-click');
const upgradeCostSpan = document.getElementById('upgrade-cost');

const autoButton = document.getElementById('auto-clicker');
const autoCostSpan = document.getElementById('auto-cost');

const feedPanel = document.getElementById('feed-panel');
const feedInner = document.getElementById('feed-inner');



// Update the UI based on current state
function updateUI() {
  fuckCountSpan.textContent = fucks;
  upgradeCostSpan.textContent = upgradeCost;
  autoCostSpan.textContent = autoCost;

  // Enable upgrade button only if player can afford it
  upgradeButton.disabled = fucks < upgradeCost;
  autoButton.disabled = fucks < autoCost;
}

// Handle click button
clickButton.addEventListener('click', () => {
  fucks += fucksPerClick;
  updateUI();
  addFeedPost();
});

// Handle upgrade button
upgradeButton.addEventListener('click', () => {
  if (fucks >= upgradeCost) {
    fucks -= upgradeCost;
    fucksPerClick += 1;
    // Increase cost for next upgrade
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateUI();
  }
});

// Handle auto button
autoButton.addEventListener('click', () => {
  if (fucks >= autoCost) {
    fucks -= autoCost;
    fucksPerSecond += 1;
    autoCost = Math.floor(autoCost * 2);
    updateUI();
  }
});

// Create feed posts
function createFeedPostElement() {
  const post = document.createElement('div');
  post.className = 'feed-post';

  const avatar = document.createElement('div');
  avatar.className = 'feed-avatar';

  const content = document.createElement('div');
  content.className = 'feed-content';

  const lineCount = Math.floor(Math.random() * 4) + 1; // 1–4 lines

  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'feed-line';

    const widthPercent = 60 + Math.random() * 40; // 60–100%
    line.style.width = widthPercent + '%';

    content.appendChild(line);
  }

  post.appendChild(avatar);
  post.appendChild(content);
  return post;
}

// Add post
function addFeedPost() {
  const postEl = createFeedPostElement();
  feedInner.appendChild(postEl);
  cleanupFeedPosts();

  const SLIDE_DISTANCE = postEl.offsetHeight || 60;

  // Step 1: set starting offset, no transition
  feedInner.style.transition = 'none';
  feedInner.style.transform = `translateY(${SLIDE_DISTANCE}px)`;

  // Force layout so the browser applies this transform
  void feedInner.offsetHeight;

  // Step 2: on the next frame, enable transition and move back to 0
  requestAnimationFrame(() => {
    feedInner.style.transition = 'transform 0.25s ease-out';
    feedInner.style.transform = 'translateY(0)';
  });
}

// Remove posts that have scrolled out of view
function cleanupFeedPosts() {
  const OVERFLOW_MARGIN = 60;   // allow a bit of hidden content
  const maxRemovals = 100;
  let removals = 0;

  while (
    feedInner.scrollHeight > feedPanel.clientHeight + OVERFLOW_MARGIN &&
    feedInner.firstChild &&
    removals < maxRemovals
  ) {
    feedInner.removeChild(feedInner.firstChild);
    removals++;
  }
}


// Game loop: runs every 1000 ms
setInterval(() => {
  fucks += fucksPerSecond;
  if (fucksPerSecond >= 1) {
    addFeedPost();
  }
  updateUI();
}, 1000)