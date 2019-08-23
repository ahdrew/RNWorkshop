//
//  WebViewManager.m
//  PrumobileRN
//
//  Created by Andrew Fong on 8/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WKWebViewManager.h"
#import "WebViewController.h"
#import "AppDelegate.h"
@implementation WKWebViewManager

RCT_EXPORT_MODULE(PruWebViewManager);

RCT_EXPORT_METHOD(showWebview)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    self.viewController = [[WebViewController alloc] init];
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:self.viewController animated:YES completion:nil];
  });
}
@end
