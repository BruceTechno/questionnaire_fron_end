<script>

export default {
    data() {
        return {
            number: 0,
            name: null,
            startY: 0,
            startM: 0,
            startD: 0,
            endY: 0,
            endM: 0,
            endD: 0,
            startTime: null,
            endTime: null,
            description: null,
            defaultStartTime: null,
            defaultEndTime: null,
        }
    },
    methods: {
        //編輯頁面裡的方法
        cancel() {
            this.$router.push(`/BackstageHomeView`)
        },
        //編輯頁面裡的方法
        save() {
            const body = {
                number: this.number,
                name: this.name,
                startY: this.defaultStartTime.substring(0, 4),
                startM: this.defaultStartTime.substring(5, 7),
                startD: this.defaultStartTime.substring(8, 10),
                endY: this.defaultEndTime.substring(0, 4),
                endM: this.defaultEndTime.substring(5, 7),
                endD: this.defaultEndTime.substring(8, 10),
                description: this.description
            }
            console.log(body);
            fetch("http://localhost:8080/update_topic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    window.alert(data.message);
                    if (data.message == "Successful!!") {
                        this.$router.push(`/EditQuestionView?${this.number}`)

                    }
                })
        },
        //編輯頁面裡的方法
        getOldTopicInfo() {
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
                    console.log(data.topic.description);
                    this.name = data.topic.name
                    this.description = data.topic.description;
                    //開始時間 預設
                    this.startTime = data.topic.startTime;
                    this.startY = Math.floor(this.startTime / 10000)
                    this.startM = Math.floor((this.startTime % 10000) / 100);
                    if (this.startM < 10) {
                        this.startM = "0" + this.startM
                    }
                    this.startD = (this.startTime % 100)
                    if (this.startD < 10) {
                        this.startD = "0" + this.startD
                    }
                    console.log(this.startY + "-" + this.startM + "-" + this.startD);
                    this.defaultStartTime = this.startY + "-" + this.startM + "-" + this.startD
                    //結束時間 預設
                    this.endTime = data.topic.endTime;
                    this.endY = Math.floor(this.endTime / 10000)
                    this.endM = Math.floor((this.endTime % 10000) / 100);
                    if (this.endM < 10) {
                        this.endM = "0" + this.endM
                    }
                    this.endD = (this.endTime % 100)
                    if (this.endD < 10) {
                        this.endD = "0" + this.endD
                    }
                    console.log(this.endY + "-" + this.endM + "-" + this.endD);
                    this.defaultEndTime = this.endY + "-" + this.endM + "-" + this.endD;
                })
        },
        //新增頁面裡的方法
        addTopic() {
                    // 不能存body???????????
            // Snumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
            //     //Math.floor(Math.random() * (max - min + 1)) + min
            //     Sname = this.name,
            //     SstartY = this.defaultStartTime.substring(0, 4),
            //     SstartM = this.defaultStartTime.substring(5, 7),
            //     SstartD = this.defaultStartTime.substring(8, 10),
            //     SendY = this.defaultEndTime.substring(0, 4),
            //     SendM = this.defaultEndTime.substring(5, 7),
            //     SendD = this.defaultEndTime.substring(8, 10),
            //     Sdescription = this.description
            localStorage.setItem('number',  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)
            localStorage.setItem('name',  this.name)
            localStorage.setItem('startY', this.defaultStartTime.substring(0, 4))
            localStorage.setItem('startM', this.defaultStartTime.substring(5, 7))
            localStorage.setItem('startD',this.defaultStartTime.substring(8, 10))
            localStorage.setItem('endY',this.defaultEndTime.substring(0, 4))
            localStorage.setItem('endM',this.defaultEndTime.substring(5, 7))
            localStorage.setItem('endD',this.defaultEndTime.substring(8, 10))
            localStorage.setItem('description',this.description)
            this.$router.push(`/AddQuestionView`)

        }
    },
    mounted() {
        if (this.addOrEdit == 'edit') {
            this.getOldTopicInfo();
        }



    },
    props: ["addOrEdit"]
}
</script>

<template>
    <div class="name">
        <p>問卷名稱</p>
        <input type="text" name="123" v-model="name">

        <p>開始時間</p>
        <input type="date" name="" id="start" v-model="defaultStartTime">

        <p>結束時間</p>
        <input type="date" name="" id="end" v-model="defaultEndTime">

        <p>描述內容</p>
        <textarea name="" id="" cols="30" rows="10" v-model="description">
            {{ description }}
        </textarea>
    </div>
    <button type="button" @click="cancel">取消</button>
    <button v-if="addOrEdit == 'edit'" type="button" @click="save">儲存</button>
    <button v-else type="button" @click="addTopic">下一步</button>
</template>

<style lang="scss" scoped></style>