package com.rnworkshop;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.hardware.biometrics.BiometricPrompt;
import android.os.Build;
import android.os.CancellationSignal;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.hardware.fingerprint.FingerprintManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by andrewfong on 8/1/2019.
 */

public class FingerprintModule extends ReactContextBaseJavaModule {

    public FingerprintModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TouchIdManager";
    }

    @TargetApi(Build.VERSION_CODES.P)
    @ReactMethod
    public void startTouchIDPromise(Promise promise){
        if(!(isSdkVersionSupported() && isHardwareSupported(this.getReactApplicationContext()) && isPermissionGranted(this.getReactApplicationContext()) && isFingerprintAvailable(this.getReactApplicationContext()))){
            promise.reject("auth_fail","Fingerprint authentication not allowed");
        }
        displayBiometricPrompt(new BiometricPrompt.AuthenticationCallback(){
            @Override
            public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                promise.resolve(1);
            }

//            @Override
//            public void onAuthenticationError(int errorCode, CharSequence errString) {
//                super.onAuthenticationError(errorCode, errString);
//                promise.reject(Integer.toString(errorCode),errString.toString());
//            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                promise.reject("auth_fail","Fingerprint authentication failed");
            }
        });
    }
    @TargetApi(Build.VERSION_CODES.P)
    @ReactMethod
    public void startTouchID(){
        if(!(isSdkVersionSupported() && isHardwareSupported(this.getReactApplicationContext()) && isPermissionGranted(this.getReactApplicationContext()) && isFingerprintAvailable(this.getReactApplicationContext()))){
            Toast.makeText(this.getReactApplicationContext(),
                    "Fingerprint authentication not allowed",
                    Toast.LENGTH_LONG).show();
            return;
        }
        displayBiometricPrompt(new BiometricPrompt.AuthenticationCallback(){

        });

    }

    public static boolean isSdkVersionSupported() {
        return (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M);
    }

    public static boolean isHardwareSupported(Context context) {
        FingerprintManagerCompat fingerprintManager = FingerprintManagerCompat.from(context);
        return fingerprintManager.isHardwareDetected();
    }

    public static boolean isFingerprintAvailable(Context context) {
        FingerprintManagerCompat fingerprintManager = FingerprintManagerCompat.from(context);
        return fingerprintManager.hasEnrolledFingerprints();
    }

    public static boolean isPermissionGranted(Context context) {
        return ActivityCompat.checkSelfPermission(context, Manifest.permission.USE_FINGERPRINT) ==
                PackageManager.PERMISSION_GRANTED;
    }

    @TargetApi(Build.VERSION_CODES.P)
    private void displayBiometricPrompt(final BiometricPrompt.AuthenticationCallback biometricCallback){
        Toast.makeText(this.getReactApplicationContext(),
                "Fingerprint authentication start",
                Toast.LENGTH_LONG).show();

        BiometricPrompt bm = new BiometricPrompt.Builder(this.getReactApplicationContext())
                .setTitle("Fingerprint Test")
                .setSubtitle("")
                .setDescription("React native module test")
                .setNegativeButton("Test", this.getReactApplicationContext().getMainExecutor(), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        biometricCallback.onAuthenticationSucceeded(null);
                    }
                })
                .build();
        bm.authenticate(new CancellationSignal(),this.getReactApplicationContext().getMainExecutor(),biometricCallback);
    }


}
