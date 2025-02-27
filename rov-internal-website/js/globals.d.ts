import 'vite/types/import-meta.d.ts';
declare global {
    interface Window {
        Twitch: any;
    }

    interface Element {
        ALLOW_KEYBOARD_INPUT: Number;
    }

    interface HTMLElement {
        webkitRequestFullscreen?(): Promise<void>;
        webkitRequestFullScreen?(): Promise<void>;
        mozRequestFullScreen?(): Promise<void>;
        msRequestFullscreen?(): Promise<void>;
        webkitEnterFullscreen?(): Promise<void>;
    }

    interface Document {
        requestFullscreen(): Promise<void>;
        webkitRequestFullscreen?(): Promise<void>;
        mozRequestFullScreen?(): Promise<void>;
        msRequestFullscreen?(): Promise<void>;
        webkitExitFullscreen?(): Promise<void>;
        mozCancelFullScreen?(): Promise<void>;
        msExitFullscreen?(): Promise<void>;
        msFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        webkitFullscreenElement?: Element;
        fullscreenElement?: Element;
        webkitFullscreenEnabled?: boolean;
        mozFullScreenEnabled?: boolean;
        msFullscreenEnabled?: boolean;
    }
}

export { };
