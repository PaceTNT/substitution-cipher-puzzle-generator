# Substitution Cipher Puzzle Generator

A web-based tool for creating substitution cipher puzzles for tabletop roleplaying games. Generate encoded messages using custom glyphs and pictograms that contain the letters needed to decode the puzzle.

## Features

- **Interactive Web Interface**: Clean, responsive design that works on desktop and mobile
- **Customizable Encoding**: 
  - Set disallowed letters to increase puzzle difficulty
  - Apply Caesar cipher shifts to the glyph mapping
  - Support for multi-line input phrases
- **Visual Output**: 
  - Encoded phrase displayed using custom glyph images
  - Pictogram cards showing the letters needed for decoding
  - Preview of output with disallowed letters masked
- **Print-Friendly Output**: Professional two-page puzzle format optimized for printing
- **Accessibility**: Screen reader support and keyboard navigation
- **URL Sharing**: Share puzzle configurations via URL parameters

## Recent Improvements

### Code Quality & Maintainability
- ✅ **Input Validation**: Comprehensive validation with user-friendly error messages
- ✅ **Modern JavaScript**: Updated to use `const`/`let`, arrow functions, and modern practices
- ✅ **Error Handling**: Better error reporting and edge case handling
- ✅ **Code Documentation**: Added JSDoc comments and improved code organization
- ✅ **Accessibility**: Added ARIA labels, alt text, and semantic HTML

### User Experience
- ✅ **Improved UI**: Better form layout with Bootstrap integration
- ✅ **Responsive Design**: Mobile-friendly layout and styling
- ✅ **Visual Enhancements**: Better spacing, colors, and visual hierarchy
- ✅ **Form Improvements**: Help text, placeholders, and better button styling
- ✅ **Print Functionality**: Professional print layout with dedicated print button
- ✅ **Loading States**: Prepared infrastructure for loading indicators

### Performance & Security
- ✅ **DOM Optimization**: More efficient DOM manipulation
- ✅ **Input Sanitization**: Protection against invalid input
- ✅ **Memory Management**: Better cleanup of DOM elements

## Usage

1. **Enter Your Phrase**: Type the message you want to encode in the input textarea
2. **Set Disallowed Letters**: Specify letters to hide from the output (optional)
3. **Choose Shift Value**: Set a Caesar cipher shift (0-25) for additional encoding
4. **Generate Puzzle**: Click "Generate Puzzle" to create your cipher
5. **Print Puzzle**: Click the "🖨️ Print Puzzle" button for a clean, two-page printout
6. **Share Results**: Use the generated URL to share your puzzle configuration

### Print Features

The application includes comprehensive print optimization:
- **Page 1**: Title and encoded cipher puzzle
- **Page 2**: Pictograms with decoding keys
- **Clean Layout**: Hides interactive elements, optimized spacing and fonts
- **Professional Format**: Letter-size pages with proper margins
- **High Contrast**: Black text and borders for clear printing
- **Transparent Backgrounds**: Images optimized for print quality

### Example Use Case

Perfect for D&D and other tabletop RPGs:
- Create riddles that players must first decode, then solve
- Generate puzzles for ancient temples, mysterious scrolls, or coded messages
- Adjust difficulty by controlling which letters are revealed vs. hidden

## File Structure

```
├── index.html          # Main HTML interface
├── substitutionCipher.js # Core JavaScript logic
├── styles.css          # Custom styling and responsive design
├── glyphs/            # Letter glyph images (A-Z, blank)
├── pictograms/        # Pictogram images for letter keys
└── README.md          # This documentation
```

## Technical Details

### Dependencies
- Bootstrap 5.3.2 (CSS framework)
- Custom CSS for enhanced styling
- Vanilla JavaScript (no additional libraries)

### Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design
- Accessibility features for screen readers

### Image Assets
- **Glyphs**: 27 images (A-Z plus blank) for encoded output
- **Pictograms**: 53+ images representing words that contain cipher letters

## Development

### Running Locally
Simply open `index.html` in a web browser. No build process or server required.

### Customization
- **Add New Pictograms**: Add images to `/pictograms/` and update the `pictogramList` array
- **Modify Glyphs**: Replace images in `/glyphs/` (maintain naming convention)
- **Styling**: Edit `styles.css` for visual customizations
- **Logic**: Modify `substitutionCipher.js` for algorithm changes

### Future Enhancements
- [ ] Replace alert() with proper modal dialogs
- [ ] Add loading indicators for better UX
- [ ] Implement save/load functionality
- [ ] Add support for additional cipher types
- [x] Create print-friendly output format
- [ ] Add unit tests for core functions

## License

See LICENSE file for details.

## Contributing

Contributions welcome! Areas for improvement:
- Additional pictogram images
- Algorithm optimizations
- UI/UX enhancements
- Accessibility improvements
- Mobile experience refinements
