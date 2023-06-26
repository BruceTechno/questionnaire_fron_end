<script>
export default {
    data() {
        return {
            topicBodyStr: null,
            //input bar v-model以下
            question: null,
            must: false,
            option: null,
            type: 1,
            endTime: 0,
            //input bar v-model以上
            tempQ: [],
            tempOptions: [],
            tempType: [],
            tempMust: [],
            result: {
                questionList: []
            },
            test: {
                message: null,
                questionList: []
            },
            //問題的編輯按下去 上面的加入會變 編輯
            joinOrEdit: true,
            // 為了要知道 是要對哪一個問題的編號做編輯
            numberForEdit: 0
        }
    },
    mounted() {

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
            if (this.question == null || this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }//a b
            this.tempQ.push(`${this.question}`);
            this.tempOptions.push(`${this.option}`);
            this.tempType.push(`${this.type}`);
            this.tempMust.push(`${this.must}`);

            for (let i = 0; i < this.tempQ.length + 1; i++) {
                this.test.questionList.push({
                    name: this.tempQ[i],
                    options: this.tempOptions[i],
                    type: this.tempType[i],
                    must: this.tempMust[i]
                })
                delete this.tempQ[i]
                delete this.tempOptions[i]
                delete this.tempType[i]
                delete this.tempMust[i]
            }

            this.test.questionList = this.test.questionList.filter((item, index, self) => {
                return (item.name !== undefined && item.options !== undefined && item.type !== undefined && item.must !== undefined)
            })
            console.log(this.tempQ);
            console.log("here");
            console.log(this.test.questionList);
            localStorage.setItem('questionList', JSON.stringify(this.test.questionList));

            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must = false
        },
        deleteQuetion(name) {
            this.test.questionList = this.test.questionList.filter(item => {
                return item.name !== name
            })
        },
        goEdit(name, option, type, must, index) {
            this.question = name;
            this.option = option;
            this.type = type;
            this.must = must;
            this.joinOrEdit = false;
            this.numberForEdit = index
        },

        editToUnder() {
            console.log(this.numberForEdit);
            if (this.question == null || this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }//a b
            // this.tempQ.push(`${this.question}`);
            // this.tempOptions.push(`${this.option}`);
            // this.tempType.push(`${this.type}`);
            // this.tempMust.push(`${this.must}`);

            //     this.test.questionList.push({
            //     name: this.tempQ[this.numberForEdit],
            //     options: this.tempOptions[this.numberForEdit],
            //     type: this.tempType[this.numberForEdit],
            //     must: this.tempMust[this.numberForEdit]
            // })

            this.test.questionList = JSON.parse(localStorage.getItem("questionList"))
            console.log(this.test.questionList);
            //直接複寫 即為更新
            this.test.questionList[this.numberForEdit]={
                name: this.question,
                options: this.option,
                type: this.type,
                must: this.must
            }
            localStorage.setItem('questionList', JSON.stringify(this.test.questionList));
            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must = false
            this.joinOrEdit = true;
        }

    }
};
</script>

<template>
    <div>
        <h1>新增問題頁面</h1>
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
        <button v-if="joinOrEdit == true" type="button" @click="addToUnder">加入</button>
        <button v-else type="button" @click="editToUnder">編輯</button>


        <div class="list">
            <table>
                <tr>
                    <th>編號</th>
                    <th>問題</th>
                    <th>種類</th>
                    <th>必填</th>

                </tr>
                <tr v-for="(item, index) in test.questionList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.must }}</td>
                    <td>
                        <button type="button" @click="deleteQuetion(item.name)">刪除</button>
                        <button type="button" @click="goEdit(item.name, item.options, item.type, item.must, index)">編輯</button>
                    </td>

                </tr>
            </table>

        </div>

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