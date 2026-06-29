const subscribe = (eventName, callback) =>
{
    const handler = (e) => callback(e.detail)
    document.addEventListener(eventName, handler)
    return () => document.removeEventListener(eventName, handler)
}

const emit = (eventName, data) =>
{
    document.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export { subscribe, emit }
