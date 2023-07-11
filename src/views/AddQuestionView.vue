<script>
export default {
    data() {
        return {
            topicNumber:0,
            topicBodyStr: null,
            //input bar v-model以下
            question: null,
            must2: false,
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
        cancel(){
            this.$router.push(`/AddTopicView`)
            
        },
        addTopicAndQuestion() {
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
            let sessionInfo = JSON.parse(localStorage.getItem("questionList"))
            console.log("here132");
            console.log(sessionInfo);
            let questionBodyII = {
                questionList: [{}]
            }
            for (let i = 0; i < sessionInfo.length; i++) {
                questionBodyII.questionList.push({
                    topicNumber: localStorage.getItem("number"),
                    question: sessionInfo[i].name,
                    options: sessionInfo[i].options,
                    type: sessionInfo[i].type,
                    must: sessionInfo[i].must
                })
            }
            // ++這個filter 不然questionList 會有一個空陣列 => 0:[]
            questionBodyII.questionList = questionBodyII.questionList.filter((item)=>{
                return item.topicNumber == localStorage.getItem("number")
            })
            console.log("heerwrwerehere");
            console.log(questionBodyII);
            // console.log(questionBody);
            fetch("http://localhost:8080/add_question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionBodyII)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.alert(data.message)
                    if (data.message == "Successful!!") {
                        location.href = '/BackstageHomeView'

                    }

                })
                localStorage.removeItem("questionList")

        },// method : addTopicAndQuestion 到此
        addToUnder() {
            if (this.question == null || this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }
            console.log(this.option.split(";").length);
           
            if(this.option.split(";").length < 2){
                alert("用分號隔開啦")
                return
            }
            
            //把輸入的問題資料都先存到陣列裡面
            this.tempQ.push(`${this.question}`);
            this.tempOptions.push(`${this.option}`);
            this.tempType.push(`${this.type}`);
            this.tempMust.push(`${this.must2}`);
            // 創一個 物件放剛剛的陣列進去
            for (let i = 0; i < this.tempQ.length + 1; i++) {
                this.test.questionList.push({
                    name: this.tempQ[i],
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
console.log(this.test.questionList);
            this.test.questionList = this.test.questionList.filter((item, index, self) => {
                return (item.name !== undefined && item.options !== undefined && item.type !== undefined && item.must !== undefined)
            })
            console.log("here");
            console.log(this.test.questionList);
            //把處理好的問題資料儲存進 localstorage
            localStorage.setItem('questionList', JSON.stringify(this.test.questionList));

            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must2 = false
        },
        deleteQuetion(name) {
            this.test.questionList = this.test.questionList.filter(item => {
                return item.name !== name
            })
            localStorage.setItem('questionList',JSON.stringify(this.test.questionList));
        },
        goEdit(name, option, type, must, index) {
            this.question = name;
            this.option = option;
            this.type = type;
            this.must2 = must;
            this.joinOrEdit = false;
            this.numberForEdit = index
        },

        editToUnder() {
            console.log(this.numberForEdit);
            if (this.question == null || this.option == null) {//this.tempType == null ||
                window.alert("有資料沒填寫")
                return
            }//a b
        
            this.test.questionList = JSON.parse(localStorage.getItem("questionList"))
            console.log(this.test.questionList);
            //直接複寫 即為更新
            this.test.questionList[this.numberForEdit] = {
                name: this.question,
                options: this.option,
                type: this.type,
                must: this.must2
            }
            localStorage.setItem('questionList', JSON.stringify(this.test.questionList));
            // reset成null alert才能偵測 有資料沒填寫
            this.question = null
            this.option = null
            this.type = 1
            this.must2 = false
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
        <input type="checkbox" id="must"  v-model="must2">
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
                    <td v-if="item.type == 1">單選</td>
                    <td v-else>多選</td>

                    <td v-if="item.must === 'true'">必填</td>
                    <td v-else>非必填</td>

                    <!-- <td v-if="item.must !== 'true'">非必填</td> -->
        
                    <td>
                        <button type="button" @click="deleteQuetion(item.name)">刪除</button>
                        <button type="button"
                            @click="goEdit(item.name, item.options, item.type, item.must, index)">編輯</button>
                    </td>

                </tr>
            </table>

        </div>

    </div>
    <button type="button" @click="cancel">取消</button>
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