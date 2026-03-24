# AutoCatchChamados - Chrome Extension

A Chrome extension that automatically captures new support tickets in DeskManager, reducing manual effort and improving response time.

## Features

✅ **Auto-Click Tickets**: Automatically captures new tickets with "Novo" or "Transferência" status
✅ **Toggle Control**: Enable/disable automation with a simple switch
✅ **Activity Log**: View captured tickets with timestamps
✅ **Browser Notifications**: Get notified when a ticket is captured
✅ **Badge Counter**: See number of captured tickets in extension icon

## Installation

### Step 1: Open Chrome Extensions Page
1. Open Chrome browser
2. Go to `chrome://extensions/`

### Step 2: Enable Developer Mode
- Toggle "Developer mode" in the top-right corner

### Step 3: Load the Extension
1. Click "Load unpacked"
2. Navigate to this folder and select it
3. The extension should now appear in your Chrome toolbar

## Usage

### Enable Automation
1. Click the AutoCatchChamados icon in Chrome toolbar
2. Toggle "Monitoramento Ativo" (Active Monitoring) to ON
3. The indicator will show "Ativo" (Active) in green

### View Captured Tickets
- All captured tickets appear in the activity log with:
  - Capture time
  - Status (Novo or Transferência)
- Scroll through the log to see recent captures

### Clear History
- Click "Limpar" (Clear) button to clear all captured tickets

## How It Works

1. **DOM Monitoring**: The extension monitors the DeskManager page DOM every 2 seconds
2. **Status Detection**: Looks for elements containing "Novo" or "Transferência" text
3. **Auto-Click**: When found, automatically clicks the ticket element
4. **Notification**: Shows a browser notification and logs the capture
5. **Deduplication**: Marks processed tickets to avoid double-clicking

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── content.js             # Page monitoring script
├── background.js          # Service worker
├── popup/
│   ├── popup.html         # Popup UI
│   ├── popup.css          # Styling
│   └── popup.js           # UI logic
└── icons/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## Configuration

To modify the check interval (currently 2 seconds), edit `content.js`:

```javascript
const CHECK_INTERVAL = 2000; // milliseconds
```

## Troubleshooting

### Extension Not Detecting Tickets
- Check that you're on a DeskManager page (`deskmanager.com.br`)
- Verify that the toggle is ON
- Open DevTools (F12) → Console to see debug messages

### Click Not Working
- The extension looks for elements containing "Novo" or "Transferência"
- If DeskManager changed its HTML structure, selectors may need updating in `content.js`

### Notifications Not Showing
- Check Chrome notification settings:
  - Chrome → Settings → Privacy and security → Site settings → Notifications
  - Ensure DeskManager is allowed

## Permissions

The extension requests these permissions:

- **storage**: Store enabled/disabled state and activity log
- **scripting**: Inject monitoring script into DeskManager
- **activeTab**: Detect when user is on DeskManager
- **notifications**: Show pop-up notifications
- **host_permissions**: Access `deskmanager.com.br`

## Support

For bugs or feature requests, open an issue in the main repository.

---

**Version**: 1.0.0
**License**: MIT
