// Popup script
// Handles UI interactions and storage updates

const enableToggle = document.getElementById('enableToggle');
const statusIndicator = document.getElementById('statusIndicator');
const logContainer = document.getElementById('logContainer');
const clearLogBtn = document.getElementById('clearLogBtn');

// Load initial state
loadState();

// Event listeners
enableToggle.addEventListener('change', toggleMonitoring);
clearLogBtn.addEventListener('click', clearLog);

// Listen for storage changes (to update UI if changed from elsewhere)
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    if (changes.isEnabled) {
      updateToggleUI(changes.isEnabled.newValue);
    }
    if (changes.capturedTickets) {
      updateLogUI(changes.capturedTickets.newValue);
    }
  }
});

function loadState() {
  chrome.storage.local.get(['isEnabled', 'capturedTickets'], (result) => {
    const isEnabled = result.isEnabled || false;
    enableToggle.checked = isEnabled;
    updateToggleUI(isEnabled);
    updateLogUI(result.capturedTickets || []);
  });
}

function toggleMonitoring() {
  const isEnabled = enableToggle.checked;
  chrome.storage.local.set({ isEnabled }, () => {
    updateToggleUI(isEnabled);
  });
}

function updateToggleUI(isEnabled) {
  if (isEnabled) {
    statusIndicator.textContent = 'Ativo';
    statusIndicator.className = 'status-on';
  } else {
    statusIndicator.textContent = 'Desativado';
    statusIndicator.className = 'status-off';
  }
}

function updateLogUI(tickets) {
  logContainer.innerHTML = '';

  if (!tickets || tickets.length === 0) {
    logContainer.innerHTML = '<p class="no-tickets">Nenhum chamado capturado</p>';
    clearLogBtn.disabled = true;
    return;
  }

  clearLogBtn.disabled = false;

  // Reverse to show newest first
  const reversedTickets = [...tickets].reverse();

  reversedTickets.forEach((ticket) => {
    const logItem = document.createElement('div');
    logItem.className = 'log-item';

    const badgeClass = ticket.status === 'Novo' ? 'badge-novo' : 'badge-transferencia';
    const statusLabel = ticket.status === 'Novo' ? 'Novo' : 'Transferência';

    logItem.innerHTML = `
      <div class="log-item-info">
        <span class="log-item-status">Chamado capturado</span>
        <span class="log-item-time">${ticket.time}</span>
      </div>
      <span class="log-item-badge ${badgeClass}">${statusLabel}</span>
    `;

    logContainer.appendChild(logItem);
  });
}

function clearLog() {
  if (confirm('Tem certeza que deseja limpar o histórico?')) {
    chrome.storage.local.set({ capturedTickets: [] }, () => {
      updateLogUI([]);
      chrome.action.setBadgeText({ text: '' });
    });
  }
}
