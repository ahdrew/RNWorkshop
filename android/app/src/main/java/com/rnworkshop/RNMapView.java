package com.rnworkshop;

import android.content.Context;
import android.util.Log;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.GoogleMapOptions;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;

public class RNMapView extends MapView implements OnMapReadyCallback {
    public GoogleMap map;
    public RNMapView(Context context, GoogleMapOptions googleMapOptions) {
        super(context, googleMapOptions);
        super.onCreate(null);
        super.onResume();
        super.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        Log.i("TEST","map view getMapAsync");
        map = googleMap;
        map.setMinZoomPreference(12);
        LatLng ny = new LatLng(40.7143528, -74.0059731);
        map.moveCamera(CameraUpdateFactory.newLatLng(ny));
    }
}
