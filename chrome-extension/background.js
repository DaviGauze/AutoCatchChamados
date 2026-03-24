// Background service worker
// Handles notifications, logging, and state management

// Initialize state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    isEnabled: false,
    capturedTickets: []
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ticketCaught') {
    handleTicketCaught(request, sender);
  }
});

function handleTicketCaught(request, sender) {
  const { status, timestamp } = request;

  // Get current log
  chrome.storage.local.get(['capturedTickets'], (result) => {
    const tickets = result.capturedTickets || [];

    // Add new ticket to log
    const newTicket = {
      status: status,
      timestamp: timestamp,
      time: new Date(timestamp).toLocaleTimeString('pt-BR'),
      tabUrl: sender.url
    };

    tickets.push(newTicket);

    // Keep only last 50 tickets
    if (tickets.length > 50) {
      tickets.shift();
    }

    chrome.storage.local.set({ capturedTickets: tickets });
  });

  // Show browser notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-48.png',
    title: 'Chamado Capturado!',
    message: `Status: ${status}`,
    priority: 2
  });

  // Update badge with new count
  updateBadge();
}

function updateBadge() {
  chrome.storage.local.get(['capturedTickets'], (result) => {
    const count = (result.capturedTickets || []).length;
    if (count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
    }
  });
}
