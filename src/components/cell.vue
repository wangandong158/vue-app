<!--
type=='select' 滚轮选择，包含级联
type=='date' 时间选择
type=='text' 文本输入框，可以传入readonly，有三种布局传入classType=1，2，3
-->
<template>
  <div>
    <van-field v-if="type=='select'" :required='required' :rules="[{ 'required': required}]" :label="title" readonly v-model="selectText" center :placeholder="placeholder" input-align="right" :class="{class1:classType=='1',class2:classType=='2',class3:classType=='3'}" @click="select"/>
    <van-field v-else-if="type=='date'" :required='required' :rules="[{ 'required': required}]" :label="title" readonly :value="value" center :placeholder="placeholder" input-align="right" :class="{class1:classType=='1',class2:classType=='2',class3:classType=='3'}" @click="showCalendar = true"/>
    <van-field v-else :label="title" :required='required' :rules="[{ 'required': required}]" :type='type' :readonly='readonly' rows="1" autosize type="textarea" :value="value" center :placeholder="placeholder" input-align="right" @input='change' :class="{class1:classType=='1',class2:classType=='2',class3:classType=='3'}">
      <template #button v-if="unit!=''">
        <span>{{unit}}</span>
      </template>
    </van-field>
    <van-divider v-if="showDivider" style="color: '#ebedf0'"/>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker ref="vanPicker" title="请选择" show-toolbar :value-key='selectValueKey' :columns="columns" :default-index="defaultIndex" @confirm="onConfirm" @cancel="onCancel"/>
    </van-popup>
    <van-calendar v-model="showCalendar" @confirm="onConfirmDate" :min-date="minDate" :max-date="maxDate" :default-date="getDefaultDate" />
  </div>
</template>

<script>
  import dayjs from "dayjs";
  export default {
    name: 'cell',
    props: {
      type:{
        type: String,
        default:'text'
      },
      readonly:{
        type:Boolean,
        default:false,
      },
      classType: {
        type: String,
        default: '1'
      },
      title: {
        type: String,
        default:'' 
      },
      value: {
        type: String|Number|Array,
        default:'' 
      },
      placeholder:{
        type: String,
        default:'' 
      },
      columns:{
        type:Array,
        default:()=>{
          return []
        }
      },
      showDivider:{
        type:Boolean,
        default:true,
      },
      selectValueKey:{
        type: String,
        default:'text' 
      },
      selectKey:{
        type: String,
        default:'text' 
      },
      unit:{
        type: String,
        default:""
      },
      number:{
        type:Boolean,
        default:false,
      },
      required:{
        type:Boolean,
        default:false,
      },
      defaultSelectText:{
        type: String,
        default:undefined
      },
      isCascade:{
        type: Boolean,
        default:false
      },
      minValue: {
        type:String|Number,
        default:"",
      },
      maxValue: {
        type:String|Number,
        default:"",
      },
    },
    created () {
      this.dealDefaultSelect(true);
    },
    watch: {
      selectBindData(newValue, oldValue) {
        this.dealDefaultSelect(newValue)
      },
      value(newValue, oldValue) {
        if(newValue!==0&&newValue===''){
          this.selectText = ''
        }
      }
    },
    computed: {
      selectBindData() {
        return this.columns&&this.columns.length>0&&this.checkValue()
      },
      getDefaultDate() {
        return this.value?dayjs(this.value,'YYYY-MM-DD').$d:dayjs().$d
      }
    },
    data() {
      return {
        showPicker: false,
        selectText: '',
        isInitSelect: true,// 手动选择数据不触发watch
        defaultIndex: undefined,
        showCalendar:false,
        minDate:dayjs().subtract(1, 'year').$d,
        maxDate:dayjs().add(5, 'year').$d,
      }
    },
    methods: {
      change(value) {
        if(this.number){
          let inputNumber = value.replace(/[^0-9.]/g,'')
          if(this.maxValue!=""&&inputNumber>parseInt(this.maxValue)){
            inputNumber = parseInt(this.maxValue)
          }else if(this.minValue!=""&&inputNumber<parseInt(this.minValue)){
            inputNumber = parseInt(this.minValue)
          }
          this.$emit('input', inputNumber)
        }else{
          this.$emit('input', value)
        }
      },
      select(){
        this.isInitSelect = false
        this.showPicker=true
      },
      onConfirmDate(date){
        this.showCalendar = false
        this.$emit('input',`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      },
      onConfirm(value, index ,isInit=false) {
        if(!this.isCascade){
          this.selectText=this.columns[index][this.selectValueKey]
          this.$emit('input', value[this.selectKey])
          this.$emit('onConfirm', value,index,isInit)
        }else if(isInit){// 级联初始化
          this.$emit('onConfirm', value,index,isInit)
        }else if(value){// 级联不是初始化
          this.selectText = value.join('/')
          let tempObj = this.columns
          let tempIndex = []
          for (let i = 0; i < index.length; i++) {
            let element = index[i];
            tempObj=i==0?tempObj[element]:tempObj.children[element]
            console.log(tempObj)
            tempIndex.push(tempObj[this.selectKey])
          }
          // console.log('----',tempIndex)
          this.$emit('onConfirm', value,tempIndex,isInit)
        }
        this.showPicker = false;
      },
      onCancel(){
        this.showPicker = false;
      },
      checkValue(){
        if(this.value===0||this.value!==''){
          return true
        }else{
          return false
        }
      },
      dealDefaultSelect(newValue){
        // 第一次，初始化使用
        // console.log(this.title,this.value,this.isInitSelect,newValue)
        if(this.isInitSelect&&newValue){
          let length = this.columns.length
          for (let index = 0; index < length; index++) {
            var element = this.columns[index];
            if(element[this.selectKey]==this.value){
              this.onConfirm(element,index,true)
              this.defaultIndex = index
            }
          }
        }
        if(this.isCascade&&this.value){
          for (let index = 0; index < this.value.length; index++) {
            let element = this.value[index]
            let current = this.util.deepQuery(element,this.selectKey,this.columns)
            //最后一个不拼接 /
            this.selectText=this.selectText+current[this.selectValueKey]+(index!=(this.value.length-1)?'/':'')
          }
          this.onConfirm([],this.value,true)
        }else if(this.selectText==''&&this.value!=''){
          this.selectText=this.value
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.class1 /deep/ .van-cell__title{
  flex: 1;
}
.class1 /deep/ .van-cell__value{
  flex: 1;
}
.class2 /deep/ .van-cell__title{
  flex: 1;
}
.class2 /deep/ .van-cell__value{
  flex: 3;
}
.class3 /deep/ .van-cell__title{
  flex: 3;
}
.class3 /deep/ .van-cell__value{
  flex: 1;
}
/deep/ .van-divider{
  margin: 0;
  padding: 0 15px;
}
/deep/ .van-cell::after{
  border-bottom: 0;
}
/deep/ .van-cell__title{
  color:#9A9A9A;
  font-size:15px;
}
/deep/ .van-cell__value{
  color:#343434;
  font-size:15px;
}
/deep/ .van-field__label{
  color:#9A9A9A;
  font-size:15px;
}
/deep/ .van-field__control{
  color:#343434;
  font-size:15px;
}
</style>