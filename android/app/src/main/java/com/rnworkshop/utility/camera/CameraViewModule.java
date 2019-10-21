package com.rnworkshop.utility.camera;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rnworkshop.MapsActivity;

/**
 * Created by andrewfong on 8/1/2019.
 */

public class CameraViewModule extends ReactContextBaseJavaModule {
    public CameraViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CameraViewManager";
    }

    @ReactMethod
    public void showCameraView(){
        Intent intent = new Intent(this.getReactApplicationContext(),RecordedActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.getReactApplicationContext().startActivity(intent);
    }
}
