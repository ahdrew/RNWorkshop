//
//  ViewController.m
//  PrumobileRN
//
//  Created by Andrew Fong on 7/1/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WebViewController.h"
#import <WebKit/WebKit.h>

@interface WebViewController ()

@end

@implementation WebViewController {
  WKWebView* webview;
}


- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
//  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 64.0, 320.0, 24.0)];
//  label.textColor = [UIColor blackColor];
//  label.text = @"My text";
//  [self.view addSubview:label];
    // Do any additional setup after loading the view.
  WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
  config.websiteDataStore = [WKWebsiteDataStore defaultDataStore];
  config.processPool = [[WKProcessPool alloc] init];
  WKPreferences *preferences = [WKPreferences new];
  preferences.javaScriptCanOpenWindowsAutomatically = YES;


  webview = [[WKWebView alloc] initWithFrame:[[UIScreen mainScreen] bounds] configuration:config];
  webview.UIDelegate = self;
  webview.navigationDelegate = self;
  [self.view addSubview:webview];
  [webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"https://www.google.com"]]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Finish"
                                                                                      message:@"Load finished"
                                                                                     delegate:self
                                                                            cancelButtonTitle:@"OK"
                                                                            otherButtonTitles:nil, nil];
                                  [alertView show];
}

-(void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
  [self dismissViewControllerAnimated:YES completion:nil];
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
