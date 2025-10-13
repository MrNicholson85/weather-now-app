import { ref, onMounted, watch } from "vue";

const theme = ref("light"); // default

export function useTheme() {
  function setTheme(mode) {
    theme.value = mode;
    updateDOM(mode);
  }

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    updateDOM(theme.value);
  }

  function updateDOM(mode) {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
  }

  onMounted(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
