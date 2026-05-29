(() => {
  let shouldOpenModal = false;
  let modalObserver = null;

  const styleText = `
    body.learn-word-modal-open { overflow: hidden; }
    .learn-word-panel.learn-word-panel-list-only { display: block; }
    .learn-word-panel-list-only .learn-word-list { max-height: none; }
    .learn-word-panel-list-only .learn-word-row { position: relative; padding-right: 42px; }
    .learn-word-panel-list-only .learn-word-row::after {
      content: "Open";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--learn-muted, #a8b4c2);
      font-size: 0.72rem;
      font-weight: 850;
      text-transform: uppercase;
    }
    .learn-word-modal[hidden] { display: none !important; }
    .learn-word-modal {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .learn-word-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(4, 8, 12, 0.78);
      backdrop-filter: blur(8px);
    }
    .learn-word-modal-dialog {
      position: relative;
      width: min(760px, 100%);
      max-height: min(86vh, 860px);
      overflow: auto;
      border: 1px solid var(--learn-line, #40505f);
      border-radius: 8px;
      background: var(--learn-bg, #111820);
      color: var(--learn-text, #e7edf4);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
      padding: 16px;
    }
    .learn-word-modal-bar {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: -16px -16px 14px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--learn-line, #40505f);
      background: var(--learn-bg, #111820);
    }
    .learn-word-modal-title {
      margin: 0;
      color: var(--learn-muted, #a8b4c2);
      font-size: 0.82rem;
      font-weight: 850;
      text-transform: uppercase;
      letter-spacing: 0;
    }
    .learn-word-modal-content .learn-detail-card {
      border-color: var(--learn-line, #40505f);
      box-shadow: none;
    }
    .learn-word-modal-content .learn-detail-card h3 {
      overflow-wrap: anywhere;
    }
    @media (max-width: 680px) {
      .learn-word-modal {
        display: block;
        padding: 0;
      }
      .learn-word-modal-dialog {
        width: 100%;
        min-height: 100dvh;
        max-height: 100dvh;
        border: 0;
        border-radius: 0;
        padding: 14px;
      }
      .learn-word-modal-bar {
        margin: -14px -14px 14px;
        padding: 12px 14px;
      }
      .learn-word-modal-bar .ghost-button {
        min-width: 132px;
      }
      .learn-word-modal-content .learn-detail-card {
        padding: 14px;
      }
    }
  `;

  function installStyles() {
    if (document.querySelector("#learnWordModalStyles")) return;
    const style = document.createElement("style");
    style.id = "learnWordModalStyles";
    style.textContent = styleText;
    document.head.append(style);
  }

  function ensureModal() {
    let modal = document.querySelector("#learnWordModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "learnWordModal";
    modal.className = "learn-word-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "learnWordModalTitle");
    modal.innerHTML = `
      <div class="learn-word-modal-backdrop" data-learn-word-modal-close></div>
      <section class="learn-word-modal-dialog">
        <div class="learn-word-modal-bar">
          <p class="learn-word-modal-title" id="learnWordModalTitle">Word details</p>
          <button class="ghost-button learn-word-modal-close" type="button" data-learn-word-modal-close>Back to words</button>
        </div>
        <div class="learn-word-modal-content"></div>
      </section>
    `;
    document.body.append(modal);
    return modal;
  }

  function inlineDetailCard() {
    const panel = document.querySelector(".learn-category-page .learn-word-panel");
    if (!panel) return null;
    return [...panel.children].find((child) => child.classList?.contains("learn-detail-card")) || null;
  }

  function clearInlineDetail() {
    const detail = inlineDetailCard();
    if (detail) detail.remove();
    document.querySelectorAll(".learn-category-page .learn-word-row.selected").forEach((row) => {
      row.classList.remove("selected");
    });
  }

  function openModal(detail) {
    const modal = ensureModal();
    const content = modal.querySelector(".learn-word-modal-content");
    content.replaceChildren(detail);
    modal.hidden = false;
    document.body.classList.add("learn-word-modal-open");
    modal.querySelector(".learn-word-modal-close")?.focus({ preventScroll: true });
  }

  function closeModal() {
    const modal = document.querySelector("#learnWordModal");
    if (!modal) return;
    modal.hidden = true;
    modal.querySelector(".learn-word-modal-content")?.replaceChildren();
    document.body.classList.remove("learn-word-modal-open");
    document.querySelectorAll(".learn-category-page .learn-word-row.selected").forEach((row) => {
      row.classList.remove("selected");
    });
  }

  function prepareVocabularyPage() {
    installStyles();

    const categoryPage = document.querySelector(".learn-category-page");
    if (!categoryPage) {
      closeModal();
      return;
    }

    const wordPanel = categoryPage.querySelector(".learn-word-panel");
    if (wordPanel) wordPanel.classList.add("learn-word-panel-list-only");

    const detail = inlineDetailCard();
    if (!detail) return;

    if (shouldOpenModal) {
      shouldOpenModal = false;
      openModal(detail);
      return;
    }

    clearInlineDetail();
  }

  function schedulePrepare() {
    window.requestAnimationFrame(prepareVocabularyPage);
  }

  function bindGlobalEvents() {
    document.addEventListener("click", (event) => {
      const wordRow = event.target.closest(".learn-category-page [data-entry-id]");
      if (wordRow) {
        shouldOpenModal = true;
        return;
      }

      if (event.target.closest("[data-learn-word-modal-close]")) {
        event.preventDefault();
        closeModal();
      }
    }, true);

    document.addEventListener("change", (event) => {
      if (event.target.closest("#learnWordModal") && event.target.matches("#learnTense")) {
        shouldOpenModal = true;
      }
    }, true);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function startObserver() {
    const app = document.querySelector("#app");
    if (!app || modalObserver) return;
    modalObserver = new MutationObserver(schedulePrepare);
    modalObserver.observe(app, { childList: true, subtree: true });
    schedulePrepare();
  }

  installStyles();
  bindGlobalEvents();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
})();
