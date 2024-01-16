const checkEnv = () => {
    try {
        if (!document || !window) return false;
        window.location.pathname.split("/").pop();
        document.body.addEventListener('load', e => { });
        Array.from(document.querySelector('body')).filter(x => typeof x === Element);
        return true;
    }
    catch (e) { return false; }
}
const isBrowser = checkEnv();

module.exports = { isBrowser: isBrowser };