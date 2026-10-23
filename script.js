"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

function closeMenu(returnFocus = false) {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");

  if (returnFocus) menuButton.focus();
}

function openMenu() {
  if (!menuButton || !navigation) return;

  navigation.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");
  document.body.classList.add("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("click", (event) => {
  if (
    navigation?.classList.contains("is-open") &&
    !navigation.contains(event.target) &&
    !menuButton?.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("is-open")) {
    closeMenu(true);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const confirmation = "Thank you! Your message has been validated. This is a demo form, so no email has been sent.";
  document.querySelector("#form-confirmation").textContent = confirmation;
  window.alert(confirmation);
  contactForm.reset();
});

document.querySelectorAll(".video-shell").forEach((shell) => {
  const video = shell.querySelector("video");
  const playButton = shell.querySelector(".video-play");
  const status = shell.querySelector(".video-status");

  if (!video || !playButton || !status) return;

  const showStatus = (message) => {
    status.textContent = message;
    status.classList.add("is-visible");
  };

  const hideStatus = () => {
    status.textContent = "";
    status.classList.remove("is-visible");
  };

  const togglePlayback = async () => {
    hideStatus();

    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch {
        showStatus("Playback could not start. Use the native video controls to try again.");
      }
    } else {
      video.pause();
    }
  };

  playButton.addEventListener("click", togglePlayback);

  video.querySelector("source")?.addEventListener("error", () => {
    showStatus("The video could not be loaded. Please refresh the page to try again.");
  });

  video.addEventListener("error", () => {
    showStatus("The video could not be played. Please try another browser.");
  });

  video.addEventListener("play", () => {
    hideStatus();
    shell.classList.add("is-playing");
    playButton.setAttribute("aria-label", "Pause Cybersecurity Awareness");
  });

  video.addEventListener("pause", () => {
    shell.classList.remove("is-playing");
    playButton.setAttribute("aria-label", "Play Cybersecurity Awareness");
  });

  video.addEventListener("ended", () => {
    shell.classList.remove("is-playing");
    playButton.setAttribute("aria-label", "Replay Cybersecurity Awareness");
  });
});
