
let gbut1 = document.querySelector('.but1');
let gbut2 = document.querySelector('.but2');
let imglist = document.getElementById('imglist');
let banner = document.getElementById('banner');

let itemWidth;          // 每张图片的宽度
let currentIndex = 0;
let timer;              // 自动轮播定时器
const totalItems = 4;

// 初始化：计算宽度，设置列表总宽度，显示第一张
function init() {
    itemWidth = banner.offsetWidth;
    imglist.style.width = totalItems * itemWidth + 'px';
    // 确保每个子项宽度等于itemWidth
    Array.from(imglist.children).forEach(item => {
        item.style.width = itemWidth + 'px';
    });
    // 定位到当前
    imglist.style.marginLeft = -currentIndex * itemWidth + 'px';
}

// 切换到指定索引（n: 0~3）
function goToIndex(n) {
    // 边界处理：如果超出0~3，调整到对应位置（利用克隆项实现无缝）
    if (n < 0) {
        n = totalItems - 2;   // 从第一张左翻应跳到倒数第二张（真正的最后一张）
    } else if (n >= totalItems) {
        n = 1;                // 从最后一张右翻应跳到第二张
    }
    currentIndex = n;
    imglist.style.marginLeft = -currentIndex * itemWidth + 'px';
}

// 自动轮播
function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(() => {
        goToIndex(currentIndex + 1);
    }, 1200);
}

// 停止自动轮播
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

// 上一张
gbut1.onclick = function() {
    stopAutoPlay();
    goToIndex(currentIndex - 1);
    startAutoPlay();      // 重启自动轮播
};

// 下一张
gbut2.onclick = function() {
    stopAutoPlay();
    goToIndex(currentIndex + 1);
    startAutoPlay();
};

// 鼠标悬停暂停，离开恢复
banner.addEventListener('mouseenter', stopAutoPlay);
banner.addEventListener('mouseleave', startAutoPlay);

// 窗口大小改变时重新计算
window.addEventListener('resize', () => {
    init();
    // 保持当前显示的图片位置正确
    imglist.style.marginLeft = -currentIndex * itemWidth + 'px';
});

// 页面加载启动
init();
startAutoPlay();
