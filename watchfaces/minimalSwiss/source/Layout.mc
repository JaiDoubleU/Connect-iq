import Toybox.Graphics;

// Layout controls: positions, dimensions, typography scale, hand geometry,
// marker placement, and complication placement. This stays identical across
// every theme -- only Themes.mc changes colors, fonts, and style symbols.
module Layout {

    class Geometry {

        var width;
        var height;
        var centerX;
        var centerY;
        var radius;

        // Marker placement (as fraction of radius, resolved to pixels here)
        var markerOuterR;
        var markerInnerRIndex;
        var markerInnerRTick;
        var numeralR;
        var dotR;

        // Hand geometry
        var hourHandLen;
        var minuteHandLen;
        var secondHandLen;
        var hourHandWidth;
        var minuteHandWidth;
        var secondHandWidth;

        // Branding placement (between 12 o'clock and center)
        var brandY;
        var brandSubY;

        // Complication placement: date at 3, battery at 6, heart rate at 9
        var dateX;
        var dateY;
        var batteryX;
        var batteryY;
        var hrX;
        var hrY;

        function initialize(dc) {
            width = dc.getWidth();
            height = dc.getHeight();
            centerX = width / 2.0;
            centerY = height / 2.0;
            radius = (width < height ? width : height) / 2.0;

            markerOuterR = radius * 0.92;
            markerInnerRIndex = radius * 0.80;
            markerInnerRTick = radius * 0.86;
            numeralR = radius * 0.74;
            dotR = radius * 0.88;

            hourHandLen = radius * 0.50;
            minuteHandLen = radius * 0.72;
            secondHandLen = radius * 0.80;
            hourHandWidth = radius * 0.045;
            minuteHandWidth = radius * 0.032;
            secondHandWidth = radius * 0.012;

            brandY = centerY - (radius * 0.40);
            brandSubY = centerY - (radius * 0.27);

            dateX = centerX + (radius * 0.52);
            dateY = centerY;
            batteryX = centerX;
            batteryY = centerY + (radius * 0.46);
            hrX = centerX - (radius * 0.52);
            hrY = centerY;
        }

    }

}
