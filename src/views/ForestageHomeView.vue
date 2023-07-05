<script>
export default {
    data() {
        return {
            time: new Date,

            topicList: null,
            startTime: null,
            endTime: null,
            now: null,
            status: null,

            totalPage: 0,//總頁數
            pageNumber: 3,//每頁多少筆數據
            pageArr: [],
            page: 0,// 現在的頁數
            newData: [],
            topicListLength: 0
        }
    },
    mounted() {
        fetch("http://localhost:8080/get_all_topic", {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.topicList = data.topicList
                console.log(typeof data.topicList[1].startTime);
                this.totalPage = this.topicList.length / this.pageNumber
                this.getPageData(1)
            })
            if (this.time.getDate() < 10) {
            this.now = `${this.time.getFullYear()}0${this.time.getMonth() + 1}0${this.time.getDate()}`
        } else {
            this.now = `${this.time.getFullYear()}0${this.time.getMonth() + 1}${this.time.getDate()}`
        }
    },
    methods: {
        addPage() {
            for (let i = 0; i < this.totalPage; i++) {
                this.pageArr[i] = i + 1;
            }
            return this.pageArr;
        },
        //先識別出現在就是在那一頁 將值賦予給page
        getPageData(index) {
            this.page = index //獲取當前的頁數是多少
            this.newData = this.topicList.slice((this.page - 1) * this.pageNumber, (this.page) * this.pageNumber);
        },
        notNow(){
            alert("未開放")
        },

        getStatus(start, end) {
            if (+this.now < start) {
                return "未開放"
            }
            else if (+this.now > end) {
                return "已關閉"
            }
            else {
                return "開放中"
            }
        },
        goEdit(topicNumber) {
            this.$router.push(`/EditTopicView/?${topicNumber}`)
        },
        addTopic() {
            this.$router.push(`/AddTopicView`)
        },
        goFeedBack(topicNumber,topicName) {
            this.$router.push(`/StatisticsView/?${topicNumber}`)

        },
        answerTopic(topicNumber){
            this.$router.push(`/AnswerQuestionView/?${topicNumber}`)
        }
    }
}
</script>

<template>
    
<h2>ForeStageHome</h2>
    <div class="search-area">
        <div class="topic-name">
            <h2>問卷名稱</h2>
            <input type="text">
        </div>
        <div class="topic-time">
            <h2>開始/結束</h2>
            <input type="date" name="" id="">
            <span> - </span>
            <input type="date" name="" id="">
            <button type="button">搜尋</button>
        </div>

        <div class="list">
            <table>
                <tr>
                    <th>編號</th>
                    <th>問卷名稱</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>統計</th>
                </tr>
                <tr v-for="(item, index) in newData" :key="index">
                    <td>{{ item.number }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getStatus(item.startTime, item.endTime) }}</td>
                    <td>{{ item.startTime }}</td>
                    <td>{{ item.endTime }}</td>
                    <td v-if="getStatus(item.startTime, item.endTime) === '未開放'"><button type="button" @click="notNow()">觀看</button></td>
                    <td v-else><button type="button" @click="goFeedBack(item.number,item.name)">觀看</button></td>

                   <td><button type="button" @click="answerTopic(item.number)">填問卷 !</button></td>

                </tr>
            </table>

        </div>
    </div>
    <div>
        <ul class="pagination">
            <li><a href="#">上一頁</a></li>
            <li v-for="m in addPage()"><a href="#" @click="getPageData(m)"> {{ m }}</a></li>
            <li><a href="#">下一頁</a></li>
        </ul>

    </div>
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
.pagination{
    display: flex;
    ul,li{
        padding: 50px;
    }
}

</style>

