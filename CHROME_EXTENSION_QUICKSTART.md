# 🚀 Quick Start Guide - AutoCatchChamados Chrome Extension

## ✅ What's Been Created

Your Chrome extension is ready! Files created:

```
chrome-extension/
├── manifest.json              # Extension config
├── content.js                 # Monitors DeskManager page
├── background.js              # Handles notifications & logging
├── popup/
│   ├── popup.html            # Toggle UI & activity log
│   ├── popup.css             # Beautiful styling
│   └── popup.js              # UI interactions
├── icons/                     # Extension icons
└── README.md                  # Full documentation
```

## 📥 Installation (4 Steps)

1. **Open Extensions Page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Click toggle in top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Select: `/Users/davi/Documents/AutoCatchChamados/chrome-extension/`

4. **Done!** ✨
   - Extension appears in toolbar
   - Icon shows AutoCatchChamados

## 🎯 How to Use

### Start Automation
1. Click extension icon in toolbar
2. Toggle "Monitoramento Ativo" to **ON**
3. Status indicator turns green: "Ativo"

### View Captured Tickets
- Each captured ticket shows in the activity log:
  - ⏰ Time captured
  - 🏷️ Status (Novo or Transferência)

### Clear History
- Click "Limpar" button to reset activity log

## 🔧 Configuration

**Check Interval** (polling frequency)
- File: `content.js`
- Line: `const CHECK_INTERVAL = 2000;` (in milliseconds)
- Current: 2 seconds

**Detection Patterns**
- File: `content.js`
- Function: `checkForNewTickets()`
- Looks for: "Novo" or "Transferência" text

## 🧪 Testing Checklist

- [ ] Extension installed and visible in toolbar
- [ ] Can toggle "Monitoramento Ativo" on/off
- [ ] Green indicator shows when active
- [ ] Click toggle → status updates immediately
- [ ] Open DeskManager
- [ ] Create/simulate a new ticket with "Novo" status
- [ ] Extension should auto-click within 2 seconds
- [ ] Ticket appears in activity log
- [ ] Browser notification pops up
- [ ] Extension badge shows count
- [ ] Clear log button works
- [ ] Disabling toggle stops auto-clicking

## 📝 Debug Tips

### Check if Extension is Running
1. Open Chrome DevTools (F12) on DeskManager page
2. Look for console messages:
   ```
   ✓ AutoCatchChamados: Monitoring started
   ✓ AutoCatchChamados: Ticket caught (Novo)
   ```

### Check Console for Errors
1. DevTools → Console tab
2. Look for any red error messages
3. Check if content script loaded

### If Tickets Not Detected
The extension looks for elements containing exactly these strings:
- `"Novo"` (Portuguese for New)
- `"Transferência"` (Portuguese for Transferred)

If DeskManager uses different text, edit `content.js`:
```javascript
// Line ~35-40: Update these strings
if (text.includes('Your-New-Status-Text') || text.includes('Your-Transfer-Status-Text')) {
  // ...
}
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Extension doesn't auto-click | Check toggle is ON, refresh DeskManager page |
| No notifications | Check Chrome permissions for notifications |
| Console shows errors | Check manifest.json syntax, update selectors |
| Badge count wrong | Click "Limpar" to reset, refresh extension |

## 📞 Next Steps

1. **Test on DeskManager** with real or simulated tickets
2. **Adjust selectors** if element structure differs
3. **Customize settings** (interval, detection terms)
4. **Share feedback** - what works, what needs tweaking

## 💡 Tips

- **Keep it Simple**: Only enable when actively working
- **Monitor Console**: Debug messages help troubleshoot
- **Adjust Interval**: If checking too fast (use more CPU), increase CHECK_INTERVAL
- **Keep Log Clean**: Clear activity log periodically

---

**Ready?** Go to `chrome://extensions/` and start testing! 🎉
