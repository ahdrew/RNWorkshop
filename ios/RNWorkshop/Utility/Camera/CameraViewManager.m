// CameraViewManager.m
#import "CameraViewManager.h"
#import "ViewController.h"
#import "AppDelegate.h"

@implementation CameraViewManager

RCT_EXPORT_MODULE(CameraViewManager)

RCT_EXPORT_METHOD(showCameraView)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    self.viewController = [[ViewController alloc] init];
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:self.viewController animated:YES completion:nil];
  });
}
@end
