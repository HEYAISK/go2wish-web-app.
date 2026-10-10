// GO2WISH Version 1 settings
// IMPORTANT: Replace this placeholder with your WhatsApp number including country code,
// digits only (India example: 919876543210). Do not include +, spaces or dashes.
const WHATSAPP_NUMBER = "919040669652";

const whatsappUrl = (message) => {
  const numberReady = /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
  if (!numberReady) {
    alert("Please add your WhatsApp number in app.js first. Use country code + number, digits only.");
    return null;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = whatsappUrl("Hello GO2WISH! I would like to enquire about your products and services.");
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll(".enquiry").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item || "your services";
    const url = whatsappUrl(`Hello GO2WISH! I am interested in: ${item}. Please share details and pricing.`);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Local-only portfolio preview. These files are not uploaded anywhere.
const portfolioUpload = document.getElementById("portfolioUpload");
const previewGrid = document.getElementById("previewGrid");
portfolioUpload.addEventListener("change", () => {
  previewGrid.replaceChildren();
  Array.from(portfolioUpload.files || []).forEach((file) => {
    const url = URL.createObjectURL(file);
    let media;
    if (file.type.startsWith("video/")) {
      media = document.createElement("video");
      media.controls = true;
      media.preload = "metadata";
    } else if (file.type.startsWith("image/")) {
      media = document.createElement("img");
      media.alt = file.name;
    } else {
      return;
    }
    media.src = url;
    previewGrid.appendChild(media);
  });
});

// Register the service worker only when the app is served via HTTPS or localhost.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
}
