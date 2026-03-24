// Content script running in DeskManager page context
// Monitors DOM for new tickets and auto-clicks them

const CHECK_INTERVAL = 2000; // 2 seconds
let isEnabled = false;
let checkInterval = null;

// Initialize by checking storage
chrome.storage.local.get(['isEnabled'], (result) => {
  isEnabled = result.isEnabled || false;
  if (isEnabled) {
    startMonitoring();
  }
});

// Listen for changes from popup
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
    if (isEnabled) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }
});

function startMonitoring() {
  if (checkInterval) return; // Already running

  checkInterval = setInterval(() => {
    checkForNewTickets();
  }, CHECK_INTERVAL);

  console.log('✓ AutoCatchChamados: Monitoring started');
}

function stopMonitoring() {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
  console.log('✗ AutoCatchChamados: Monitoring stopped');
}

function checkForNewTickets() {
  // Search for elements containing "Novo" or "Transferência" status
  // Common patterns in ticket systems:
  const selectors = [
    '[class*="ticket"]',
    '[class*="chamado"]',
    '[class*="queue"]',
    '[class*="item"]',
    'tr', // table rows
    'div[role="button"]', // clickable divs
    '[class*="row"]'
  ];

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      const text = element.textContent || '';

      // Check for "Novo" or "Transferência" status
      if (text.includes('Novo') || text.includes('Transferência')) {
        // Make sure the status is recent (not already processed)
        if (!element.classList.contains('auto-catch-processed')) {
          // Try to find the clickable parent if the element itself isn't clickable
          let clickTarget = element;

          // If the element is not clickable, try parent
          if (element.onclick === null && element.closest('[role="button"]')) {
            clickTarget = element.closest('[role="button"]');
          }
          if (element.onclick === null && element.closest('a')) {
            clickTarget = element.closest('a');
          }
          if (element.onclick === null && element.closest('tr')) {
            clickTarget = element.closest('tr');
          }

          // Mark as processed to avoid double-clicking
          element.classList.add('auto-catch-processed');

          // Extract status
          const status = text.includes('Novo') ? 'Novo' : 'Transferência';

          // Click the ticket
          try {
            clickTarget.click();
            console.log(`✓ AutoCatchChamados: Ticket caught (${status})`);

            // Notify background script to log and show notification
            chrome.runtime.sendMessage({
              action: 'ticketCaught',
              status: status,
              timestamp: Date.now()
            });

            // Reset after a delay to allow new tickets to be processed
            setTimeout(() => {
              element.classList.remove('auto-catch-processed');
            }, 3000);
          } catch (error) {
            console.error('AutoCatchChamados: Failed to click ticket', error);
          }
        }
      }
    }
  }
}
