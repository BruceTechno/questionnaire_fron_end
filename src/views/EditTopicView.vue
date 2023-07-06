<script>
import TopicDetail from '../components/TopicDetail.vue';
import FuctionSelect from "../components/FunctionSelect.vue"

export default {
    components:{
        TopicDetail,FuctionSelect
    },
    data() {
        return {
          number:0
        }
    },
    mounted() {
        let url = window.location.search;
            let str = url.substring(url.indexOf("?") + 1);
            this.number = parseInt(str);
            
    },
}
</script>

<template>     
   <h2>Edit Page</h2>

    <div class="wraaper">
        <FuctionSelect :number="number" :isUser="0" />

        <TopicDetail :addOrEdit="'edit'" />
    </div>
</template>

<style lang="scss" scoped>
    .wraaper{
        display: flex;
        
        align-items: center;
        
    }
</style>