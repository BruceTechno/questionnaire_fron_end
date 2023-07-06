<script>
import { number } from 'echarts';
import FuctionSelect from "../components/FunctionSelect.vue"

export default {
    components: {
        FuctionSelect
    },
    data() {
        return {
            name: null,
            phone: null,
            mail: null,
            age: null,
            ansTime: null,
            userList: null,
            questionList: null,

            option: [],
            answer: [],
            sliceMultipulAnswer:[],

        }
    },
    mounted() {
        let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.number = parseInt(str);
            let topicNumber = this.number
            
        const body = {
            topicNumber: topicNumber,
            name: localStorage.getItem('userName'),
            ansTime: localStorage.getItem('ansTime')
        }
        console.log(body);
        fetch("http://localhost:8080/get_user_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log("下面是log data");
                console.log(data);
                this.userList = data.userList
                this.questionList = data.questionList
                this.name = data.userList[0].name
                this.phone = data.userList[0].phone
                this.mail = data.userList[0].mail
                this.age = data.userList[0].age
                this.ansTime = data.userList[0].ansTime
                console.log("下面是log questionlist");

                console.log(this.questionList);

                // 狀況 => 有些選項可以是空的 切不了
                // data.questionList.forEach(item => { 
                //     console.log(item.options.split(';')); 
                //     if (item.options.includes(";")) {
                //         this.optionList.push(item.options.split(';'))
                //     }else{
                //         this.optionList.push("無作答")
                //     }
                //     console.log(this.optionList);
                // });
                for (let i = 0; i < data.questionList.length; i++) {
                    if (data.questionList[i].options.includes(";")) {
                        this.option.push(data.questionList[i].options.split(';'))
                        // console.log(i +"有");
                    } else {
                        this.option.push("無作答")
                        // console.log(i +"沒");
                    }
                }
                for (let i = 0; i < data.userList.length; i++) {
                    this.answer.push(data.userList[i].answer)
                }
                for (let i = 0; i < this.answer.length; i++) {
                    if (this.answer[i].includes(";")) {
                        
                        this.sliceMultipulAnswer.push( this.answer[i].split(';'))
                        this.answer[i] = ""
                    }
                  
                }
                for (let j = 0; j < this.sliceMultipulAnswer.length; j++) {
                    for (let i = 0; i < this.sliceMultipulAnswer[j].length; i++) {
                        this.answer.push(this.sliceMultipulAnswer[j][i])
                    }
                }
                console.log(this.sliceMultipulAnswer);

              
                console.log("option below");
                console.log(this.option);
                console.log("answer below");
                console.log(this.answer);
            })
            
    },
    methods: {
        goFeedBack() {
            this.$router.push(`/StatisticsView/?${this.number}`)
        }
    },
    // 0:[a,b,c,d]
}
</script>

<template>
    <div class="wrapper">
            <FuctionSelect :number="number" :isUser="0" />

    <div>
        <h1>feed back detail</h1>
        <span>姓名</span>
        <input type="text" disabled="disabled" v-model="name">
        <span>手機</span>
        <input type="text" disabled="disabled" v-model="phone">
        <br>
        <span>Email</span>
        <input type="text" disabled="disabled" v-model="mail">
        <span>年齡</span>
        <input type="text" disabled="disabled" v-model="age">
        <p>填寫時間 {{ ansTime }}</p>
    </div>
            <!-- 問題 -->
    <div v-for="(item, index) in questionList" :key="index" class="questionList">
        <p v-if="item.must == false">{{ index + 1 }}.{{ item.question }}</p>
        <p v-else>{{ index + 1 }}.{{ item.question }}(必填)</p>
        <!-- 選項-- 單選 -->
        <div v-for="(op, i) in option[index]" :key="i" class="radio">
            <div class="single" v-if="item.type == 1" disabled="true">
                <!-- 選答案 v-if -->
                <input v-if="answer.includes(op)" type="radio" checked disabled="true">
                <input v-else type="radio" disabled="true">
                <label>{{ op }}</label>  
            </div>
            <!-- 選項--多選 -->
            <div class="multiple" v-else>
                <!-- 選答案 v-if -->
                <input v-if="answer.includes(op)" type="checkbox" disabled="true" checked>
                <input v-else type="checkbox" disabled="true">
                <label>{{ op }}</label>
            </div>
        </div>             

    </div>
</div>
    <button type="button" @click="goFeedBack()">觀看統計圖</button>
</template>

<style lang="scss" scoped>
.wrapper{
    
    
}
</style>