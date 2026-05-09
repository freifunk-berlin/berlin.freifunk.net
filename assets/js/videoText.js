window.onload = (event) => {
    var v = document.getElementById('intro-video');
    v.addEventListener('mouseover', function () { this.controls = true; }, false);
    v.addEventListener('mouseout', function () { this.controls = false; }, false);
};
