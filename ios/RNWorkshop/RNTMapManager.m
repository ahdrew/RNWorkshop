//
//  RNTMapManager.m
//  PrumobileRN
//
//  Created by Andrew Fong on 4/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "RNTMapManager.h"
#import <MapKit/MapKit.h>


@implementation RNTMapManager

RCT_EXPORT_MODULE()

-(UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
