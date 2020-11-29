$(function(){
    // 面向切面编程思想，在发起ajax请求之前先预处理参数中的属性值
    $.ajaxPrefilter(function(options){
        options.url='http://ajax.frontend.itheima.net'+options.url
    })
})