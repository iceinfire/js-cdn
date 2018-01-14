/*
    Author      : Clément GASSMANN-PRINCE
    Date        : 2018-01-13
    Description : Displays an image on a canvas; you can scroll, zoom and change the image.
*/

/*
    Constructor arguments : {
        canvasId -> string: id of the canvas element
        imageSrc -> string: path of the image source
    }
    Member functions : {
        setImage(:string:) : {
            imageSrc -> string: path of the image source
        }
        getZoom() : {} -> returns the zoom value
        setZoom(:int:) : {
            value -> int: zoom level
        }
    }
    Example : {
        let map = new ScrollableImage('idCanvas', 'res/img/map.jpg');
        map.setImage('res/img/map2.jpg');
    }
*/
function ScrollableImage(canvasSelector, imageSrc) {
    let canvas = document.querySelector(canvasSelector);
    let ctx = canvas.getContext('2d');
    
    let x = 0, y = 0, zoom = 1;

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x - (img.naturalWidth * zoom - img.naturalWidth) / 2,
                           y - (img.naturalHeight * zoom - img.naturalHeight) / 2,
                                img.naturalWidth * zoom, img.naturalHeight * zoom);
        requestAnimationFrame(render);
    };
    
    let img = new Image();
    img.onload = () => {x = -(img.naturalWidth / 2) + (canvas.width / 2);
                        y = -(img.naturalHeight / 2) + (canvas.height / 2); render();};
    img.src = imageSrc;
    
    let clk = false;
    let pos = {x: 0, y: 0};
    function scroll(p) {
        if (clk) {
            x += p.x-pos.x;
            y += p.y-pos.y;
        }
    }
    
    canvas.addEventListener('mousedown', e => {clk = true;});
    canvas.addEventListener('mouseup', e => {clk = false;});
    canvas.addEventListener('mousedown', e => {clk = true;});
    canvas.addEventListener('mousemove', e => {
        let r = canvas.getBoundingClientRect();
        let nPos = {x: e.clientX - r.left, y: e.clientY - r.top};
        scroll(nPos); pos = nPos;
    });
    
    this.setImage = imageSrc => { img.src = imageSrc; }
    this.setZoom = value => { zoom = value; }
    this.getZoom = () => { return zoom; }
}