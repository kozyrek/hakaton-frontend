const scrollContainer = document.scrollingElement || document.documentElement;
const scrollTop = scrollContainer.scrollTop;

export const scrollPageLock = (scrollWidth) => {
    document.body.style.cssText = "; overflow: hidden; height: 100%; width: 100%; top: " + (scrollTop) + "px; padding-right: " + (scrollWidth) + "px;";
};

export const scrollPageUnlock = () => {
    document.body.style.cssText = "; overflow: auto; height: auto; width: auto; top: " + (scrollTop) + "px; padding-right: 0px;";
};
