import Toybox.WatchUi;
import Toybox.Graphics;
import Toybox.System;
import Toybox.Lang;
import Toybox.Application;

class minimalSwissView extends WatchUi.WatchFace {

    var geometry;

    function initialize() {
        WatchFace.initialize();
    }

    // Resolve screen-size-dependent layout once; reused every frame.
    function onLayout(dc as Dc) as Void {
        geometry = new Layout.Geometry(dc);
    }

    function onShow() as Void {
    }

    function onUpdate(dc as Dc) as Void {
        if (geometry == null) {
            geometry = new Layout.Geometry(dc);
        }

        var theme = Themes.getTheme();

        dc.setColor(theme[:background], theme[:background]);
        dc.clear();

        var markerStyle = Application.Properties.getValue("MarkerStyle");
        Dial.drawMarkers(dc, geometry, theme, markerStyle);
        Dial.drawBranding(dc, geometry, theme);
        Dial.drawComplications(dc, geometry, theme);

        drawHands(dc, theme);
    }

    function drawHands(dc, theme) as Void {
        var clockTime = System.getClockTime();
        var hours = clockTime.hour % 12;
        var minutes = clockTime.min;
        var seconds = clockTime.sec;

        var hourAngle = (hours * 30) + (minutes * 0.5);
        var minuteAngle = (minutes * 6) + (seconds * 0.1);
        var secondAngle = seconds * 6;

        drawHandForStyle(dc, theme[:handStyle], hourAngle, geometry.hourHandLen, geometry.hourHandWidth, theme[:hourHand]);
        drawHandForStyle(dc, theme[:handStyle], minuteAngle, geometry.minuteHandLen, geometry.minuteHandWidth, theme[:minuteHand]);

        if (Application.Properties.getValue("ShowSecondHand")) {
            Drawing.drawHand(dc, geometry.centerX, geometry.centerY, secondAngle, geometry.secondHandLen, geometry.secondHandWidth, geometry.secondHandWidth, geometry.radius * 0.16, theme[:secondHand]);
        }

        // Pivot -- every physical watch has one; keeps the hands from
        // looking like they float over the dial.
        dc.setColor(theme[:hourHand], Graphics.COLOR_TRANSPARENT);
        dc.fillCircle(geometry.centerX, geometry.centerY, geometry.radius * 0.025);
    }

    function drawHandForStyle(dc, style, angleDeg, length, width, color) as Void {
        var baseWidth = width;
        var tipWidth = width * 0.4;
        var tailLength = 0;

        if (style == :block) {
            tipWidth = width;
        } else if (style == :technical) {
            baseWidth = width * 0.6;
            tipWidth = width * 0.6;
            tailLength = length * 0.18;
        }

        Drawing.drawHand(dc, geometry.centerX, geometry.centerY, angleDeg, length, baseWidth, tipWidth, tailLength, color);
    }

    function onHide() as Void {
    }

    function onExitSleep() as Void {
    }

    function onEnterSleep() as Void {
    }

}
