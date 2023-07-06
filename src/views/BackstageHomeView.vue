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
            pageNumber: 5,//每頁多少筆數據
            pageArr: [],
            page: 0,// 現在的頁數
            newData: [],
            topicListLength: 0,
            //模糊搜尋參數
            startTimeForSearch: 0,
            endTimeForSearch: 0,

            topicNameForSearch: null,
            isSearch: false,
            distinctSearchTopicList: null,
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
                this.topicListLength = this.topicList.length;
                console.log(this.topicListLength);
                this.totalPage = this.topicListLength / this.pageNumber
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
        getPreviousPageData() {
            if (this.page > 1) {
                this.page = this.page - 1 //獲取當前的頁數是多少
                this.newData = this.topicList.slice((this.page - 1) * this.pageNumber, (this.page) * this.pageNumber);
            } else {
                alert("已在第一頁")
            }
        },

        getNextPageData() {
            if (this.page < this.totalPage) {
                this.page = this.page + 1 //獲取當前的頁數是多少
                this.newData = this.topicList.slice((this.page - 1) * this.pageNumber, (this.page) * this.pageNumber);
            }
        },
        firstPage() {
            this.page = 1 //獲取當前的頁數是多少
            this.newData = this.topicList.slice((this.page - 1) * this.pageNumber, (this.page) * this.pageNumber);
        },
        lastPage() {
            this.page = this.totalPage //獲取當前的頁數是多少
            this.newData = this.topicList.slice((this.page - 1) * this.pageNumber, (this.page) * this.pageNumber);
        },
        notNow() {
            alert('未開放')
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
        goEdit(topicNumber, start, end) {
            if (this.getStatus(start, end) === '未開放') {
                this.$router.push(`/EditTopicView/?${topicNumber}`)

            } else {
                alert("現在無法編輯問卷")
                return;
            }
        },
        addTopic() {
            this.$router.push(`/AddTopicView`)
        },
        goFeedBack(topicNumber) {
            this.$router.push(`/FeedBackPageView/?${topicNumber}`)

        },
        deleteTopic(topicNumber, start, end) {
            if (this.getStatus(start, end) == '開放中') {
                alert("現在無法刪除問卷")
                return;
            } else {

                let body = {
                    number: topicNumber
                }
                fetch("http://localhost:8080/delete_topic", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        window.alert(data.message)
                        console.log(data);
                        if (data.message === "Successful!!") {
                            window.location.reload();
                        }
                    })
            }
        },
        searchTopic() {
            this.isSearch = true
            console.log(parseInt(this.startTimeForSearch.toString().replace("-", "").replace("-", "")));


            // this.endTimeForSearch

            let body = {
                topicName: this.topicNameForSearch,
                startTime: parseInt(this.startTimeForSearch.toString().replace("-", "").replace("-", "")),
                endTime: parseInt(this.endTimeForSearch.toString().replace("-", "").replace("-", "")),
            }
            fetch("http://localhost:8080/distinct_search_topic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.distinctSearchTopicList = data.distinctSearchResultList
                })
        }
    }
}
</script>

<template>
    <div class="search-area">
        <div class="topic-name">
            <h2>問卷名稱</h2>
            <input type="text" v-model="topicNameForSearch">
        </div>
        <div class="topic-time">

            <h2>開始/結束</h2>
            <input type="date" v-model="startTimeForSearch">
            <span> - </span>
            <input type="date" v-model="endTimeForSearch">
            <button type="button" @click="searchTopic()">搜尋</button>
        </div>
        <br>
        <div class="addTopic">
            <button type="button" @click="addTopic">新增問卷</button>
        </div>
        <div v-if="isSearch == false" class="list">
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
                    <td v-if="getStatus(item.startTime, item.endTime) == '未開放'"><button type="button"
                            @click="notNow()">觀看</button></td>
                    <td v-else><button type="button" @click="goFeedBack(item.number)">觀看</button></td>
                    <td>
                        <button type="button" @click="deleteTopic(item.number, item.startTime, item.endTime)">刪除</button>
                        <button type="button" @click="goEdit(item.number, item.startTime, item.endTime)">編輯</button>
                    </td>

                </tr>
            </table>
            <div id="page">

            </div>

        </div>
        <!-- 模糊搜尋 v-else -->
        <div v-else class="list">
            <table>
                <tr>
                    <th>編號</th>
                    <th>問卷名稱</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>統計</th>
                </tr>
                <tr v-for="(item, index) in distinctSearchTopicList" :key="index">
                    <td>{{ item.number }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getStatus(item.startTime, item.endTime) }}</td>
                    <td>{{ item.startTime }}</td>
                    <td>{{ item.endTime }}</td>
                    <td v-if="getStatus(item.startTime, item.endTime) == '未開放'"><button type="button"
                            @click="notNow()">觀看</button></td>
                    <td v-else><button type="button" @click="goFeedBack(item.number)">觀看</button></td>
                    <td>
                        <button type="button" @click="deleteTopic(item.number, item.startTime, item.endTime)">刪除</button>
                        <button type="button" @click="goEdit(item.number, item.startTime, item.endTime)">編輯</button>
                    </td>

                </tr>
            </table>
            <div id="page">

            </div>

        </div>
        <p>現在頁碼{{ page }}</p>

        <div v-if="isSearch == false" class="pagination">
            <div><a href="#" @click="firstPage()">第一頁</a></div>
            <div><a href="#" @click="getPreviousPageData()">上一頁</a></div>
            <div v-for="m in addPage()"><a href="#" @click="getPageData(m)"> {{ m }}</a></div>
            <div><a href="#" @click="getNextPageData()">下一頁</a></div>
            <div><a href="#" @click="lastPage()">最後一頁</a></div>
        </div>
    </div>
    <div>

    </div>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;

    a {
        padding: 15px 15px;
    }
}

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