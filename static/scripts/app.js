window.addEventListener("load", () => {
    // Arguments: box, mask, settings
    // box as query selector
    // mask as query selector
    // settings as object:
    // onMousedown - determine whether the effect should work on hover or mousedown (true by default)
    const imagePeeler = new ImagePeeler('.imagePeeler', '.imagePeeler__mask');
})