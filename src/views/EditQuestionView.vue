<script>
import FuctionSelect from "../components/FunctionSelect.vue"

export default {
    components: {
        FuctionSelect
    },
    data() {
        return {
            number: 0,
            questionList: null,

            topicNumber: 0,
            topicBodyStr: null,
            //input bar v-model以下
            questio: null,
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
            numberForEdit: 0,
            questionListForEdit:[]
        }
    },
    mounted() {
        let url = window.location.search;
        let str = url.substring(url.indexOf("?") + 1);
        this.number = parseInt(str);
        let topicNumber = this.number

        const body = {
            number: topicNumber
        }
        console.log(body);
        fetch("http://localhost:8080/get_question_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.questionList = data.questionList
                localStorage.setItem('questionList', JSON.stringify(this.questionList));
                this.questionListForEdit = data.questionList

            })
    },

    methods: {
        addTopicAndQuestion() {
            console.log(JSON.parse(localStorage.getItem("questionList")));
            let editInfo = JSON.parse(localStorage.getItem("questionList"));
            
            console.log(editInfo.length);
            for (let i = 0; i < editInfo.length; i++) {
                          
            let body = {
                number:this.number ,
                oldQuestion:this.questionListForEdit[i].question,
                newQuestion:editInfo[i].question,
                options:editInfo[i].options,
                type: editInfo[i].type,
                must: editInfo[i].must
            }
            console.log(body);
            fetch("http://localhost:8080/update_question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert(data.message)
                })
            }
        },// method : addTopicAndQuestion 到此
        addToUnder() {
            if (this.question == null || this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }//把輸入的問題資料都先存到陣列裡面
            this.tempQ.push(`${this.question}`);
            this.tempOptions.push(`${this.option}`);
            this.tempType.push(`${this.type}`);
            this.tempMust.push(`${this.must}`);
            // 創一個 物件放剛剛的陣列進去
            for (let i = 0; i < this.tempQ.length + 1; i++) {
                this.questionList.push({
                    question: this.tempQ[i],
                    options: this.tempOptions[i],
                    type: this.tempType[i],
                    must: this.tempMust[i]
                })

                //把push進去了的東西刪掉 不然會重複
                delete this.tempQ[i]
                delete this.tempOptions[i]
                delete this.tempType[i]
                delete this.tempMust[i]
            }
            this.questionList = this.questionList.filter((item) => {
                return (item.question !== undefined)
            })
            console.log("here");
            console.log(this.questionList);

            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must = false
        },
        deleteQuetion(question) {
            this.questionList = this.questionList.filter(item => {
                return item.question !== question
            })
            localStorage.setItem('questionList', JSON.stringify(this.questionList));


            let body = {
                number: this.number,
                question: question
            }
            console.log(body);
            fetch("http://localhost:8080/delete_question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.alert(data.message)
                    if (data.message == "Successful!!") {
                        window.location.reload();

                    }

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
            }
            this.questionList = JSON.parse(localStorage.getItem("questionList"))
            console.log(this.questionList);

            this.questionList[this.numberForEdit] = {
                question: this.question,
                options: this.option,
                type: this.type,
                must: this.must
            }
            localStorage.setItem('questionList', JSON.stringify(this.questionList));
            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must = false
            this.joinOrEdit = true;
        },
        goBack(topicNumber) {
            this.$router.push(`/EditTopicView/?${this.number}`)

        }
    }
};
</script>

<template>
    <div class="wrapper">
        <FuctionSelect :number="number" :isUser="0" />

        <h1>編輯問題頁面</h1>
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
                <tr v-for="(item, index) in questionList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.question }}</td>
                    <td v-if="item.type == 1">單選</td>
                    <td v-else>多選</td>
                    <td v-if="item.must == true">必填</td>
                    <td v-else>非必填</td>
                    <td>
                        <button type="button" @click="deleteQuetion(item.question)">刪除</button>
                        <button type="button"
                            @click="goEdit(item.question, item.options, item.type, item.must, index)">編輯</button>
                    </td>

                </tr>
            </table>

        </div>

    </div>

    <button type="button" @click="goBack">取消</button>
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

.wrapper {}
</style>