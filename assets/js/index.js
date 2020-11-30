$(function(){
    getUserinfor()
    $('#btnLogout').on('click',function(){
        layui.layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            window.location='/login.html'
            layer.close(index);
          });
    })
})

function getUserinfor(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0) return alert(res.message)
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    $('#welcome').html('欢迎&nbsp;&nbsp;'+user.username)
    if(user.user_pic){
        $('.layui-nav-img').attr('src','user.user_pic');
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide();
        var first=user.username[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}