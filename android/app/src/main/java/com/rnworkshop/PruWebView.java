package com.rnworkshop;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by andrewfong on 10/1/2019.
 */

public class PruWebView extends WebView {
    public PruWebView(Context context) {
        super(context);
        this.setWebViewClient(new PruWebviewClient());
        this.getSettings().setJavaScriptEnabled(true);
        this.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        this.loadUrl("https://www.google.com");
    }


    private class PruWebviewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(final WebView view, final String url){
            return false;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
//            AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
//            builder.setMessage("Load finished").setTitle("Finish").setPositiveButton("OK", new DialogInterface.OnClickListener() {
//                @Override
//                public void onClick(DialogInterface dialogInterface, int i) {
//
//                }
//            });
//            AlertDialog dialog = builder.create();
//            dialog.show();
        }
    }

}
