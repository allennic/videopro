<template>
    <div>

        <el-dialog title="图片预览" v-model="showVPic" size="small">
            <span>
                <img :src="video.v_pic.url"/>
            </span>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="showVPic = false">关 闭</el-button>
            </span>
        </el-dialog>
        <el-row>
            <el-col :span="12">
                <h3>视频基本信息</h3>
                <el-form :model="video"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="视频标题" prop="v_title">
                        <el-input v-model="video.v_title" placeholder="填写视频标题"></el-input>
                    </el-form-item>

                    <el-form-item label="分类" prop="v_class">
                        <el-select v-model="video.v_class" placeholder="请选择">
                            <el-option
                                    v-for="item in this.$store.getters.navForVideoClass"
                                    :label="item.nav_text"
                                    :value="item.nav_id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="封面" prop="v_class">
                        <el-upload
                                action="http://localhost:9090/video/uploadpic"
                                drag
                                :thumbnail-mode="true"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess"
                                :multiple="false"
                                name="Uploader[file]"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="标签" prop="v_class">
                        <input-tag   :tags="video.v_tags" placeholder="输入标签按回车"></input-tag>
                    </el-form-item>

                    <el-form-item label="上传视频" >
                        <div id="videoContainer">
                            <el-button id="selectVideo" type="primary">选择视频<i class="el-icon-upload el-icon--right"></i></el-button>
                        </div>
                        <div class="vidoe-progress" v-if="showProgress">
                            <el-progress :text-inside="true" :stroke-width="14" :percentage="vidoeProgressValue"></el-progress>
                        </div>
                    </el-form-item>

                    <el-form-item label="测试按钮" >
                        <button @click="testBtn" >测试按钮</button>
                    </el-form-item>

                </el-form>
            </el-col>

            <el-col :span="12">
            </el-col>
        </el-row>
    </div>
</template>
<style>
    h3{color:#5e6d82;margin-bottom: 10px}
    .vidoe-progress{margin-top: 5px}
</style>
<script>
    import inputTag from 'vue-input-tag'
    export default{
        mounted(){
            var myVue=this;
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'selectVideo',         // 上传选择的点选按钮，必需
                // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
                // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
                // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
                // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
                uptoken_url: 'http://localhost:9090/video/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
                //    // do something
                //    return uptoken;
                // },
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                // downtoken_url: '/downtoken',
                // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
                // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                domain: 'videopro',     // bucket域名，下载资源时用到，必需
                container: 'videoContainer',             // 上传区域DOM ID，默认是browser_button的父元素
                max_file_size: '500mb',             // 最大文件体积限制
                flash_swf_url: '../plupload/Moxie.swf',  //引入flash，相对路径
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: 'videoContainer',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                //x_vars : {
                //    查看自定义变量
                //    'time' : function(up,file) {
                //        var time = (new Date()).getTime();
                // do something with 'time'
                //        return time;
                //    },
                //    'size' : function(up,file) {
                //        var size = file.size;
                // do something with 'size'
                //        return size;
                //    }
                //},
                filters: {
                    mime_types : [ //只允许上传图片和zip文件
                        { title : "图片文件", extensions : "jpg,gif,png" },
                    ],
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前，处理相关的事情
                        myVue.showProgress=true;
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时，处理相关的事情
                        myVue.vidoeProgressValue=file.percent;
                    },
                    'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后，处理相关的事情
                        // 其中info是文件上传成功后，服务端返回的json，形式如：
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 查看简单反馈
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后，处理相关的事情
                        myVue.showProgress=false;
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在unique_names: false，save_key: false时才生效

                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            });
        },
        data(){
            return{
                video:{
                    v_title:"",
                    v_class:2,
                    v_pic:{
                        name:"",
                        url:"",
                        id:0
                    },
                    v_tags:[] //视频标签
                },
                showVPic:false,
                vidoeProgressValue:0,
                showProgress:false
            }
        },
        methods:{
            handleSuccess(file)
            {
                //响应成功
                if(file.status==1)
                {
                    this.video.v_pic.url=file.url;
                    this.video.v_pic.name=file.name;
                    this.video.v_pic.id=file.id;
                }
                else
                {
                    alert("上传失败，请稍后再试");
                }

            },
            handlePreview(file)
            {
                //预览
                this.showVPic=true;
            },
            handleRemove(file)
            {
                //移除图片
                this.video.v_pic.url="";
                this.video.v_pic.name="";
            },
            testBtn()//测试专用按钮
            {
                alert(this.video.v_tags)
            }

        },
        components:{
            "input-tag":inputTag

        }
    }
</script>
