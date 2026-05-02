import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  darkMode: boolean
  sidebarOpen: boolean
  toggleDarkMode: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      darkMode: false,
      sidebarOpen: true,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          if (next) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { darkMode: next }
        }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'ui-store' }
  )
)
