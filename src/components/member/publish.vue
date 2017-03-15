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
</style>
<script>
    import inputTag from 'vue-input-tag'
    export default{
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
                showVPic:false
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
