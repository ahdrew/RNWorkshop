//
//  RNTWebViewManager.h
//  PrumobileRN
//
//  Created by Andrew Fong on 10/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"
#import <WebKit/WebKit.h>

@interface RNTWebViewManager : RCTViewManager<WKUIDelegate,WKNavigationDelegate>

@end
