# Climate Action Hub - Static Version

This is a static HTML/CSS/JavaScript version of the Climate Change Act Support Platform (CCASP).

## Features

- **Same content and design** as the original React/TanStack application
- **Web Components** for reusable UI elements (like the reveal animation)
- **Vanilla JavaScript** - no framework dependencies
- **Responsive design** that works on mobile and desktop
- **Accessible** with semantic HTML and proper contrast ratios
- **Performance optimized** with lazy loading images

## Structure

```
/
├── assets/
│   ├── css/          # CSS styles
│   └── images/       # Image assets (hero, track images)
├── components/       # Web components
│   └── reveal-element.js
├── public/           # Public assets (favicon, robots.txt)
├── index.html        # Home page
├── understand.html   # Understand track page
├── tools.html        # Tools track page
├── implement.html    # Implement track page
├── training.html     # Training track page
└── README.md         # This file
```

## Development

### Prerequisites
- No build step required - just open the HTML files in a browser
- For development, you can use any static file server

### Running locally

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Building

No build required! The site is ready to deploy as-is.

## Design System

The site uses the same color system and design tokens as the original:

- **Deep Teal** (#0F6E6B) - Understand track
- **Amber Ochre** (#C97A16) - Tools track  
- **Veld Green** (#2E7D4F) - Implement track
- **Indigo Violet** (#5B4FA8) - Training track

## Web Components

The site uses a custom `<reveal-element>` for entrance animations:

```html
<reveal-element>
  <div>Your content here</div>
</reveal-element>
```

This component handles the IntersectionObserver logic and applies the reveal animation when the element enters the viewport.

## Deployment

Simply copy all files to any static web hosting:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Respects `prefers-reduced-motion` for accessibility
- Graceful degradation for older browsers

## License

Same as the original project - open source and free to use for climate action initiatives.
