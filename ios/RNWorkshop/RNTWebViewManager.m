//
//  RNTWebViewManager.m
//  PrumobileRN
//
//  Created by Andrew Fong on 10/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNTWebViewManager.h"
#import <WebKit/WebKit.h>

@implementation RNTWebViewManager

RCT_EXPORT_MODULE()

-(UIView *)view
{
  WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
  config.websiteDataStore = [WKWebsiteDataStore defaultDataStore];
  config.processPool = [[WKProcessPool alloc] init];
  WKPreferences *preferences = [WKPreferences new];
  preferences.javaScriptCanOpenWindowsAutomatically = YES;
  
  
  WKWebView* webview = [[WKWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds] configuration:config];
  webview.UIDelegate = self;
  webview.navigationDelegate = self;
  [webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"https://www.google.com"]]];
  return webview;
}

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Finish"
                                                      message:@"Load finished"
                                                     delegate:self
                                            cancelButtonTitle:@"OK"
                                            otherButtonTitles:nil, nil];
  [alertView show];
}
@end
