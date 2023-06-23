<script>
export default {
    data() {
        return {
            time: new Date,

            topicList: null,
            startTime: null,
            endTime: null,
            now: null,
            status: null
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
            }),
            this.now = `${this.time.getFullYear()}0${this.time.getMonth() + 1}${this.time.getDate()}`

    },
    methods: {
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
        }
    },
}
</script>

<template>
    <div class="search-area">
        <div class="topic-name">
            <h2>問卷名稱</h2>
            <input type="text">
        </div>
        <div class="topic-time">
            <h2>開始/結束</h2>
            <input type="text">
            <input type="text">
            <button type="button">搜尋</button>
        </div>

        <div class="addTopic">
            <button type="button">新增問卷</button>
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
                <tr v-for="(item, index) in topicList" :key="index">
                    <td>{{ item.number }}</td>
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

        </div>
    </div>
    <div>


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
</style>