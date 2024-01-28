export function resizeToFit(node: HTMLVideoElement, videoReady: boolean = true) {
    function resize() {
        const parent = node.parentElement;
        if (parent) {
            const parentWidth = parent.offsetWidth;
            const parentHeight = parent.offsetHeight;
            const videoWidth = node.videoWidth;
            const videoHeight = node.videoHeight;

            const parentAspectRatio = parentWidth / parentHeight;
            const videoAspectRatio = videoWidth / videoHeight;

            if (parentAspectRatio > videoAspectRatio) {
                node.style.width = 'auto';
                node.style.height = '100%';
            } else {
                node.style.width = '100%';
                node.style.height = 'auto';
            }
        }
    }


    resize();
    window.addEventListener('resize', resize);


    return {
        update(videoReady: boolean) { resize(); },
        destroy() {
            window.removeEventListener('resize', resize);
        },
    };
}
