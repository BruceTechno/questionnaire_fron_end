<script>
import TopicDetail from '../components/TopicDetail.vue';
export default {
    components:{
        TopicDetail
    },
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
}
</script>

<template>
    <div class="wraaper">
        <h2>Add Page</h2>
        <TopicDetail :addOrEdit="'add'" />
    </div>
</template>

<style lang="scss" scoped>
    
</style>