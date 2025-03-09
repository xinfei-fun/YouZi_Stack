export function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script ${url}`))
        document.head.appendChild(script)
    })
}