import Toybox.Application;
import Toybox.Graphics;
import Toybox.Lang;

// Theme controls: colors, fonts, logo/branding tone, marker/hand rendering style,
// and accent treatment. Layout (positions, geometry, placement) lives in Layout.mc
// and stays identical across every theme.
module Themes {

    function getThemeId() {
        var id = Application.Properties.getValue("Theme");
        if (id == null) {
            return "swiss";
        }
        return id;
    }

    function getTheme() {
        var id = getThemeId();
        if (id.equals("swatch")) {
            return swatch();
        } else if (id.equals("racing")) {
            return racing();
        } else if (id.equals("monochrome")) {
            return monochrome();
        } else if (id.equals("custom")) {
            return custom();
        }
        return swiss();
    }

    // Tissot/Mondaine-inspired: off-white dial, charcoal type, restrained red accent.
    function swiss() {
        return {
            :background => 0xF2EFE9,
            :primaryText => 0x2B2B2B,
            :secondaryText => 0x8A8A8A,
            :hourMarker => 0x2B2B2B,
            :minuteMarker => 0xCFC9BC,
            :hourHand => 0x2B2B2B,
            :minuteHand => 0x2B2B2B,
            :secondHand => 0xA6192E,
            :accent => 0xA6192E,
            :complicationText => 0x8A8A8A,
            :complicationIcon => 0x8A8A8A,
            :logo => 0x2B2B2B,
            :numeralFont => Graphics.FONT_MEDIUM,
            :complicationFont => Graphics.FONT_XTINY,
            :handStyle => :tapered
        };
    }

    // Swatch-inspired: white dial, bold black type, bright playful accent.
    function swatch() {
        return {
            :background => 0xFFFFFF,
            :primaryText => 0x111111,
            :secondaryText => 0x666666,
            :hourMarker => 0x111111,
            :minuteMarker => 0xE8E8E8,
            :hourHand => 0x111111,
            :minuteHand => 0x111111,
            :secondHand => 0xE8342A,
            :accent => 0xE8342A,
            :complicationText => 0x666666,
            :complicationIcon => 0xE8342A,
            :logo => 0x111111,
            :numeralFont => Graphics.FONT_NUMBER_MEDIUM,
            :complicationFont => Graphics.FONT_XTINY,
            :handStyle => :block
        };
    }

    // TAG Heuer / motorsport-inspired: black dial, white type, red second hand.
    function racing() {
        return {
            :background => 0x0A0A0A,
            :primaryText => 0xFFFFFF,
            :secondaryText => 0x9A9A9A,
            :hourMarker => 0xFFFFFF,
            :minuteMarker => 0x3A3A3A,
            :hourHand => 0xFFFFFF,
            :minuteHand => 0xFFFFFF,
            :secondHand => 0xD81E2C,
            :accent => 0xD81E2C,
            :complicationText => 0x9A9A9A,
            :complicationIcon => 0xD81E2C,
            :logo => 0xFFFFFF,
            :numeralFont => Graphics.FONT_TINY,
            :complicationFont => Graphics.FONT_XTINY,
            :handStyle => :technical
        };
    }

    // Braun-inspired: black dial, white type, grey secondary info, no color accent.
    function monochrome() {
        return {
            :background => 0x000000,
            :primaryText => 0xFFFFFF,
            :secondaryText => 0x808080,
            :hourMarker => 0xFFFFFF,
            :minuteMarker => 0x3A3A3A,
            :hourHand => 0xFFFFFF,
            :minuteHand => 0xFFFFFF,
            :secondHand => 0xC0C0C0,
            :accent => 0xC0C0C0,
            :complicationText => 0x808080,
            :complicationIcon => 0x808080,
            :logo => 0xFFFFFF,
            :numeralFont => Graphics.FONT_MEDIUM,
            :complicationFont => Graphics.FONT_XTINY,
            :handStyle => :tapered
        };
    }

    // User-defined palette, read live from settings.
    function custom() {
        var props = Application.Properties;
        var background = props.getValue("CustomBackgroundColor");
        var primaryText = props.getValue("CustomPrimaryTextColor");
        var secondaryText = props.getValue("CustomSecondaryTextColor");
        var marker = props.getValue("CustomMarkerColor");
        var hand = props.getValue("CustomHandColor");
        var accent = props.getValue("CustomAccentColor");

        return {
            :background => background,
            :primaryText => primaryText,
            :secondaryText => secondaryText,
            :hourMarker => marker,
            :minuteMarker => secondaryText,
            :hourHand => hand,
            :minuteHand => hand,
            :secondHand => accent,
            :accent => accent,
            :complicationText => secondaryText,
            :complicationIcon => accent,
            :logo => primaryText,
            :numeralFont => Graphics.FONT_MEDIUM,
            :complicationFont => Graphics.FONT_XTINY,
            :handStyle => :tapered
        };
    }

}
