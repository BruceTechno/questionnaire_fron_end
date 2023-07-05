
<script>
import * as echarts from 'echarts';

// require('echarts/theme/macarons');//引入主题
export default {

    data() {
        return {
            chartPie: null,
            chartPieData: [{}],
            question:null,
            
            number: 0,
            topicName: null,
            questionList: null,
            tempOptions: null,
            optionList: []
        }
    },
    mounted() {
        let url = window.location.search;
        let str = url.substring(url.indexOf("?") + 1);
        this.number = parseInt(str);
        const questionBody = {
            number: this.number,
        }
        // 抓問題 跟選項
        fetch("http://localhost:8080/get_question_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(questionBody)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.questionList = data.questionList
                for (let i = 0; i < data.questionList.length; i++) {
                    if (data.questionList[i].options.includes(";")) {
                        this.optionList[i] = (data.questionList[i].options.split(';'))
                    }
                }
                console.log(this.optionList[0]);
            })
        const topicBody = {
            number: this.number,
        }
        //抓問卷名字
        fetch("http://localhost:8080/get_topic_by_number", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topicBody)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.topicName = data.topic.name
            })


    },
    methods: {
        drawPieChart(question, index) {
           
            let mytextStyle = {
                color: "#333",
                fontSize: 18,
            };
            let mylabel = {
                show: true,
                position: "right",
                offset: [30, 40],
                formatter: '{b} : {c} ({d}%)',
                textStyle: mytextStyle
            };
            this.chartPie = echarts.init(document.getElementById('chartPie'), 'macarons');
            this.chartPie.setOption({
                title: {
                    text: question,
                    // subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    data: this.optionList[index],
                    left: "center",
                    top: "bottom",
                    orient: "horizontal",
                },
                series: [
                    {
                        name: question,
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['50%', '50%'],
                        data: this.chartPieData,
                        //   [
                        //     {value: 335, name: this.optionList[index][0]},
                        //     {value: 310, name: this.optionList[index][1]},
                        //     {value: 234, name: this.optionList[index][2]},
                        //     {value: 135, name: this.optionList[index][3]},
                        //   ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600,
                        label: {
                            emphasis: mylabel
                        }
                    }
                ]
            });
        },
        test() {
            console.log(this.optionList[2].length);
        },
        callDrawPieChart(index,question) {
            this.chartPieData =  [{}]
            console.log(this.optionList[index].length);
            for (let j = 0; j < this.optionList[index].length; j++) {

                const body = {
                    number: this.number,
                    answer: this.optionList[index][j]
                };
                console.log(body);
                fetch("http://localhost:8080/get_statistics", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        this.chartPieData.push(
                            {value:data.result,name:this.optionList[index][j] }
                        )
                        
                        this.drawPieChart(question,index);
                    })
            }
//for
        }
    }
}
</script>

<template>
    <p>統計畫面</p>
    <h1>{{ topicName }}</h1>
    <div v-for="(item, index) in questionList" :key="index">
        <span>{{ index + 1 }}. </span>
        <button type="button" @click="callDrawPieChart(index,item.question)"> {{ item.question }}</button>
    </div>
    <!-- @click="drawPieChart(item.question,index)" -->
    <div id="chartPie" class="pie-wrap"></div>
</template>

<style lang="scss" scoped>
h1 {
    text-align: center;
}

.pie-wrap {
    width: 100%;
    height: 400px;
}
</style>