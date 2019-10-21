// CameraViewManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>
#import "CameraView.h"

@interface CameraViewManager : RCTViewManager
@end

@implementation CameraViewManager

RCT_EXPORT_MODULE(CameraView)

- (UIView *)view
{
  return [[CameraView alloc] init];
}

@end
