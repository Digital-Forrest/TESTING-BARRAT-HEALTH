# Mobile Testing Quick Guide

## 🔍 Quick Test Checklist

### 1. Service Cards (Homepage & Services Page)
- [ ] **Mobile (<768px)**: Cards display as static cards with image, title, description, and button
- [ ] **Desktop (≥768px)**: Cards flip on hover/click
- [ ] **Touch**: Tap buttons work smoothly
- [ ] **Button Size**: All "Learn More" buttons are easy to tap (≥44px)

### 2. Header & Navigation
- [ ] **Logo**: Readable at all screen sizes
- [ ] **Mobile Menu**: Opens/closes smoothly
- [ ] **Menu Items**: Easy to tap (≥44px height)
- [ ] **Hover Effects**: Show visual feedback
- [ ] **Book Appointment**: Button prominent and tappable

### 3. Contact Page
- [ ] **Form**: Displays properly without horizontal scroll
- [ ] **iframe**: Adjusts to viewport height
- [ ] **Submission**: Works on mobile devices
- [ ] **Map**: Interactive and properly sized

### 4. Video Performance
- [ ] **Homepage Hero**: Video loads appropriately
- [ ] **Background Videos**: Don't autoplay on slow connections
- [ ] **Service Pages**: Videos display properly
- [ ] **Mobile Performance**: Doesn't lag or stutter

### 5. General Mobile Experience
- [ ] **No Horizontal Scroll**: Page fits within viewport width
- [ ] **Text Readability**: All text is legible
- [ ] **Images**: Load properly and are properly sized
- [ ] **Buttons**: All interactive elements are tappable
- [ ] **Spacing**: Adequate whitespace between elements

## 📱 Testing on Different Devices

### Chrome DevTools Testing (Desktop)
1. Open Chrome DevTools (F12)
2. Click the device toggle icon (Ctrl+Shift+M)
3. Test these device presets:
   - iPhone SE (375px) - Smallest common device
   - iPhone 12 Pro (390px) - Standard iPhone
   - Samsung Galaxy S20 (360px) - Standard Android
   - iPad (768px) - Tablet breakpoint
   - iPad Pro (1024px) - Large tablet

### Real Device Testing
**Priority Devices**:
- Any iPhone (Safari) - iOS testing critical
- Any Android phone (Chrome) - Android testing
- Tablet (any) - Mid-size testing

### Network Testing
1. Open Chrome DevTools → Network tab
2. Throttle to "Fast 3G" or "Slow 3G"
3. Verify videos don't autoplay
4. Check loading indicators work

## 🎯 Key Areas to Focus On

### Critical (Must Work)
1. ✅ Navigation menu opens and closes
2. ✅ Service cards are tappable and navigate correctly
3. ✅ Contact form is usable
4. ✅ All buttons work and are tappable
5. ✅ No horizontal scrolling

### Important (Should Work Well)
1. ✅ Images load properly
2. ✅ Videos perform well
3. ✅ Typography is readable
4. ✅ Spacing looks good
5. ✅ Links are distinguishable

### Nice to Have (Polish)
1. ✅ Smooth animations
2. ✅ Hover states on touch devices
3. ✅ Loading indicators
4. ✅ Error handling

## 🐛 Common Issues to Watch For

### Layout Issues
- [ ] Content overflowing horizontally
- [ ] Text cut off or truncated
- [ ] Images too large/small
- [ ] Buttons overlapping

### Interaction Issues
- [ ] Links/buttons too small to tap
- [ ] Hover-only interactions (need touch alternative)
- [ ] Form inputs difficult to interact with
- [ ] Modals/popups not mobile-friendly

### Performance Issues
- [ ] Videos causing lag
- [ ] Images loading slowly
- [ ] JavaScript errors on mobile
- [ ] Slow page transitions

### Content Issues
- [ ] Text too small to read
- [ ] Insufficient color contrast
- [ ] Important content hidden on mobile
- [ ] Too much scrolling required

## 🔧 Quick Fixes if Issues Found

### Horizontal Scroll
```bash
# Check these in DevTools:
- Elements wider than viewport
- Fixed widths that don't scale
- Images without max-width
- Tables without responsive wrapper
```

### Touch Target Too Small
```bash
# Ensure minimum 44x44px:
className="... min-h-[44px] py-2 px-4"
```

### Video Performance Issues
```bash
# Consider disabling on mobile:
<OptimizedVideo 
  src="..." 
  disableOnMobile={true}
  poster="fallback-image.jpg"
/>
```

### Text Readability
```bash
# Use responsive text sizing:
className="text-sm sm:text-base md:text-lg"
```

## ✅ Sign-Off Checklist

Before marking mobile review complete:

### Functionality
- [ ] All pages load correctly
- [ ] All links navigate properly
- [ ] All forms submit successfully
- [ ] All buttons trigger expected actions

### User Experience
- [ ] Navigation is intuitive
- [ ] Content is readable
- [ ] Actions are easy to complete
- [ ] No frustrating interactions

### Performance
- [ ] Pages load in reasonable time
- [ ] No janky scrolling
- [ ] Animations are smooth
- [ ] Videos don't cause issues

### Accessibility
- [ ] Touch targets meet 44px minimum
- [ ] Color contrast is sufficient
- [ ] Text is scalable
- [ ] Keyboard navigation works

## 📊 Testing Tools

### Browser Tools
- **Chrome DevTools**: Device emulation, network throttling
- **Firefox Responsive Design Mode**: Similar to Chrome
- **Safari Web Inspector**: iOS-specific testing

### Online Tools
- **BrowserStack**: Test on real devices remotely
- **Lighthouse**: Performance and mobile-friendliness audit
- **Google Mobile-Friendly Test**: Quick mobile check

### Manual Testing
- **Your Phone**: Best real-world test
- **Friends/Family Phones**: Different devices/habits
- **Office Devices**: Various test devices

## 🚀 Quick Test URLs

Once deployed, test these pages:
1. `/` - Homepage (hero video, service cards)
2. `/services` - Services page (service grid)
3. `/contact` - Contact page (form, map)
4. `/adhd-care` - Service detail (any specialty page)
5. `/blog` - Blog page (content layout)

## 📞 Reporting Issues

If you find issues, note:
1. Device/browser (e.g., "iPhone 12, Safari")
2. Screen size (e.g., "390x844")
3. Page/section affected
4. Expected vs actual behavior
5. Screenshot/screen recording if possible

## 🎓 Tips for Effective Testing

1. **Test with Real Content**: Don't just test with lorem ipsum
2. **Test Edge Cases**: Very long titles, no images, slow network
3. **Test User Flows**: Complete full actions (e.g., form submission)
4. **Test Both Orientations**: Portrait and landscape
5. **Test with Touch**: Don't just click, actually tap on device
6. **Test with Different Hands**: One-handed use is common on mobile

## ✨ Success Criteria

Mobile experience is successful when:
- ✅ User can complete all key tasks easily
- ✅ No frustrating interactions or confusion
- ✅ Content is fully accessible and readable
- ✅ Performance feels snappy and responsive
- ✅ Design looks intentional, not just "responsive"

---

**Note**: This is a living document. Update as you discover new patterns or issues specific to this project.

