<script>
export default {
    data() {
        return {
            topicName: null,
            description: null,
            userName: null,
            phone: null,
            mail: null,
            age: null,
            questionList: null,
            optionList: [],
            answerList: [],
            //
            answers: [],

            number: null,

            isChecked: 0,
            //信箱格式正規驗證
            isValidEmail: true,
            //電話格式驗證
            isValidPhone: true,
        }
    },
    mounted() {
        let url = window.location.search;
        let str = url.substring(url.indexOf("?") + 1);
        this.number = parseInt(str);
        let body = {
            number: this.number
        }
        fetch("http://localhost:8080/get_topic_by_number", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.description = data.topic.description
                this.topicName = data.topic.name
            })
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

                for (let i = 0; i < data.questionList.length; i++) {
                    if (data.questionList[i].options.includes(";")) {
                        this.optionList.push(data.questionList[i].options.split(';'))
                    }
                }
            })
        console.log(this.optionList);
    },
    methods: {
        addAnswer(op, index) {
            this.answers[index] = []
            // answers[1] = [好]
            // answers[2] = []
            this.answers[index].push(op)
            console.log(this.answers);
        },
        addMultipleAnswer(op, index) {

            let temp = this.answers[index]
            if (temp == undefined) {
                this.answers[index] = []
                this.answers[index].push(op)
            } else {
                this.answers[index].push(op)
            }

            console.log(this.answers);
            console.log(temp);
        },
        checked() {
            this.isChecked = 1;

            console.log("hi");
            console.log(this.checked);
        },
        cancel() {
            this.isChecked = 0;

        },
        send() {

            //必填檢查
            if (this.userName === null || this.phone === null || this.mail === null || this.age === null) {
                alert(`個人資料必填喔`);
                return;
            }
            if (this.age < 0) {
                alert("年齡怎麼會是負的呢????")
            }
            for (let i = 0; i < this.questionList.length; i++) {
                for (let j = 0; j < i + 1; j++) {
                    if (this.questionList[i].must == true &&
                        this.answers[j] == undefined) {
                        alert(`${this.questionList[i].question}為必填!!! 請作答喔`)
                        return;
                    }
                }
            }



            let body = {
                number: this.number,
                userList: []
            }
            for (let i = 0; i < this.answers.length; i++) {
                let resAnswer = "";
                this.answers[i].forEach((item, index) => {
                    // console.log(item);

                    if (index === this.answers[i].length - 1) {
                        resAnswer += item
                        return
                    }
                    resAnswer += `${item};`
                    console.log(resAnswer);
                });
                // console.log(resAnswer);

                body.userList.push({
                    name: this.userName,
                    phone: this.phone,
                    mail: this.mail,
                    age: this.age,
                    question: this.questionList[i].question,
                    answer: resAnswer
                })
            }

            console.log(body);
            fetch("http://localhost:8080/add_user_info", {
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
                    location.reload();
                    location.href = `/ForestageHomeView`
                })

        }
    },
    watch: {
        mail: {
            handler: function () {
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                this.isValidEmail = emailRegex.test(this.mail);
            }
        },
        phone: {
            handler: function () {
                const phoneRegex = /^09\d{8}$/;
                this.isValidPhone = phoneRegex.test(this.phone)
            }
        }



    },
}

</script>

<template>
    <div>
        <h1>填寫問卷</h1>
        <h2>問卷題目</h2>
        <p>{{ topicName }}</p>
        <h2>問卷說明</h2>
        <p>{{ description }}</p>

        <br><br><br>

        <span>姓名</span>
        <input type="text" v-model="userName">
        <br><br>
        <span>手機</span>
        <input v-if="isValidPhone" type="text" v-model.lazy="phone">
        <input v-else class="error" type="text" v-model.lazy="phone">
        <span v-if="isValidPhone"></span>
        <span v-else class="x">X</span>
        <br><br>
        <span>Email</span>
        <input v-if="isValidEmail" type="text" v-model.trim.lazy="mail">
        <input v-else class="error" type="text" v-model.trim.lazy="mail">
        <span v-if="isValidEmail"></span>
        <span v-else class="x">X</span>

        <br><br>
        <span>年齡</span>
        <input type="number" v-model="age">
    </div>
    <!-- checked Page if div -->
    <div>
        <!-- 問題 -->
        <div v-for="(item, index) in questionList" :key="index" class="questionList">
            <p v-if="item.must == false">{{ index + 1 }}.{{ item.question }}</p>
            <p v-else>{{ index + 1 }}.{{ item.question }}(必填)</p>

            <!-- 選項-- 單選 -->
            <div v-for="(op, i) in optionList[index]" :key="i" class="radio">
                <div v-if="item.type == 1" class="single">
                    <!-- 選答案 v-if -->
                    <input :disabled="isChecked === 1" @change="addAnswer(op, index)" type="radio" :name="index">
                    <!-- <input v-else type="radio" disabled="true"> -->
                    <label>{{ op }}</label>
                </div>
                <!-- 選項--多選 -->
                <div v-else class="multiple">
                    <!-- 選答案 v-if -->
                    <input :disabled="isChecked === 1" @change="addMultipleAnswer(op, index)" type="checkbox">
                    <!-- <input v-else type="checkbox" disabled="true"> -->
                    <label>{{ op }}</label>
                </div>
            </div>
        </div>

        <button v-if="isChecked === 0" type="button" @click="checked">確認</button>
        <button v-else type="button" @click="send">送出</button>

        <button v-if="isChecked === 1" type="button" @click="cancel">取消</button>
    </div>




    <!-- <button  type="button"  @click="send">送出</button> -->
</template>

<style lang="scss" scoped>
h1 {
    text-align: center;
}

.error {
    border: 2px solid red;
}

.x {
    color: red
}
</style>