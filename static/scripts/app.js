/**
 * Initialize AnimationTrack.
 * @param {string} object - ID of an object.
 * @param {number} start - OffsetY of the beginning of the animation.
 * @param {number} end - OffsetY of the end of the animation.
 * @param {object} props - Object with properties.
 * @param {boolean} props.opacity - Animate opacity, true by default.
 * @param {boolean} props.translate - Animate object movement, true by default.
 * @param {number} props.x - Include x offset in your animation, 0 by default.
 */
class AnimationTrack {
    constructor(object, start, end, props) {
        this.object = document.getElementById(object);
        this.start = start;
        this.end = end;
        this.props = {
            opacity: true,
            translate: true,
            x: 0,
        };
        this.props = {
            ...this.props,
            ...props
        };
        this.windowCenter = window.scrollY + window.innerHeight / 2;

        this.validate();

        window.addEventListener("scroll", this.handleScroll);
    }

    // event handlers

    handleScroll = () => {
        this.updateWindowCenter();
        this.getProgress();
        this.setValues(this.getProgress());
    }

    // utilities

    validate = () => {
        if (this.object === null || this.object === undefined) {
            console.error("AnimationTrack: Object is not defined!");
            return;
        }
        if (this.start === null || this.start === undefined || isNaN(this.start)) {
            console.error("AnimationTrack: Value start is not defined or is not a number!");
            return;
        }
        if (this.end === null || this.end === undefined || isNaN(this.end)) {
            console.error("AnimationTrack: Value end is not defined or is not a number!");
            return;
        }
    }

    updateWindowCenter = () => {
        this.windowCenter = window.scrollY + window.innerHeight / 2;
    }

    getProgress = () => {
        if (this.windowCenter < this.start || this.windowCenter > this.end) return false;

        if (this.object.classList.contains('animation-track--tracking-disabled')) this.object.classList.remove('animation-track--tracking-disabled');

        let progress = 0;

        if (this.windowCenter < this.start) {
            progress = 0;
        } else if (this.windowCenter > this.start && this.windowCenter < this.end) {
            progress = ((this.windowCenter - this.start) / this.end) * 2;
        } else if (this.windowCenter > this.end) {
            progress = 1;
        }

        return progress;
    }

    setValues = (progress) => {
        if (progress === false) {
            if (this.object.classList.contains('animation-track--tracking-disabled')) {
                return;
            } else {
                this.object.classList.add('animation-track--tracking-disabled');
                if (this.props.opacity) this.object.style.opacity = 0;
                if (this.props.translate) this.object.style.transform = this.object.style.transform.replace(/translateX\((.*?)\)/, 'translateX(0)');
            }
            return;
        }

        if (progress <= 0) {
            if (this.props.opacity) {
                this.object.style.opacity = 0;
            } else if (this.props.translate) {
                this.object.style.transform = `translateY(0) translateX(0)`;
            }
        } else if (progress > 0 && progress < 1) {
            if (this.props.opacity) {
                if (progress < 0.5) {
                    this.object.style.opacity = progress * 2;
                } else {
                    this.object.style.opacity = (1 - progress) * 2;
                }
            }
            if (this.props.translate) {
                if (progress < 0.5) {
                    this.object.style.transform = `translateX(${(progress * 2) * this.props.x}px) translateY(calc(${this.windowCenter - this.start}px - 50%))`;
                } else {
                    this.object.style.transform = `translateX(${((1 - progress) * 2) * this.props.x}px) translateY(calc(${this.windowCenter - this.start}px - 50%))`;
                }
            }
        } else if (progress >= 1) {
            if (this.props.opacity) {
                this.object.style.opacity = 0;
            } else if (this.props.translate) {
                this.object.style.transform = `translateX(0) translateY(calc(${this.windowCenter - this.end}px - 50%))`;
            }
        }
    }
}