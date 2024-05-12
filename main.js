function init() {
  const tabCount = 4;

  for (let id = 1; id <= tabCount; id++) {
    const nav = document.getElementById(`nav-${id}`);
    const tab = document.getElementById(`tab-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    const navIndex = 2 * id + 1;
    const tabIndex = 2 * id;

    nav.style.zIndex = navIndex;
    tab.style.zIndex = tabIndex;

    nav.addEventListener("mouseenter", () => {
      if (isFocused) return;

      nav.style.top = "0";
      tab.style.top = `calc(-90vh + ${46 - 6 * id}px)`;
      nav.style.zIndex = 2 * (tabCount + 1) + 1;
      tab.style.zIndex = 2 * (tabCount + 1);
    });

    nav.addEventListener("mouseleave", () => {
      if (isFocused) return;

      nav.style.top = "-16px";
      tab.style.top = `calc(-90vh + ${30 - 6 * id}px)`;
      nav.style.zIndex = navIndex;
      tab.style.zIndex = tabIndex;
    });

    nav.addEventListener("click", () => {
      if (isFocused) {
        nav.style.top = "-16px";
        tab.style.top = `calc(-90vh + ${30 - 6 * id}px)`;
        nav.style.zIndex = navIndex;
        tab.style.zIndex = tabIndex;
      } else {
        nav.style.top = "calc(90vh - 22px)";
        tab.style.top = "0";
        nav.style.zIndex = 999;
        tab.style.zIndex = 998;
      }
      isFocused = !isFocused;
    });

    chevron.addEventListener("click", () => {
      nav.style.top = "-16px";
      tab.style.top = `calc(-90vh + ${30 - 6 * id}px)`;
      nav.style.zIndex = navIndex;
      tab.style.zIndex = tabIndex;
      isFocused = false;
    });
  }
}

init();
