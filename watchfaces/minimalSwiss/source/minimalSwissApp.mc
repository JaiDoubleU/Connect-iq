import Toybox.Application;
import Toybox.Lang;
import Toybox.WatchUi;

class minimalSwissApp extends Application.AppBase {

    function initialize() {
        AppBase.initialize();
    }

    function onStart(state as Dictionary?) as Void {
    }

    function onStop(state as Dictionary?) as Void {
    }

    function getInitialView() as Array<Views or InputDelegates>? {
        return [ new minimalSwissView() ] as Array<Views or InputDelegates>;
    }

    // Theme, marker style, branding, and complication toggles all live in
    // settings -- any change here should redraw immediately.
    function onSettingsChanged() as Void {
        WatchUi.requestUpdate();
    }

}

function getApp() as minimalSwissApp {
    return Application.getApp() as minimalSwissApp;
}
