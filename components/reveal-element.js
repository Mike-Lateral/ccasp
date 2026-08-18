class RevealElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        :host(.visible) {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
          :host {
            transition: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
      <slot></slot>
    `;
  }
  
  connectedCallback() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });
    
    observer.observe(this);
  }
}

customElements.define('reveal-element', RevealElement);


class KeyCard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="track-card">
            <div class="track-card-image">
              <img src="assets/understand.jpg" alt="Understanding the Climate Change Act" loading="lazy">
              <div class="track-card-color-bar bg-track-understand"></div>
            </div>
            <div class="track-card-content">
              <p class="text-xs font-semibold uppercase tracking-wider text-track-understand">
                <slot name="for">
                For municipalities & districts
                </slot>
              </p>
              <h3 class="text-xl font-bold leading-snug mt-3"><slot name="title">
                Understand the Climate Change Act & Planning Framework
                </slot>
              </h3>
              <p class="mt-3 text-sm text-muted-foreground"><slot name="description">
                Get oriented with the big picture: what the Climate Change Act requires of districts and municipalities, and how CCASP provides a structured, step-by-step approach to implementation at sub-national level.
                </slot>
              </p>
              <div class="mt-5 rounded-xl p-4 bg-track-understand-soft">
                <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key takeaway
                </p>
                <p class="mt-1.5 text-sm"><slot name="takeaway">
                  For anyone wanting a high-level understanding of how the Act works and how CCASP fits South Africa's climate action strategy.
                </slot>
                </p>
              </div>
              <a href="understand.html" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-track-understand hover:underline">
                Explore this pathway
                <span class="transition-transform">→</span>
              </a>
            </div>
          </div>`;
  }
  connectedCallback() {}
}
customElements.define(`ccasp-keycard`, KeyCard);