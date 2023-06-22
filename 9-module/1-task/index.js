export default function promiseClick(button) {
    return new Promise(resolve => {
        button.addEventListener('click', function handler(event) {
            resolve(event);
        }, { once: true });
    });
}
