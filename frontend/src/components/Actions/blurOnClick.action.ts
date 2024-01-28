

export const blurOnClick = (node: HTMLElement) => {
    const handleClick = () => {
        node.blur();
    };

    node.addEventListener('click', handleClick);

    return {
        destroy() {
            node.removeEventListener('click', handleClick);
        }
    };
};
