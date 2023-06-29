<script>
export default {
    data() {
        return {
            name:null,
            phone:null,
            mail:null,
            age:null,
            ansTime:null,
            userList:null,
            questionList:null,
           optionList:{
            option:[{}],
          
           },
            
        }
    },    
    mounted() {
        const body = {
            topicNumber:4972,
            name:localStorage.getItem('userName'),
            ansTime:localStorage.getItem('ansTime')
        }
        fetch("http://localhost:8080/get_user_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.userList = data.userList    
                    this.questionList = data.questionList       
                    this.name = data.userList[0].name
                    this.phone = data.userList[0].phone
                    this.mail = data.userList[0].mail
                    this.age = data.userList[0].age
                    this.ansTime = data.userList[0].ansTime
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
                            this.optionList.option.push(data.questionList[i].options.split(';'))
                            // console.log(i +"有");
                        }else{
                            this.optionList.option.push("無作答")
                            // console.log(i +"沒");
                        }
                    }
                    console.log(this.optionList);
                   
                })
    },
    // 0:[a,b,c,d]
}
</script>

<template>
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
        <p>填寫時間  {{ ansTime }}</p>
    </div>
    <div v-for="(item,index) in questionList" :key = "index" class="questionList" >
        <p>{{ index+1 }}.{{ item.question }}</p>

    <div v-for="(op,i) in optionList" :key="i" class="radio" >
        <input type="radio" name="drink" >
    <label>{{op[index] }}</label>
     </div>        
     
    </div>
    
</template>

<style lang="scss" scoped>
    
</style>