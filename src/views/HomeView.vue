<script>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="wrapper">
<RouterLink class="category-link" to="/BackstageHomeView">管理者</RouterLink>
<RouterLink class="category-link" to="/ForestageHomeView">使用者</RouterLink>
</div>
    
</template>

<style lang="scss" scoped>
.category-link {
            text-decoration: none;
            color: #403234;
            margin: 0 10px;
            font-size: 20px;
            font-weight: bold;
            transition: 0.7s;

            &:hover {
                color: #735b5f;
            }
        }
</style>