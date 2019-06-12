export default {
    methods: {
        getTextWidth(text, font, add) {
            if (add === undefined) {
                add = 0;
            }

            if (font === undefined) {
                font = '400 14px Ubuntu, sans-serif';
            }

            let canvas = document.createElement("canvas");

            let context = canvas.getContext("2d");

            context.font = font;

            let metrics = context.measureText(text);

            return Math.ceil(metrics.width) + Number(add);
        },
    }
}
