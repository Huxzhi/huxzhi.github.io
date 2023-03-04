import{_ as t,X as s,Y as _,Z as e}from"./framework-c2b0d87a.js";const n={},o=e("p",null,"计时器一直是 javascript 动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅;另一方面,循环间隔还要足够长,这样才能确保浏览器有能力渲染产生的变化",-1),a=e("p",null,"大多数电脑显示器的刷新频率是 60Hz，大概相当于每秒钟重绘 60 次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘 频率,因为即使超过那个频率用户体验也不会有提升。因此,最平滑动画的最佳循环问隔是 1000ms/60,约等于 16.6ms",-1),c=e("p",null,"而 setTimeout 和 setInterval 的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器 UI 线程队列中以等待执行的时间。如果队列前面已经加入了其他任务,那动画代码就要等前面的任务完成后再执行",-1),r=e("p",null,"requestAnimationFrame 采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系統性能，改善视觉效",-1),i=[o,a,c,r];function l(m,u){return s(),_("div",null,i)}const d=t(n,[["render",l],["__file","javascript动画-计时器-requestAnimationFrame.html.vue"]]);export{d as default};
