class AnimationTrack {
    constructor(object, start, end, properties) {
        this.object = document.getElementById(object);
        this.start = start;
        this.end = end;
        this.properties = {
            opacity: false,
            translateY: false,
            x: 0,
        };

        this.properties = {
            ...this.properties,
            ...properties
        };

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

        window.addEventListener("scroll", this.setValues);
    }

    setValues = () => {
        let windowCenter = window.scrollY + window.innerHeight / 2,
            progress = 0;

        if (windowCenter < this.start) {
            progress = 0;
        } else if (windowCenter > this.start && windowCenter < this.end) {
            progress = ((windowCenter - this.start) / this.end) * 2;
        } else if (windowCenter > this.end) {
            progress = 1;
        }

        if (progress <= 0) {
            if (this.properties.opacity) {
                this.object.style.opacity = 0;
            } else if (this.properties.translate) {
                this.object.style.transform = `translateY(0) translateX(0)`;
            }
        } else if (progress > 0 && progress < 1) {
            if (this.properties.opacity) {
                if (progress < 0.5) {
                    this.object.style.opacity = progress * 2;
                } else {
                    this.object.style.opacity = (1 - progress) * 2;
                }
            }

            if (this.properties.translate && this.properties.x !== 0) {
                if (progress < 0.5) {
                    this.object.style.transform = `translate3d(${(progress * 2) * this.properties.x}px, calc(${windowCenter - this.start}px - 50%), 0)`;
                } else {
                    this.object.style.transform = `translate3d(${((1 - progress) * 2) * this.properties.x}px, calc(${windowCenter - this.start}px - 50%), 0)`;
                }
            } else if (this.properties.translate) {
                this.object.style.transform = `translate3d(0, calc(${windowCenter - this.start}px - 50%), 0)`;
            }
        } else if (progress >= 1) {
            if (this.properties.opacity) {
                this.object.style.opacity = 0;
            } else if (this.properties.translate) {
                this.object.style.transform = `translate3d(0, calc(${windowCenter - this.end}px - 50%), 0)`;
            }
        }

    }
}

window.addEventListener("load", () => {
    const object = new AnimationTrack('object', 1000, 2000, {
        opacity: true,
        translate: true,
        x: 300,
    });
})