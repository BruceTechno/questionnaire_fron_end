<script>
import FuctionSelect from "../components/FunctionSelect.vue"
export default {
    components: {
        FuctionSelect
    },
    data() {
        return {
            numbertest: 0,
            userList: null,
        }
    },
    mounted() {
        let url = window.location.search;
        let str = url.substring(url.indexOf("?") + 1);
        this.numbertest = parseInt(str);
        console.log(this.numbertest);
        let body = {
            topicNumber: this.numbertest
        }
        console.log(body);
        fetch("http://localhost:8080/get_users_who_answer_this_topic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message === 'Not found!!!') {
                    alert("尚無填答者之資料");
                    location.href = '/BackstageHomeView'
                }else{  
                this.userList = data.userList
            }
            })
    },
    methods: {
        goFeedBackDetail(name, localDate, topicNumber) {
            this.$router.push(`/FeedBackDetailView/?${topicNumber}`)
            localStorage.setItem('userName', name)
            localStorage.setItem('ansTime', localDate)
            // this.$router.push(`/FeedBackPageView/?${topicNumber}`)

        }
    }
}
</script>

<template>
    <h2>Feed Back Page</h2>
            <FuctionSelect :number="numbertest" :isUser="0" />

    <div class="">
    <div v-if="numbertest != 0">
        
    </div>
    <div class="list">
        <table>
            <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>觀看細節</th>

            </tr>
            <tr v-for="(item, index) in userList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.localDate }}</td>
                <td>
                    <button type="button" @click="goFeedBackDetail(item.name, item.localDate, numbertest)">前往</button>
                </td>

            </tr>
        </table>

    </div>
</div>
</template>

<style lang="scss" scoped>
.wrapper{
    display: flex;
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