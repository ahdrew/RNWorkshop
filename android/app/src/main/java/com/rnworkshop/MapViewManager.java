package com.rnworkshop;

import android.util.Log;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.GoogleMapOptions;
import com.google.android.gms.maps.MapView;

import javax.annotation.Nonnull;

public class MapViewManager extends ViewGroupManager<MapView> {
    private GoogleMap map;
    @Nonnull
    @Override
    public String getName() {
        return "RNTTestMap";
    }

    @Nonnull
    @Override
    protected MapView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        Log.i("TEST","create view instance");
        GoogleMapOptions options = new GoogleMapOptions();

        return new RNMapView(reactContext,options);
    }
}
