$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var flag=1;
    $('label').on('click','#eye',function(){
        if(flag){
            flag=0;
            this.src='/assets/images/open.png';
            $(this).parent().siblings('input').prop('type','text')
            // $(this).prop('src',"/assets/images/open.png").siblings('input').prop('type','text')
        }else{
            flag=1;
            this.src='/assets/images/close.png';
            $(this).parent().siblings('input').prop('type','password')
            // flag=0;
            // $(this).prop('src',"/assets/images/close.png").siblings('input').prop('type','password')
        }
    })
    // 这个是动态的，要去内置模块区域去找，而且要引入layui的js插件。获取layui中的form再调用verify方法，参数为对象。然后这个验证也是点击提交后再发起的
    layui.form.verify({
        pass:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        repass:function(value){
            console.log(value);
            if($('.reg-box [name=password]').val()!==value){
                return '两次密码不一致'
                // 这里这么写是根据layui的例子来的
            }
        }
    })
    $('#reg_form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res){
                console.log(res);
             if(res.status!==0) return layui.layer.msg(res.message)
             $('#link_login').click()
            }
        })
    })
    $('#login_form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
             if(res.status!==0) return layui.layer.msg(res.message)
             localStorage.setItem('token',res.token)
             console.log(res.token);
            }
        })
    })
})
