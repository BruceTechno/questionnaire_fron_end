<script>
export default {
    props: ["number", "isUser"],
    data() {
        return {
            member: [
                {
                    name: "問卷回饋",
                    to: "/FeedBackPageView/?"
                    // to: `/FeedBackPageView/?${number}`
                },
                {
                    name: "問卷回饋細節",
                    to: "/FeedBackDetailView/?"
                },
                {
                    name: "統計圖",
                    to: "/StatisticsView/?"
                },
                {
                    name: "編輯問卷",
                    to: "/EditTopicView/?"
                },
                {
                    name: "編輯問題",
                    to: "/EditQuestionView/?"
                }
            ],
            user: [
                {
                    name: "問卷回饋",
                    to: "/FeedBackPageView/?"
                    // to: `/FeedBackPageView/?${number}`
                },
                {
                    name: "問卷回饋細節",
                    to: "/FeedBackDetailView/?"
                },
                {
                    name: "統計圖",
                    to: "/StatisticsView/?"
                },
            ],
            
            num: 0,
        }
    },
    mounted() {
        console.log(this.test)
    },
    methods: {
        goTo(path) {
            this.$router.push(`${path}${this.number}`)
        }
    },

}
</script>

<template>
    <div class="fuctionBox">
        <div v-if="isUser === 0">
            <div class="fuction-group">
                <p v-for="item in member" :key="item" class="category-link" @click="goTo(item.to)">{{ item.name }}
                </p>
            </div>
        </div>
        <div v-else>
            <div class="fuction-group">
                <p v-for="item in user" :key="item" class="category-link" @click="goTo(item.to)">{{ item.name }}
                </p>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.fuctionBox {
    width: 300px;
    // height: 100vh;

    .fuction-group {
        padding: 2rem;

        .category-link {
            display: block;
            text-decoration: none;
            color: rgb(70, 70, 70);
            transition: 0.7s;

            &:hover {
                color: rgb(1, 1, 1);
                scale: 1.05;
                cursor: pointer;
            }

        }
    }
}

.local {
    color: #FF4858 !important;
    font-size: 20px;
    font-weight: bold;

}
</style>