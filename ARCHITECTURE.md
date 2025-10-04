# Puzzle Royale Website - Modern Architecture

## 📁 New Folder Structure

```
puzzleroyale_website/
├── index.html                 # Homepage (clean, references external files)
├── index_new.html            # NEW modular homepage (ready to replace index.html)
├── index_old.html            # Backup of original monolithic index.html
│
├── css/                      # Organized stylesheets
│   ├── variables.css         # CSS custom properties (colors, spacing, etc.)
│   ├── base.css             # Base styles, resets, body, animations
│   ├── components.css       # Reusable components (buttons, cards, theme toggle)
│   └── layout.css           # Page sections (hero, features, footer)
│
├── js/                       # Modular JavaScript
│   ├── theme.js             # Theme toggle functionality
│   ├── smooth-scroll.js     # Smooth scrolling for anchors
│   └── utils.js             # Utility functions (copyright year, etc.)
│
├── privacy/                  # Legal pages
│   ├── index.html           # Privacy & Terms page
│   ├── css/
│   │   └── legal.css        # Legal page specific styles
│   └── js/
│       └── legal.js         # Tab switching logic
│
└── README.md                 # This file
```

## 🚀 Benefits of New Architecture

### 1. **Separation of Concerns**
- HTML for structure
- CSS for styling
- JavaScript for behavior

### 2. **Maintainability**
- Easy to find and update specific styles
- Clear file organization
- Reusable components

### 3. **Performance**
- Browser can cache CSS/JS files separately
- Easier to optimize individual files
- Parallel downloads for faster loading

### 4. **Scalability**
- Easy to add new pages
- Share common styles across pages
- Modular code is easier to extend

### 5. **Developer Experience**
- Clear file naming and organization
- Well-documented code with comments
- Logical grouping of related code

## 📝 CSS Organization

### `variables.css`
Design tokens and CSS custom properties:
- Colors and gradients
- Spacing scale
- Border radius values
- Shadows
- Transitions

### `base.css`
Foundation styles:
- CSS reset
- Body and html styles
- Background gradients
- Animations
- Light/dark theme base

### `components.css`
Reusable UI components:
- Theme toggle button
- Primary and secondary buttons
- Feature cards
- Icons

### `layout.css`
Page-specific sections:
- Hero section
- Features grid
- Footer
- Responsive breakpoints

## 🎨 JavaScript Modules

### `theme.js`
- Detects system color scheme preference
- Handles light/dark theme toggle
- Persists theme choice

### `smooth-scroll.js`
- Enables smooth scrolling for anchor links
- Improves UX when navigating to sections

### `utils.js`
- Common utilities (copyright year update)
- Can be extended with more helper functions

### Privacy page: `legal.js`
- Tab switching between Privacy Policy and Terms
- Hash navigation support (e.g., `/privacy/#terms`)

## 🔄 How to Use

### Option 1: Test the new version
1. Open `index_new.html` in your browser or local server
2. Verify everything works correctly
3. If satisfied, replace `index.html`:
   ```powershell
   Move-Item index.html index_old.html -Force
   Move-Item index_new.html index.html -Force
   ```

### Option 2: Manual migration
Copy the content from `index_new.html` to `index.html` manually.

## 📦 GitHub Pages Compatibility

✅ **100% Compatible** - All files are static (HTML, CSS, JS)
- No build process required
- No Node.js or npm needed
- Works immediately after git push

## 🎯 Next Steps

### Easy Additions:
1. **Add more pages** - Copy the structure, reuse CSS
2. **Create components** - Add new CSS files for new components
3. **Extend functionality** - Add new JS modules

### Future Enhancements:
- Add a CSS preprocessor (Sass/SCSS) for even better organization
- Implement a simple build tool for minification
- Add service worker for offline support
- Migrate to a framework (Vite, Next.js) when ready

## 🛠️ Development

### Local Testing
```powershell
# Start a local web server
python -m http.server 8000

# Visit http://localhost:8000
```

### Deployment
Just push to GitHub - GitHub Pages will serve the files automatically!

```powershell
git add .
git commit -m "Refactor: Modularize CSS and JavaScript"
git push
```

## 📋 File Reference

### Homepage Files
- `index_new.html` - Uses modular architecture
- `index_old.html` - Original monolithic file (backup)

### Shared Assets
All pages can use:
- `css/variables.css` - Shared design tokens
- `css/base.css` - Shared base styles
- `js/theme.js` - Theme toggle (reusable)

### Page-Specific Assets
- Privacy page has its own `css/legal.css` and `js/legal.js`
- Other pages can have their own dedicated CSS/JS as needed

---

**Built with ❤️ for Puzzle Royale**
