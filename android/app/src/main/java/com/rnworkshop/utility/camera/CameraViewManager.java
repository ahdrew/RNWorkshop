package com.rnworkshop.utility.camera;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.google.android.gms.maps.GoogleMapOptions;
import com.google.android.gms.maps.MapView;
import com.rnworkshop.RNMapView;
import com.rnworkshop.utility.camera.watermark.widget.CameraView;

import javax.annotation.Nonnull;

/**
 * Created by thomaslaw on 10/22/2019.
 */

public class CameraViewManager extends SimpleViewManager<CameraView> {

    @Override
    public String getName() {
        return "RNTCameraView";
    }

    @Nonnull
    @Override
    protected CameraView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new CameraView(reactContext);
    }
}
