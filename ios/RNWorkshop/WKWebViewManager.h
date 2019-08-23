//
//  WebViewManager.h
//  PrumobileRN
//
//  Created by Andrew Fong on 8/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "WebViewController.h"
@interface WKWebViewManager : NSObject<RCTBridgeModule>
@property(nonatomic,strong)WebViewController* viewController;
@end
