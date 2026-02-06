import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const TAB_KEY = "my_app_active_tab"

interface SingleTabManagerProps {
  onDuplicateTab?: () => void
}

export default function SingleTabManager({ onDuplicateTab }: SingleTabManagerProps) {
  const [tabId] = useState(() => Date.now().toString())

  useEffect(() => {
    const checkTab = () => {
      const current = localStorage.getItem(TAB_KEY)
      if (!current) {
        localStorage.setItem(TAB_KEY, tabId)
      } else if (current !== tabId) {
        // Another tab is already active
        toast.error("Another tab is already open. This tab will be closed.")
        if (onDuplicateTab) onDuplicateTab()
      }
    }

    // Check on mount
    checkTab()

    // Listen for storage changes (other tabs)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === TAB_KEY && e.newValue !== tabId) {
        toast.error("Another tab was opened. This tab is now inactive.")
        if (onDuplicateTab) onDuplicateTab()
      }
    }

    window.addEventListener("storage", handleStorage)

    // Clear on unload
    const handleUnload = () => {
      const current = localStorage.getItem(TAB_KEY)
      if (current === tabId) localStorage.removeItem(TAB_KEY)
    }
    window.addEventListener("beforeunload", handleUnload)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("beforeunload", handleUnload)
      handleUnload()
    }
  }, [tabId, onDuplicateTab])

  return null
}
