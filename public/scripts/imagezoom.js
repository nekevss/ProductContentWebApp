//Pulling this from W3 and reworking it.
//TODO: Make this not an entire mess

function imageZoom(imgID, resultID) {
  let img, lens, result, cx, cy;
  //sets DOM objects
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens div and set attributes: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  lens.setAttribute("id", "zoomLens")
  /* Insert lens onto img parent node: */
  parent= img.parentElement;
  parent.insertBefore(lens, img);
    
  /* Calculate the ratio between result DIV and lens: */
  //result div width divided by lens offset width
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "?wid=1200&hei=1200')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  //This is really clunky. Is there a good way to set it in main doc
  parent.addEventListener("mouseleave", function handler(evt){
      document.getElementById("ImageZoom").style.visibility = "hidden";
      parent.removeChild(lens);
      parent.removeEventListener("mouseleave", handler);
  }, false)
    
  function moveLens(evt) {
    let pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    evt.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(evt);
    /* Calculate the position of the lens: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /* Set the position of the lens: */
    //Honestly, I'm not exactly sure why this buffer works so well right now.
    //I just know it does. Variable x is definitely broken and needs a buffer
    //but why exactly the buffer is the left of the image position plus a third
    //of the lens width is beyond me.
    //Note: I'm nearly 100% sure this has to do with the space that exists between
    //the CentralImage div and the image itself.
    let pixelbuffer = pos.ax - (lens.offsetWidth / 3);
    //console.log(x+pixelbuffer);
    lens.style.left = (x + pixelbuffer) + 'px';
    lens.style.top = y + 'px';
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
    
  function getCursorPos(evt) {
    let a, x = 0, y = 0;
    evt = evt || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    //console.log(a);
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = evt.pageX - a.left;
    y = evt.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    //console.log({x : x, y : y});
    return {x : x, y : y, ax:a.left};
  }
}

