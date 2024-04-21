export function bookingPage() {
  const anchor = document.createElement("div");
  anchor.innerHTML = `
  <h1>Booking Screen</h1>
  <button class="history-button">View history</button>
  <button class="logoff-button">Log off</button>
  `;

  return anchor;
}
