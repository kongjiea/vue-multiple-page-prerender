<template>
  <div id="app" class="register">
    <h1 class="tc">注册12312312</h1>
    <div class="form-box">
      <el-form :model="registerForm" :rules="rules" ref="ruleForm"  class="register-form">
        <el-form-item  prop="mobile" class="phone-item">
          <el-input v-model="registerForm.mobile" placeholder="请输入手机号码" :maxlength="11" ></el-input>

          <a href="javascript:;" class="get-code-btn tc disabled" v-if="showCountDown">
            {{time+'s后重新获取'}}
          </a>
          <a href="javascript:;" class="get-code-btn tc" v-else @click="getCode()">获取验证码</a>
        </el-form-item>

        <el-form-item  prop="code" class="code-item cf">
          <el-input v-model="registerForm.code" class="code-inp fl" placeholder="请输入验证码" ></el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="设置您的密码，不少于6位数"></el-input>
        </el-form-item>

        <el-form-item  prop="password_confirmation">
          <el-input v-model="registerForm.password_confirmation" type="password" placeholder="请再次输入确认密码"></el-input>
        </el-form-item>

        <el-form-item  class="agreement cf" prop="isAgreement">
          <!--<el-checkbox v-model="registerForm.isAgreement"></el-checkbox>-->
          <el-checkbox v-model="registerForm.isAgreement" name="isAgreement"></el-checkbox>
          <span @click="registerForm.isAgreement = !registerForm.isAgreement">我已阅读并同意<a href="" target="_blank" class="agreement-link">《用户注册协议》</a></span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>


    <el-dialog
      title="提示"
      :visible.sync="isShowAgreement"
      width="30%"
      :before-close="handleClose">
      <div>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
        <p>这是一段信息 <br><br><br><br><br><br><br></p>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Input,Button,Checkbox,Form,FormItem,Message,Dialog } from 'element-ui';

  var JRegexp = {
    mobile:/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/,  //验证手机号码
    pwd:/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/  //验证密码格式 大写、小写、数字、特殊字符至少2种组合,6-20位
  };
  Vue.use(Input);
  Vue.use(Checkbox);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Dialog);
  Vue.prototype.$message = Message;


  export default {
    name: 'Register',
    data(){
      return{
        time: 30,  //30秒获取验证码
        timer:null,
        showCountDown:false, //显示倒计时
        isShowAgreement:false,  //是否显示协议内容弹窗
        registerForm: {
          mobile: '',
          password: '',
          password_confirmation: '',
          client:1,  //1-》 pcweb
          code: '',
          isAgreement:''
        },
        rules: {
          mobile: [
            { required: true, trigger: 'blur',validator:(rule, value, callback)=>{
              if(value.trim() === ""){
                callback(new Error('请输入手机号码'));
              }else if (!/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(value)){
                callback(new Error('手机号码格式错误'));
              } else {
                callback();
              }
            }}
          ],
          password: [
            { required: true,trigger: 'blur',validator:(rule, value, callback)=>{
              if(value.trim() === ""){
                callback(new Error('请输入密码'));
              }else if (!/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/.test(value)){
                callback(new Error('大写、小写、数字、特殊字符至少2种组合,6-20位'));
              } else {
                callback();
              }
            }}
          ],
          password_confirmation:[
            { required: true,trigger: 'blur',validator:(rule, value, callback)=>{
              if(value.trim() === ""){
                callback(new Error('请输入确认密码'));
              }else if (value!= this.registerForm.password){
                callback(new Error('两次密码输入不一致'));
              } else {
                callback();
              }
            }}
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur',validator:(rule, value, callback)=>{
              if(value.trim() === ""){
                callback(new Error('请输入验证码'));
              }else if (value.length < 6 ){
                callback(new Error('请输入6位验证码'));
              } else {
                callback();
              }
            }
            }
          ],
          isAgreement:[
            {required: true, message: '请阅读并同意用户注册协议', trigger: 'change' }
          ]
        }
      }
    },
    created:()=>{
      /*axios.post(process.env.API_PATH+'/api/user/register',{"mobile":"15813710005","password":"123dfsdf","password_confirmation":"123dfsdf","client":1,"code":"admin1","isAgreement":true}).then(function(res){
          console.log('register success',res);
      }).catch(function(err){
          console.log('register error',err)
      });

      axios.get(process.env.API_PATH+'/api/web/nav').then(function(res){
          console.log('nav-success',res);
      }).catch(function(err){
          console.log('nav-err',err);
      })*/
    },
    components:{
    },
    methods: {
      handleClose(){

      },
      apiReg(){
        let _this = this;
        axios.post(process.env.API_PATH+'/api/user/register',this.registerForm).then(function(res){
          let datas = res.data;
          if(datas.code == 200){
            console.log(datas.data.token); //0d0c57adb75579b8560a6ffde901d73b
          }else{
            _this.$message.error(datas.msg);
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      getCode(){ //获取验证码
        let _this = this,
          mobile = this.registerForm.mobile;

        if(JRegexp.mobile.test(mobile)){
          axios.post(process.env.API_PATH+'/api/user/vercode/send',{"mobile":mobile,"type":1}).then(function(res){
            console.log('send success',res);
          }).catch(function(err){
            console.log('send error',err)
          });

          if(_this.time !== 30){
            return false;
          }

          clearInterval(_this.timer);
          this.showCountDown = true;
          _this.timer = setInterval(()=>{
            _this.time--;
            if(_this.time < 0){
              _this.showCountDown = false;
              _this.time = 30;
              clearInterval(_this.timer);
            }
          },1000)
        }
      },
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.apiReg();
          } else {
            console.log('error submit!111!');
            return false;
          }
        });
      }
    }
  }

</script>


<style lang="less" >
  .register{
    padding:140px 0 220px;
    border-top:1px solid #ddd;
    h1{
      font-size:42px;
      line-height:42px;
      margin-bottom:40px;
    }


    .form-box{
      width:520px;
      margin:0 auto;

      .el-form-item{
        width:520px;
        margin-bottom:20px;
      }

      .el-input__inner{
        border-radius: 0;
        border-color:#ddd;
        height:60px;
        padding:0 20px;

        &:focus{
          border-color:#ddd;
        }
      }

      .phone-item{
        position:relative;

        .get-code-btn{
          position:absolute;
          width:160px;
          height:100%;
          top:0;
          right:0;
          line-height:60px;
          background:#bba162;
          color:#fff;
          text-decoration: none;
          &.disabled{
            background:#eae3d0;
          }
        }
      }

      .agreement{
        margin-top:40px;
        font-size:16px;
        color:#999;
        cursor:pointer;

        .el-checkbox__inner:hover{
          //background:transparent;
          border-color:#ddd;
        }

        .el-form-item__content{
          line-height:22px;
        }

        .agreement-link{
          font-size:14px;
          color:#bba162;
        }
      }


      .login-btn{
        width:520px;height:60px;
        background:#bba162;
        border:none;
        font-size:18px;
        color:#fff;
      }

      .reg-item{
        font-size:16px;

        .reg-link{
          color:#e10000;
        }
      }
    }
  }
</style>
