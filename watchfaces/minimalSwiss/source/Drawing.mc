import Toybox.Graphics;
import Toybox.Math;

// Low-level geometric drawing helpers shared by the dial, markers, hands,
// branding, and complications. No theme or layout policy lives here.
module Drawing {

    function polarPoint(cx, cy, angleDeg, r) {
        var rad = Math.toRadians(angleDeg);
        return [cx + (r * Math.sin(rad)), cy - (r * Math.cos(rad))];
    }

    // Draws a hand (or tick) as a polygon running from `tailLength` behind the
    // pivot to `length` in front of it, tapering from `baseWidth` to `tipWidth`.
    // tailLength == 0 gives a plain hand; a positive tailLength adds a small
    // counterweight behind the pivot, used for the "technical" hand style.
    function drawHand(dc, cx, cy, angleDeg, length, baseWidth, tipWidth, tailLength, color) {
        var rad = Math.toRadians(angleDeg);
        var dx = Math.sin(rad);
        var dy = -Math.cos(rad);
        var px = -dy;
        var py = dx;

        var tipX = cx + (dx * length);
        var tipY = cy + (dy * length);
        var tailX = cx - (dx * tailLength);
        var tailY = cy - (dy * tailLength);

        var points = [
            [tailX + (px * baseWidth / 2), tailY + (py * baseWidth / 2)],
            [cx + (px * baseWidth / 2), cy + (py * baseWidth / 2)],
            [tipX + (px * tipWidth / 2), tipY + (py * tipWidth / 2)],
            [tipX - (px * tipWidth / 2), tipY - (py * tipWidth / 2)],
            [cx - (px * baseWidth / 2), cy - (py * baseWidth / 2)],
            [tailX - (px * baseWidth / 2), tailY - (py * baseWidth / 2)]
        ];

        dc.setColor(color, Graphics.COLOR_TRANSPARENT);
        dc.fillPolygon(points);
    }

    // Draws a straight rectangular tick/index between innerR and outerR.
    function drawTick(dc, cx, cy, angleDeg, innerR, outerR, width, color) {
        var rad = Math.toRadians(angleDeg);
        var dx = Math.sin(rad);
        var dy = -Math.cos(rad);
        var px = -dy;
        var py = dx;

        var innerX = cx + (dx * innerR);
        var innerY = cy + (dy * innerR);
        var outerX = cx + (dx * outerR);
        var outerY = cy + (dy * outerR);

        var points = [
            [innerX + (px * width / 2), innerY + (py * width / 2)],
            [outerX + (px * width / 2), outerY + (py * width / 2)],
            [outerX - (px * width / 2), outerY - (py * width / 2)],
            [innerX - (px * width / 2), innerY - (py * width / 2)]
        ];

        dc.setColor(color, Graphics.COLOR_TRANSPARENT);
        dc.fillPolygon(points);
    }

}
