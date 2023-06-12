// Saves options to chrome.storage
const saveOptions = () => {
  const timeToClose = document.getElementById('timeToClose').value;

  chrome.storage.sync.set(
    { timeToClose: timeToClose },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { timeToClose: '100' },
    (items) => {
      document.getElementById('timeToClose').value = items.timeToClose;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
