---
date: 2023-05-08 09:06
updated: 2023-05-13 22:56
---
# 照片信息EXIF

EXIF（Exchangeable Image File）是“可交换图像文件”的缩写，当中包含了专门为数码相机的照片而定制的元数据，可以记录数码照片的拍摄参数、缩略图及其他属性信息，简单来说，Exif 信息是镶嵌在 JPEG/TIFF 图像文件格式内的一组拍摄参数，需要注意的是 EXIF 信息是不支持 png,webp 等图片格式的。（建议自己试的时候，现拍一张，把地理位置信息开启，这样得到的是完整的 EXIF 信息）

简单来说就是当你拍照片的时候会存储你的一些信息，例如拍摄的位置，拍摄的时间，相机参数等，这些信息的泄露也会给我们造成麻烦。

场景 我们经常在一些聊天软件传输一些照片，例如 WX 你默认传输的时候他是会被压缩体积很小，应为破坏了 EXIF 信息，当你设置了原图传输他将保留你照片的 EXIF 信息别人只要查看就可以读取你照片的信息。

## 去第三方解析 EXIF

别人下载了之后，可以通过照片的详细信息看到 EXIF 版本
基本能获取到很多信息例如

Device Manufacturer（设备制造厂商）-> Apple 苹果

当然我们的 web js 也是可以读取这些信息的

## EXIF-js

我们需要一个库的支持 EXIF-js

```html
<script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
```

用法很简单

```html
<div>
      <img width="300" height="300" id="img1" src="./noOrigin.jpg" alt="">
      <p>非原图</p>
  </div>
  <div>
      <img width="300" height="300" id="img2" src="./origin.jpg" alt="">
      <p>原图</p>
  </div>
  <div>
      <img width="300" height="300" id="img3" src="./2019_03_26_201720.jpg" alt="">
      <p>原图2</p>
  </div>
```

EXIF.getData(img, callback)获取图像的数据

EXIF.getTag(img, tag)获取图像的某个数据

EXIF.getAllTags(img)获取图像的全部数据，值以对象的方式返回

EXIF.pretty(img)获取图像的全部数据，值以字符串的方式返回

```js
const file = document.querySelector('#img3')
EXIF.getData(file, function () {
    const data = EXIF.pretty(this);
    console.log(data);
})
```

### 部分参数说明

GPS 相关名称说明

GPSVersionIDGPS 版本

GPSLatitudeRef 南北纬

GPSLatitude 纬度

GPSLongitudeRef 东西经

GPSLongitude 经度

GPSAltitudeRef 海拔参照值

GPSAltitude 海拔

GPSTimeStamp GPS 时间戳

GPSSatellites 测量的卫星

GPSStatus 接收器状态

GPSMeasureMode 测量模式

GPSDOP 测量精度

GPSSpeedRef 速度单位

GPSSpeed GPS 接收器速度

GPSTrackRef 移动方位参照

GPSTrack 移动方位

GPSImgDirectionRef 图像方位参照

GPSImgDirection 图像方位

GPSMapDatum 地理测量资料

GPSDestLatitudeRef 目标纬度参照

GPSDestLatitude 目标纬度 GPSDestLongitudeRef 目标经度参照

GPSDestLongitude 目标经度

GPSDestBearingRef 目标方位参照

GPSDestBearing 目标方位

GPSDestDistanceRef 目标距离参照

GPSDestDistance 目标距离

GPSProcessingMethod

GPS 处理方法名

GPSAreaInformation GPS 区功能变数名

GPSDateStampGPS 日期

GPSDifferential GPS 修正
