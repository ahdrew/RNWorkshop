//
//  RNTTestMapManager.m
//  PrumobileRN
//
//  Created by Andrew Fong on 7/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNTTestMapManager.h"
#import <MapKit/MapKit.h>
@implementation RNTTestMapManager
RCT_EXPORT_MODULE()

-(UIView *)view
{
  return [[MKMapView alloc] init];
}
@end
