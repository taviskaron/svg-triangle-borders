function makeItTriangle(classname, trHeight = 30, bHeight = 5) {

    /*
  classname (string) is a designated block's class
  trHeight (number) is the triangles' height (in pixels)
  bHeight (number) is the height of rectangles between the block and the triangles (in pixels)
  */

    const arrayTriangleClass = document.getElementsByClassName(classname);

    // triangles height
    const triangleHeight = trHeight;

    // base height
    const baseHeight = bHeight;

    // main cycle
    for (i=0; i<arrayTriangleClass.length; i++) {

        // checking if a target element possesses a non-zero width value
        if (!arrayTriangleClass[i].offsetWidth) {
            return false;
        }

        const thisWidth = arrayTriangleClass[i].offsetWidth;

        // starting to build up a <path d="..." value in order to concatenate it further on
        var trianglePathD = "M 0 " + (triangleHeight + baseHeight) + " L 0 " + (triangleHeight) + " ";

        // number of points (tops and bottoms for path lines, which makes for a number of iterations below)
        var pointsNumber = Math.floor(thisWidth/20);

        // building up a generative part of <path d="..."
        //k%2+1 stands for a multiplicator, so that we multiply heights by 1 and 2 consequently to create a triangular waveline path
        for (k=1; k<pointsNumber; k++) {
            trianglePathD = trianglePathD + " L " + (Math.floor(thisWidth*(1/pointsNumber)*k)) + " " + (Math.floor((triangleHeight)/(k%2+1)));
        }

        // manually cobbling together the final part of our path in order to avoid the "last pixel problem"
        trianglePathD = trianglePathD + " L " + thisWidth + " " + triangleHeight + " L " + thisWidth + " " + (triangleHeight + baseHeight) + " L 0 " + (triangleHeight + baseHeight) + " Z ";

        // concatenating the whole <svg> tag together
        const pathTriangleBefore = "<svg xmlns='http://www.w3.org/2000/svg' viewBox=\"0 0 " + thisWidth + " " + (trHeight+baseHeight) + " \">\n" +
            "            <path fill=\"white\"  d=\" " + trianglePathD + "\" ></path>\n" +
            "        </svg>";

        //replicating the full path for the bottom to mirror it afterwards
        const pathTriangleAfter = pathTriangleBefore;

        // making it up for the gaps created by <svg> viewboxes
        arrayTriangleClass[i].style.marginTop = "-8px";
        arrayTriangleClass[i].style.marginBottom = "-4px";

        // finally placing our paths as HTML markup before and after the target element
        arrayTriangleClass[i].insertAdjacentHTML("beforebegin", pathTriangleBefore);
        arrayTriangleClass[i].insertAdjacentHTML("afterend", pathTriangleAfter);

        // mirroring the bottom path
        arrayTriangleClass[i].nextSibling.style.transformOrigin = "center center";
        arrayTriangleClass[i].nextSibling.style.transform = "rotate(180deg)";
    }

}

