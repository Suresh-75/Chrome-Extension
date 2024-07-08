// Create overlay
const overlay = document.createElement("div");
overlay.id = "url-blocker-overlay";
overlay.innerHTML = `
  <div class="overlay-content">
    <h1>Access Blocked</h1>
    <p>This URL is not in your allowlist.</p>
  </div>
`;
document.body.appendChild(overlay);

// Optionally, add a style to hide the page content
const style = document.createElement("style");
style.innerHTML =
  "body > :not(#url-blocker-overlay) { display: none !important; }";
document.head.appendChild(style);
