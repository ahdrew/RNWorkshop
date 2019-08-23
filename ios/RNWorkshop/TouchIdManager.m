//
//  TouchIdManager.m
//  PrumobileRN
//
//  Created by Andrew Fong on 4/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TouchIdManager.h"
#import <LocalAuthentication/LocalAuthentication.h>
#import <UIKit/UIKit.h>
#import "AppDelegate.h"

@implementation TouchIdManager

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(startTouchIDPromise, touchIdResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  LAContext *myContext = [[LAContext alloc] init];
  NSError *authError = nil;
  NSString *myLocalizedReasonString = @"Touch ID Test to show Touch ID working in a custom app";
  
  if ([myContext canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&authError]) {
    [myContext evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
              localizedReason:myLocalizedReasonString
                        reply:^(BOOL success, NSError *error) {
                          if (success) {
                            dispatch_async(dispatch_get_main_queue(), ^{
                              //                              [self performSegueWithIdentifier:@"Success" sender:nil];
                              resolve([NSNumber numberWithInt:1]);
                            });
                          } else {
                            dispatch_async(dispatch_get_main_queue(), ^{
//                              UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Error"
//                                                                                  message:error.description
//                                                                                 delegate:self
//                                                                        cancelButtonTitle:@"OK"
//                                                                        otherButtonTitles:nil, nil];
//                              [alertView show];
                              // Rather than show a UIAlert here, use the error to determine if you should push to a keypad for PIN entry.
                              reject(@"auth_fail",@"Auth fail",error);
                            });
                          }
                        }];
  } else {
    dispatch_async(dispatch_get_main_queue(), ^{
      reject(@"auth_fail",authError.description,authError);
    });
  }
}

RCT_EXPORT_METHOD(startTouchID)
{
  LAContext *myContext = [[LAContext alloc] init];
  NSError *authError = nil;
  NSString *myLocalizedReasonString = @"Touch ID Test to show Touch ID working in a custom app";

  if ([myContext canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&authError]) {
    [myContext evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
              localizedReason:myLocalizedReasonString
                        reply:^(BOOL success, NSError *error) {
                          if (success) {
                            dispatch_async(dispatch_get_main_queue(), ^{
//                              [self performSegueWithIdentifier:@"Success" sender:nil];
                            });
                          } else {
                            dispatch_async(dispatch_get_main_queue(), ^{
                              UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Error"
                                                                                  message:error.description
                                                                                 delegate:self
                                                                        cancelButtonTitle:@"OK"
                                                                        otherButtonTitles:nil, nil];
                              [alertView show];
                              // Rather than show a UIAlert here, use the error to determine if you should push to a keypad for PIN entry.
                            });
                          }
                        }];
  } else {
    dispatch_async(dispatch_get_main_queue(), ^{
      UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Error"
                                                          message:authError.description
                                                         delegate:self
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles:nil, nil];
      [alertView show];
      // Rather than show a UIAlert here, use the error to determine if you should push to a keypad for PIN entry.
    });
  }
}
@end
