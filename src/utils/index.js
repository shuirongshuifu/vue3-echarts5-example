// 判断是手机还是电脑
export function IsPhone() {
    var info = navigator.userAgent;
    var isPhone = /mobile/i.test(info);
    return isPhone;
}

// 
    
