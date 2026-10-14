// Set the address that should receive enquiries from the contact form.
const CONTACT_EMAIL = "info@example.com";

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

document.getElementById("year").textContent = new Date().getFullYear();

// Header border appears once the page scrolls
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }
});

// Contact form: validate, then open the visitor's email app with the message filled in
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const service = form.service.value;

  [form.name, form.email, form.message].forEach((f) => f.removeAttribute("aria-invalid"));
  status.className = "form-status";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    if (!name) form.name.setAttribute("aria-invalid", "true");
    if (!emailOk) form.email.setAttribute("aria-invalid", "true");
    if (!message) form.message.setAttribute("aria-invalid", "true");
    status.textContent = "Please enter your name, a valid email address and a message.";
    status.classList.add("error");
    return;
  }

  const subject = encodeURIComponent(`Website enquiry: ${service}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  status.textContent = "Your email app should open with your message ready to send.";
  status.classList.add("ok");
  form.reset();
});
