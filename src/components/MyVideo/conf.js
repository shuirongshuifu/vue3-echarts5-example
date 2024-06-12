export const conf = {
    /**
     * 基础功能配置
     * */
    id: 'xgPlayerWrap', // 占位dom元素
    width: 600, height: 400, // 视频宽高尺寸
    url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4', // 视频源
    poster: "http://ashuai.work/static/img/avantar.png", // 视频封面
    autoplay: false, // 是否自动播放，不自动播放，浏览器有限制规则
    autoplayMuted: false, // 是否自动播放（静音播放）
    videoInit: true, // 是否默认初始化video，默认初始化，默认true
    playsinline: true, // 是否启用内联播放模式，仅移动端生效
    defaultPlaybackRate: 1, // 默认播放速度（可选：0.5/0.75/1/1.5/2等）
    volume: 0.72, // 播放音量（可选：0 ~ 1）
    loop: false, // 是否循环播放，默认不循环播放
    startTime: 0, // 点播模式下，初始起播时间
    videoAttributes: {}, // video扩展属性，暂且不配置
    lang: 'zh-cn', // 播放器初始显示语言，设置为中文
    fluid: true, // 是否流式布局（宽高优先于流失布局，默认16:9）注掉上方宽高看效果
    fitVideoSize: 'fixed', // 保持容器宽/高，不做适配，按照容器来
    videoFillMode: 'auto', // 宽高不够自动底色填充（fill拉伸填充等...）
    seekedStatus: 'play', // 跳转后继续播放
    // 播放器进度条故事点信息数组
    progressDot: [
        {
            id: 0,         // 唯一标识，用于删除的时候索引
            time: 30,      // 展示的时间点，例子为在播放到10s钟的时候展示
            text: '进度条信息提示...',  // hover的时候展示文案，可以为空
            duration: 5,   // 展示时间跨度，单位为s
            style: {       // 指定样式
                backgroundColor: 'pink'
            }
        },
    ],
    thumbnail: null, // 进度条预览图配置，普通业务用不到
    marginControls: false, // 是否开启画面和控制栏分离模式，不开启空间多一些
    domEventType: 'default', // 响应的事件类型，不用指定，用默认的即可
    /**
     * 交互功能配置（一般使用默认即可）
     * */
    /**
     * 插件配置，根据需求自选
     * */
    icons: {}, // 使用默认的icon图标
    i18n: [], // 使用默认的中文
    // 自定义一些颜色
    commonStyle: {
        progressColor: 'green', // 整个进度条颜色
        playedColor: 'chocolate', // 已播放的进度条颜色
        volumeColor: 'pink', // 音量大小竖向滑块颜色
    },
    controls: true, // 是否使用底部控制栏，默认使用
    miniprogress: true, // 是否使用mini进度条（当底部控制栏隐藏时生效）
    screenShot: false, // 关闭截图功能
    rotate: true, // 是否使用视频旋转插件，默认不使用
    download: true, // 是否使用下载按钮，一般不用，一般自定义控制
    pip: true, // 使用使用画中画模式，默认不用
    mini: true, // 是否使用小屏幕控件
    cssFullscreen: true, // 是否使用网页样式全屏按钮开关
    playbackRate: [0.5, 1, 1.5, 2, 3], //传入倍速可选数组
    playbackRate: true, //false，禁用倍速播放（即控制栏不显示）
    keyShortcut: false, // 是否开启快捷键模式
}