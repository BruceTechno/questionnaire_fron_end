<script>
export default {
    data() {
        return {
            topicBodyStr: null,
            question: null,
            must: false,
            option: null,
            type: 1,
            endTime: 0,
            tempQ: [],
            tempOptions:[],
            tempType: [],
            tempMust: [],
            questionList:[],
        }
    },
    mounted() {

    },
    updated() {

    },
    methods: {
        addTopicAndQuestion() {
            // this.topicBodyStr = localStorage.getItem('body');
            // console.log(JSON.stringify(this.topicBodyStr));

            //新增問卷API
            const topicBody = {
                number: localStorage.getItem('number'),
                name: localStorage.getItem('name'),
                startY: localStorage.getItem('startY'),
                startM: localStorage.getItem('startM'),
                startD: localStorage.getItem('startD'),
                endD: localStorage.getItem('endD'),
                endM: localStorage.getItem('endM'),
                endY: localStorage.getItem('endY'),
                description: localStorage.getItem('description')
            }
            console.log(topicBody);
            fetch("http://localhost:8080/add_topic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(topicBody)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })

            //新增問題API                       
            const questionBody = {
                number: localStorage.getItem('number'),
                question: this.question,
                options: this.option,
                type: this.type,
                must: this.must,
                endTime: 20260606,

            }
            console.log(questionBody);
            fetch("http://localhost:8080/add_question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionBody)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        },// method : addTopicAndQuestion 到此
        addToUnder() {
            if (this.question == null ||  this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }
            this.tempQ.push(`${this.question}`);
            this.tempOptions.push(`${this.option}`);
            this.tempType.push(`${this.type}`);
            this.tempMust.push(`${this.must}`);
            // this.questionList.push(this.tempOptions)
            // this.questionList.push(this.tempType)
            // this.questionList.push(this.tempMust)
            //存成 物件
        //   for (let i = 0 ; i < this.tempQ.length+1 ; i++){
        //     this.questionList = {
        //         questionList:[ {
        //             question:this.tempQ[i],
        //             option:this.tempOptions[i],
        //             type:this.tempType[i],
        //             must:this.tempMust[i]
        //         } ]                
        //     }
        //   }
           localStorage.setItem('tempQ',this.tempQ)
           localStorage.setItem('tempO',this.tempOptions)
           localStorage.setItem('tempT',this.tempType)
           localStorage.setItem('tempM',this.tempMust)
                 console.log(this.tempQ);

            console.log(this.tempOptions);
            console.log(this.tempType);
            console.log(this.tempMust);
            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
          
        }
    }
}
</script>

<template>
    <div>
        <p>問題</p>
        <input type="text" v-model="question">
        <select name="" id="" v-model="type">
            <option value="1">單選</option>
            <option value="2">多選</option>
        </select>
        <input type="checkbox" id="must" value="" v-model="must">
        <span>必填</span>
        <p>選項</p>
        <input type="text" v-model="option">
        <span>(多個答案以;分隔)</span>
        <button type="button" @click="addToUnder">加入</button>
        <div class="number" v-for="(item,index) in tempQ" :key="index">
        <p>編號{{ index+1 }}</p>
        <p>問題{{ item[index] }}</p>
        </div>
        <div class="option" v-for="(item,index) in tempO" :key="index">
        <p>選項{{item[index]}}</p>
        </div>
        <div class="type" v-for="(item,index) in tempType" :key="index">
        <p>種類{{item[index]}}</p>
        </div>
        <div class="type" v-for="(item,index) in tempMust" :key="index">
        <p>必填{{item[index]}}</p>
        </div>

        <!-- <div class="list">
            <table>
                <tr>
                    <th>編號</th>
                    <th>問題</th>
                    <th>種類</th>
                    <th>必填</th>

                </tr>
                <tr v-for="(item, index) in tempQ" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getStatus(item.startTime, item.endTime) }}</td>
                    <td>{{ item.startTime }}</td>
                    <td>{{ item.endTime }}</td>
                    <td>觀看 </td>
                    <td>
                        <button type="button">刪除</button>
                        <button type="button" @click="goEdit(item.number)">編輯</button>
                    </td>

                </tr>
            </table>

        </div> -->

    </div>
    <button type="button">取消</button>
    <button type="button" @click="addTopicAndQuestion">送出</button>
</template>

<style lang="scss" scoped>
.list {
    margin: 80px;
    border-radius: 10px;
    border: 1px solid black;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: center;
    padding: 8px;
}

button {
    border: none;
    background-color: #403234;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 0 15px;
    border-radius: 10px;
    transition: 0.7s;
    cursor: pointer;
    margin: 0 20px;

    &:hover {
        background-color: #d0cfd0;
    }

    &:active {
        scale: 1.05;
    }
}
</style>