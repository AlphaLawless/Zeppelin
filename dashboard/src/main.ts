import './style/initial.pcss'
import splashHtml from './splash.html?raw'

async function initApp() {
  try {
    if (window.location.pathname !== '/') {
      const vueApp = await import('./init-vue')
      console.log('Vue app loaded')
    } else {
      const app = document.querySelector('#app')
      if (app) {
        app.innerHTML = splashHtml
        
        // Parse query params
        const queryParams = Object.fromEntries(
          new URLSearchParams(window.location.search)
        )

        // Handle error if present
        if (queryParams.error) {
          const errorElement = document.querySelector('#error')
          if (errorElement) {
            errorElement.classList.add('has-error')
            const errorMessages: Record<string, string> = {
              noAccess: 'No dashboard access. If you think this is a mistake, please contact your server owner.',
              expiredLogin: 'Dashboard login expired. Please log in again.',
            }

            const errorMessageElem = document.createElement('div')
            errorMessageElem.classList.add('message')
            errorMessageElem.innerText = errorMessages[queryParams.error as keyof typeof errorMessages] || 'Unexpected error'
            errorElement.appendChild(errorMessageElem)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}

initApp()