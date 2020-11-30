$(function(){
    // 面向切面编程思想，在发起ajax请求之前先预处理参数中的属性值
    $.ajaxPrefilter(function(options){
        // if(/^my/.test(options.url)){
        //     options.headers={Authorization:localStorage.getItem('token')}
        // }
        // if(options.url.startswith('/my/'))
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
              Authorization: localStorage.getItem('token') || ''
            }
          }
        options.url='http://ajax.frontend.itheima.net'+options.url;
        options.complete=function(res){
          console.log(res);
          if(res.responseJSON.status===1&&res.responseJSON.message==='获取用户信息失败'){
            localStorage.removeItem('token');
            
          }
        }
    })
})