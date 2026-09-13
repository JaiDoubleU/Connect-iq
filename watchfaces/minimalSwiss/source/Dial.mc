import Toybox.Graphics;
import Toybox.Application;
import Toybox.System;
import Toybox.Time;
import Toybox.Time.Gregorian;
import Toybox.Activity;
import Toybox.Lang;

// Draws hour markers, the branding area, and complications onto the dial.
// Marker STYLE and which complications are visible are user settings;
// WHERE they sit on the dial is fixed layout, resolved once per frame in
// Layout.Geometry.
module Dial {

    function drawMarkers(dc, geo, theme, style) {
        var hour = 0;
        while (hour < 12) {
            var angle = hour * 30;
            var isCardinal = (hour % 3 == 0);

            if (style.equals("numerals") || (style.equals("combo") && isCardinal)) {
                drawNumeralMarker(dc, geo, theme, hour, angle, isCardinal);
            } else if (style.equals("dots")) {
                drawDotMarker(dc, geo, theme, angle, isCardinal);
            } else {
                drawIndexMarker(dc, geo, theme, angle, isCardinal);
            }

            hour += 1;
        }
    }

    function drawNumeralMarker(dc, geo, theme, hourIndex, angleDeg, isCardinal) {
        var label = (hourIndex == 0) ? "12" : hourIndex.toString();
        var pt = Drawing.polarPoint(geo.centerX, geo.centerY, angleDeg, geo.numeralR);
        var color = isCardinal ? theme[:primaryText] : theme[:hourMarker];

        dc.setColor(color, Graphics.COLOR_TRANSPARENT);
        dc.drawText(pt[0], pt[1], theme[:numeralFont], label, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

    function drawIndexMarker(dc, geo, theme, angleDeg, isCardinal) {
        var outerR = geo.markerOuterR;
        var innerR = isCardinal ? geo.markerInnerRIndex : geo.markerInnerRTick;
        var width = isCardinal ? (geo.radius * 0.035) : (geo.radius * 0.018);
        var color = isCardinal ? theme[:primaryText] : theme[:hourMarker];

        Drawing.drawTick(dc, geo.centerX, geo.centerY, angleDeg, innerR, outerR, width, color);
    }

    function drawDotMarker(dc, geo, theme, angleDeg, isCardinal) {
        var pt = Drawing.polarPoint(geo.centerX, geo.centerY, angleDeg, geo.dotR);
        var r = isCardinal ? (geo.radius * 0.028) : (geo.radius * 0.016);
        var color = isCardinal ? theme[:primaryText] : theme[:hourMarker];

        dc.setColor(color, Graphics.COLOR_TRANSPARENT);
        dc.fillCircle(pt[0], pt[1], r);
    }

    // Subtle brand name (and optional secondary line) between 12 and center.
    // Absent entirely when BrandName is left blank.
    function drawBranding(dc, geo, theme) {
        var name = Application.Properties.getValue("BrandName");
        if (name == null || name.equals("")) {
            return;
        }

        dc.setColor(theme[:logo], Graphics.COLOR_TRANSPARENT);
        dc.drawText(geo.centerX, geo.brandY, Graphics.FONT_XTINY, name.toUpper(), Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);

        var subText = Application.Properties.getValue("BrandSubText");
        if (subText != null && !subText.equals("")) {
            dc.setColor(theme[:secondaryText], Graphics.COLOR_TRANSPARENT);
            dc.drawText(geo.centerX, geo.brandSubY, Graphics.FONT_XTINY, subText, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
        }
    }

    // At most the three complications below, one per enabled setting.
    // Values only -- no boxes, dividers, or icon clutter around them.
    function drawComplications(dc, geo, theme) {
        if (Application.Properties.getValue("ShowDate")) {
            drawDateComplication(dc, geo, theme);
        }
        if (Application.Properties.getValue("ShowBattery")) {
            drawBatteryComplication(dc, geo, theme);
        }
        if (Application.Properties.getValue("ShowHeartRate")) {
            drawHeartRateComplication(dc, geo, theme);
        }
    }

    function drawDateComplication(dc, geo, theme) {
        var today = Gregorian.info(Time.now(), Time.FORMAT_SHORT);
        var dateStr = today.day.format("%02d");

        dc.setColor(theme[:complicationText], Graphics.COLOR_TRANSPARENT);
        dc.drawText(geo.dateX, geo.dateY, theme[:complicationFont], dateStr, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

    function drawBatteryComplication(dc, geo, theme) {
        var stats = System.getSystemStats();
        var pct = stats.battery.format("%d") + "%";

        dc.setColor(theme[:complicationText], Graphics.COLOR_TRANSPARENT);
        dc.drawText(geo.batteryX, geo.batteryY, theme[:complicationFont], pct, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

    function drawHeartRateComplication(dc, geo, theme) {
        var hr = null;
        var activityInfo = Activity.getActivityInfo();
        if (activityInfo != null) {
            hr = activityInfo.currentHeartRate;
        }
        var text = (hr == null) ? "--" : hr.toString();

        dc.setColor(theme[:complicationText], Graphics.COLOR_TRANSPARENT);
        dc.drawText(geo.hrX, geo.hrY, theme[:complicationFont], text, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

}
