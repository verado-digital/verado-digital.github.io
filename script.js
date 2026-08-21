// mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.cssText += open ? '' : 'position:absolute;top:100%;left:0;right:0;background:var(--white);flex-direction:column;padding:24px;border-bottom:1px solid var(--line);gap:18px;';
    });
  }

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // work filter (portfolio page)
  const tabs = document.querySelectorAll('.filter-tab');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.work-item').forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.cat === filter) ? '' : 'none';
        });
      });
    });
  }

  // email capture popup
  initPopup();
});

function initPopup(){
  const DISMISS_KEY = 'veradoPopupDismissed';
  if (sessionStorage.getItem(DISMISS_KEY)) return;

  const markup = `
    <div class="popup-overlay" id="popupOverlay" role="dialog" aria-modal="true" aria-labelledby="popupHeadline">
      <div class="popup-modal">
        <button class="popup-close" id="popupClose" aria-label="Close">×</button>
        <div class="popup-visual">
          <span class="eyebrow">Limited Availability</span>
          <div class="growth-bars" aria-hidden="true">
            <div class="bar" style="height:35%"></div>
            <div class="bar" style="height:55%"></div>
            <div class="bar" style="height:40%"></div>
            <div class="bar" style="height:75%"></div>
            <div class="bar" style="height:100%"></div>
          </div>
          <div class="popup-stat">96%<span>Average Client Satisfaction</span></div>
        </div>
        <div class="popup-form-side">
          <div id="popupFormState">
            <span class="eyebrow">Free Store Audit</span>
            <h3 id="popupHeadline">Discover What's<br><em>Costing You Sales.</em></h3>
            <p>Get a personalised breakdown of your store's speed, SEO, and conversion gaps — free, no obligation.</p>
            <form id="popupForm">
              <input type="email" id="popupEmail" placeholder="you@company.com" required autocomplete="email">
              <button type="submit" class="btn btn-gold" style="width:100%;justify-content:center;">Claim My Free Audit →</button>
            </form>
            <span class="popup-fine">No spam. Unsubscribe anytime.</span>
          </div>
          <div class="popup-success" id="popupSuccess">
            <div class="ic">✓</div>
            <h3>You're In.</h3>
            <p>Check your inbox shortly — your free audit request has been received.</p>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', markup);

  const overlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('popupClose');
  const form = document.getElementById('popupForm');
  const formState = document.getElementById('popupFormState');
  const successState = document.getElementById('popupSuccess');
  let shown = false;

  function openPopup(){
    if (shown) return;
    shown = true;
    overlay.classList.add('show');
  }
  function closePopup(){
    overlay.classList.remove('show');
    sessionStorage.setItem(DISMISS_KEY, '1');
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formState.style.display = 'none';
    successState.classList.add('show');
    sessionStorage.setItem(DISMISS_KEY, '1');
    setTimeout(closePopup, 2600);
  });

  // trigger: 6s delay, or exit-intent (mouse leaves top of viewport), whichever first
  const timer = setTimeout(openPopup, 6000);
  document.addEventListener('mouseout', function exitIntent(e){
    if (!e.relatedTarget && e.clientY <= 0) {
      clearTimeout(timer);
      openPopup();
      document.removeEventListener('mouseout', exitIntent);
    }
  });
}

// Tawk.to live chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function(){
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6a881e43b56df5344af1c0fe/1k0hrce1g';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();
