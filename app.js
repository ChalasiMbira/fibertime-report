// Select the form element by ID
const form = document.getElementById('reportForm');
// Get current date in South African format (e.g., 2025-03-22)
const date = new Date().toLocaleDateString('en-ZA', { timeZone: 'Africa/Johannesburg' });

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload on submit

  // Get form input values
  const ponNumber = document.getElementById('ponNumber').value;
  const poleNumber = document.getElementById('poleNumber').value;
  const houseAddress = document.getElementById('houseAddress').value;
  const installationStatus = document.getElementById('installationStatus').value;
  const dropNumber = document.getElementById('dropNumber').value;
  const pictures = document.getElementById('pictures').files;

  // Convert uploaded pictures to base64 strings (up to 5)
  const picturePromises = Array.from(pictures).slice(0, 5).map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Resolve with base64 data
      reader.readAsDataURL(file); // Read file as data URL
    });
  });
  const pictureBase64 = await Promise.all(picturePromises); // Wait for all conversions

  // Create report object with form data
  const report = { 
    date, 
    teamName: 'Team1', // Hardcoded team name
    ponNumber, 
    poleNumber, 
    houseAddress, 
    installationStatus, 
    dropNumber, 
    pictures: pictureBase64 
  };

  // Check if browser is offline
  if (!navigator.onLine) {
    // Save report to localStorage if offline
    localStorage.setItem('pendingReport', JSON.stringify(report));
    alert('Saved offline. Will send when online.');
    return; // Exit function
  }

  // Send report to server if online
  await fetch('YOUR_GOOGLE_CLOUD_FUNCTION_URL', {
    method: 'POST', // HTTP POST request
    body: JSON.stringify(report), // Send report as JSON
    headers: { 'Content-Type': 'application/json' } // Set content type
  });
  alert('Report sent!'); // Notify user
  form.reset(); // Clear form inputs
});

// Sync offline reports when connection is restored
window.addEventListener('online', async () => {
  const pending = localStorage.getItem('pendingReport'); // Check for saved report
  if (pending) {
    // Send pending report to server
    await fetch('YOUR_GOOGLE_CLOUD_FUNCTION_URL', {
      method: 'POST',
      body: pending, // Send stored JSON string
      headers: { 'Content-Type': 'application/json' }
    });
    localStorage.removeItem('pendingReport'); // Clear storage
    alert('Offline report sent!'); // Notify user
  }
});

// Register service worker for offline support and PWA features
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/fibertime-report/sw.js', { scope: '/fibertime-report/' })
    .then(() => console.log('Service Worker registered')) // Log success
    .catch(err => console.error('Service Worker registration failed:', err)); // Log errors
}