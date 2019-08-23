package com.rnworkshop;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by andrewfong on 8/1/2019.
 */

public class WebviewModule extends ReactContextBaseJavaModule {
    public WebviewModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PruWebViewManager";
    }

    @ReactMethod
    public void showWebview(){
        Intent intent = new Intent(this.getReactApplicationContext(),MapsActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.getReactApplicationContext().startActivity(intent);
    }
}
