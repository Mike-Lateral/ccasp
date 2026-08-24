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
          // console.log(`IntersectionObserver for `, entry);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    });
    
    observer.observe(this);
  }
}

customElements.define('reveal-element', RevealElement);


class KeyCard extends HTMLElement {
  constructor() {
    super();

  }
  connectedCallback() {
    const div = document.createElement(`div`);
    div.setAttribute(`class`,`track-card`);
    div.innerHTML = `
            <div class="track-card-image">
              <img src="assets/understand.jpg" loading="lazy">
              <div class="track-card-color-bar bg-track"></div>
            </div>
            <div class="track-card-content">
              <p class="text-xs font-semibold uppercase tracking-wider text-track">
                <slot name="for"></slot>
              </p>
              <h3 class="text-xl font-bold leading-snug mt-3"><slot name="title">
                Understand the Climate Change Act & Planning Framework
                </slot>
              </h3>
              <p class="mt-3 text-sm text-muted-foreground"><slot name="description">
                Get oriented with the big picture: what the Climate Change Act requires of districts and municipalities, and how CCASP provides a structured, step-by-step approach to implementation at sub-national level.
                </slot>
              </p>
              <div class="mt-5 rounded-xl p-4 bg-track-soft key-takeaway">
                <p class="text-xs uppercase tracking-wider text-muted-foreground">
                  Key takeaway
                </p>
                <p class="mt-1.5 text-sm"><slot name="takeaway">
                  For anyone wanting a high-level understanding of how the Act works and how CCASP fits South Africa's climate action strategy.
                </slot>
                </p>
              </div>
              </div>
            </div>
            <div class="card-bottom">
              <a href="understand.html" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-track explore">
                Explore this guide
                <span class="arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round" 
                    class="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" 
                    aria-hidden="true" 
                    style="transform: translateY(5px);"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </a>
            </div>
          </div>`;
      div.querySelector(`img`).setAttribute(`src`, this.getAttribute(`img`));
      div.querySelector(`a`).setAttribute(`href`, this.getAttribute(`href`));
      this.querySelectorAll("[slot]").forEach(s=>{
       // console.log(`KeyCard has child element: `, s);
       const slot = s.getAttribute(`slot`);
       const res = div.querySelector(`slot[name="${slot}"]`);
       if (!res) {
        console.error(`Failed to find slot "${slot}" in KeyCard`);
       } else {
        res.parentElement.replaceChild(s, res);
       }
      });
    this.appendChild(div);
  }
}
customElements.define(`ccasp-keycard`, KeyCard);