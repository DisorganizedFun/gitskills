!(function(doc, win) {
   var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "resize" : "orientationchange",
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 50 * (width / 320) + "px");
        };
   win.addEventListener(evt, fn, false);
   doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));
