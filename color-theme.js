(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  // Apply the theme when the page loads
  setTheme(getPreferredTheme())

  const showActiveTheme = theme => {
    document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
      const isActive = button.getAttribute('data-bs-theme-value') === theme

      button.classList.toggle('active', isActive)
      button.setAttribute('aria-pressed', isActive)
    })
  }

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-bs-theme-value')

        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme)
      })
    })
  })
})()