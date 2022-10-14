function download(url, name) {
    let savey = document.createElement('a');
    savey.href = url;
    savey.target = '_blank';
    savey.download = name;
    savey.dispatchEvent(new MouseEvent('click'));
}

let i = 0;
setInterval(() => {
    let images = document.querySelectorAll(".mainViewerImg");
    i += 1
    i = Math.min(i, images.length - 1);
    download(images[i].src, i.toString());
    $(document.getElementById("tool-pager-next")).trigger("click");
}, 10000)
