<script>
export default {
    data() {
        return {
            number:0,
            name:null,
            startY:0,
            startM:0,
            startD:0,
            endY:0,
            endM:0,
            endD:0,
            description:null,
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
              console.log(data.topic.description);
              this.description = data.topic.description;
            })

    },
}
</script>

<template>
    <div class="name">
        <p>問卷名稱</p>
       <input type="text" name="123">
       <input type="date" name="" id="">
      
        <p>開始時間</p>
        <select name="year" id="year">
            <option value="year"></option>
        </select>
        <select name="month" id="month">
            <option value="month"></option>
        </select>
        <select name="date" id="date">
            <option value="date"></option>
        </select>
    
        <p>結束時間</p>
        <select name="year" id="year">
            <option value="year"></option>
        </select>
        <span>年</span>

        <select name="month" id="month">
            <option value="month"></option>
        </select>
        <span>月</span>

        <select name="date" id="date">
            <option value="date"></option>
        </select>
        <span>日</span>

        <p>描述內容</p>
        <textarea name="" id="" cols="30" rows="10">
            {{ description }}
        </textarea>
    </div>
</template>

<style lang="scss" scoped>
    
</style>