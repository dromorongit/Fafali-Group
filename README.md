# FAFALI Group Modern Corporate Website

A modern, responsive corporate website for FAFALI Group, a travel, visa, and events solutions provider with offices in Ghana and UAE.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Modern UI/UX**: Clean, professional design with elegant animations and transitions
- **SEO Optimized**: Comprehensive meta tags, semantic HTML, and accessibility features
- **Performance Optimized**: Fast loading times with optimized assets and code

### Technical Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and custom properties
- **Vanilla JavaScript**: ES6+ features with no dependencies
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Poppins and Inter typography

### Page Structure
1. **Homepage** (`index.html`)
   - Hero section with video background
   - Trusted by clients section with statistics
   - Services overview with interactive cards
   - Why choose us section
   - Featured media section
   - Call-to-action section

2. **Services** (`services.html`)
   - Comprehensive services overview
   - Detailed service descriptions
   - Service advantages
   - Location-specific services

3. **Visa Application** (`visa-application.html`)
   - Visa types overview
   - Application process timeline
   - Requirements checklist
   - Interactive application form
   - FAQ section

4. **Bookings** (`bookings.html`)
   - Hotel booking form
   - Flight booking form
   - Tour booking form
   - Events booking form
   - Service advantages

5. **About Us** (`about.html`)
   - Company introduction
   - Mission and vision
   - CEO profile with credentials
   - Team section
   - Company values
   - Timeline of achievements

6. **Gallery** (`gallery.html`)
   - Filterable photo gallery
   - Lightbox modal functionality
   - Video section
   - Responsive grid layout

7. **Contact** (`contact.html`)
   - Contact information cards
   - Interactive contact form
   - Office locations (Ghana & UAE)
   - Quick action buttons
   - FAQ section

## 🎨 Design System

### Brand Colors
- **Primary**: #0A1D3F (Dark Blue)
- **Secondary**: #C99F2C (Gold)
- **Background**: #FFFFFF (White)
- **Text Primary**: #1A1A1A (Dark Gray)
- **Text Secondary**: #555555 (Medium Gray)
- **Accent**: #F5F7FA (Light Gray)

### Typography
- **Primary Font**: Poppins (Headings)
- **Secondary Font**: Inter (Body text)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- Modern card-based layouts
- Interactive buttons with hover effects
- Smooth animations and transitions
- Mobile-optimized navigation
- Accessible form elements

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:
- **Desktop**: 1200px+ (Full layout with all features)
- **Tablet**: 768px - 1199px (Adapted layout)
- **Mobile**: Below 768px (Stacked layout with mobile menu)

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management
- Reduced motion support

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Web server (for local development)

### Installation
1. Clone or download the project files
2. Place all files in your web server directory
3. Open `index.html` in a web browser

### File Structure
```
/
├── index.html              # Homepage
├── services.html           # Services overview
├── visa-application.html   # Visa application page
├── bookings.html          # Booking services page
├── about.html             # About us page
├── gallery.html           # Photo gallery
├── contact.html           # Contact page
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   └── main.js           # Main JavaScript file
├── assets/
│   ├── images/           # Image assets
│   └── videos/           # Video assets
└── README.md             # This file
```

## 📝 Content Management

### Adding Images
1. Place images in the `assets/images/` directory
2. Update image paths in HTML files
3. Recommended image formats: JPG, PNG, WebP
4. Optimized sizes:
   - Hero images: 1920x1080px
   - Gallery images: 800x600px
   - Profile images: 400x400px

### Updating Content
- All text content is in the HTML files
- Company information can be updated in `about.html`
- Contact details can be updated in `contact.html`
- Services can be modified in respective service pages

## 🔧 Customization

### Colors
Update CSS custom properties in `css/styles.css`:
```css
:root {
  --primary-color: #0A1D3F;
  --secondary-color: #C99F2C;
  /* ... other colors */
}
```

### Fonts
Update font imports and CSS font-family properties:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');

:root {
  --font-primary: 'YourFont', sans-serif;
}
```

### Contact Information
Update contact details in:
- `contact.html` (main contact page)
- `about.html` (company information)
- Footer sections across all pages

## 🌐 Deployment

### Static Hosting
The website is designed for static hosting and can be deployed on:
- **cPanel**: Upload files to public_html
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings

### PHP Integration
While the website is static, it's structured to be easily integrated with PHP:
- Form submissions can be handled by PHP scripts
- Content management can be added
- Database integration is possible

### Performance Optimization
- Images are optimized for web
- CSS and JS are minified for production
- External resources are loaded efficiently
- Caching headers can be added via .htaccess

## 📊 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Structured Data**: Schema.org markup ready
- **Open Graph**: Social media sharing optimization
- **Sitemap**: XML sitemap can be generated
- **Analytics**: Google Analytics integration ready

## 🛠️ Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📞 Support

For technical support or customization requests:
- Review the documentation
- Check browser console for errors
- Ensure all files are properly uploaded

## 📄 License

This website template is created for FAFALI Group. All rights reserved.

## 🔄 Version History

- **v1.0.0**: Initial release with full website functionality
- Modern responsive design
- Complete page structure
- Interactive features
- Accessibility compliance

---

**Built with ❤️ for FAFALI Group**

*Last updated: January 2025*