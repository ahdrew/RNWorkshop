//
//  CameraViewManager.h
//  RNWorkshop
//
//  Created by Thomas Law on 25/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef CameraViewManager_h
#define CameraViewManager_h

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "ViewController.h"
@interface CameraViewManager : NSObject<RCTBridgeModule>
@property(nonatomic,strong)ViewController* viewController;
@end

#endif /* CameraViewManager_h */
