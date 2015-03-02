var Message = function (text, duration, font, color) {
    this.text = text;
    this.duration = duration || 120;

    this.font  = font || "30pt Arial";
    this.color = color || "#000000";
};
