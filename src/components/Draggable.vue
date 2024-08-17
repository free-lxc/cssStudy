<template>
        <div class="itxst">
            <div class="group">
                <draggable v-model="arr1" :group="{name: 'lx', age: 18}" :sort="flase" 
                filter=".no-select" 
               >
                    <template #item="{ element }">
                        <div class="item move">
                            <label class="move">{{ element.name }}</label>
                            <span v-html="element.name == 'A组' ? 'www.itxst.com' : '内容....'"></span>
                        </div>
                    </template>
                </draggable>
            </div>
            <div class="group">
                <draggable v-model="arr2"  animation="300" :group="{name: 'lx'}" :move="handleMoveAtoB">
                    <template #item="{ element }">
                        <div class="item move">
                            <label class="move">{{ element.name }}</label>
                            <span>内容....</span>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
</template>
<script setup>
import { ref, reactive } from "vue";
/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
const arr1 = ref([
    { id: 1, name: 'www.itxst.com' },
    { id: 2, name: 'www.jd.com' },
    { id: 3, name: 'www.baidu.com' },
    { id: 4, name: 'www.taobao.com' }
])
const arr2 = ref([
    { id: 1, name: 'www.google.com' },
    { id: 2, name: 'www.msn.com' },
    { id: 3, name: 'www.ebay.com' },
    { id: 4, name: 'www.yahoo.com' }
])

const onSortA = () => {
    
}
const handleMoveAtoB = (evt) => {
    console.log(evt, evt.to)
      if (evt.to === arr1.value) {
        return true;  // 允许拖拽
      } else {
        return false; // 禁止拖拽
      }
}
</script>
<style scoped>
body {
            padding: 0px;
            margin: 0px;
            background-color: #f1f1f1;
        }

        .msg {
            padding: 10px 20px 0px 20px;
        }

        .itxst {
            background-color: #f1f1f1;
            display: flex;
            padding: 20px;
        }

        .group {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-content: center;
            width: 48%;
            margin-right: 20px;
        }

        .item {
            border: solid 1px #ddd;
            padding: 0px;
            text-align: left;
            background-color: #fff;
            margin-bottom: 10px;
            display: flex;
            height: 36px;
            user-select: none;
        }

        .item>label {
            padding: 6px 10px;
            color: #333;
        }

        .item>label:hover {
            cursor: move;
        }

        .item>span {
            padding: 6px 10px;
            color: #666;
        }

        .ghost {
            border: solid 1px rgb(19, 41, 239) !important;
        }

        .chosenClass {
            opacity: 1;
            border: solid 1px red;
        }

        .fallbackClass {
            background-color: aquamarine;
        }
</style>