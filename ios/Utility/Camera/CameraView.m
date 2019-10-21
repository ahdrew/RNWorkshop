//
//  CameraView.m
//  RNWorkshop
//
//  Created by Thomas Law on 21/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CameraView.h"

#import "ViewController.h"

//#import <React/RCTAssert.h>
//#import <React/RCTAssert.h>
//#import <React/RCTBridge.h>
//#import <React/RCTModalHostViewController.h>
//#import <React/RCTTouchHandler.h>
//#import <React/RCTUIManager.h>
#import <React/UIView+React.h>

@interface CameraView() {
  
}
@property (nonatomic, assign) BOOL _isPresented;
@end

@implementation CameraView

- (void)didMoveToWindow
{
  [super didMoveToWindow];

  if (!self._isPresented && self.window) {
    ViewController *_customViewController = [[ViewController alloc] init];
    [self.reactViewController presentViewController:_customViewController
                                           animated:NO
                                         completion:nil];
    self._isPresented = YES;
  }
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
