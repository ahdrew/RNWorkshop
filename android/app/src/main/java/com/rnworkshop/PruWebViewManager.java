package com.rnworkshop;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by andrewfong on 10/1/2019.
 */

public class PruWebViewManager extends SimpleViewManager<PruWebView> {

    @Override
    public String getName() {
        return "RNTWebView";
    }

    @Override
    protected PruWebView createViewInstance(ThemedReactContext reactContext) {
        return new PruWebView(reactContext);
    }
}
