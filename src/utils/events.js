export const eventsToDispatch = {
    MFE_LOADED: 'MFE_LOADED',
    MFE_UNLOADED: 'MFE_UNLOADED',
    HOST_THEME_CHANGED: 'HOST_THEME_CHANGED'
};

const dispatchEvent = (event, data) => window.dispatchEvent(new CustomEvent(event, { detail: data }));

export default dispatchEvent;