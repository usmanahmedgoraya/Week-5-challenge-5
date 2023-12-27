import { useEffect, useState } from 'react'

const DarkMode = () => {
    const [darkMode, setdarkMode] = useState(false)

  const ThemeMode = () => {


    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setdarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setdarkMode(false)
    }

    // Whenever the user chooses light mode
    localStorage.theme = 'light'

    // Whenever the user chooses dark mode
    localStorage.theme = 'dark'

    // Whenever the user chooses to respect the OS preference
    localStorage.removeItem('theme')
  }

  useEffect(() => {
    ThemeMode()
  }, [])


  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setdarkMode((prevDarkMode) => {
      return !prevDarkMode
    })
  }
  return (
         <>
            <div className="w-full flex items-center justify-center ">

                <input checked={darkMode} id="checkbox" type="checkbox" onChange={handleDarkMode} />
                <label className="switch" htmlFor="checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider ">
                        <path
                            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                        ></path>
                    </svg>
                </label>

            </div>
        </>
  )
}

export default DarkMode