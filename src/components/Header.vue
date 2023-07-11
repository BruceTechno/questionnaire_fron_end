<script>
import { RouterLink } from "vue-router";
export default {
    data() {
        return {

        }
    },
}
</script>

<template>
    <div class="wrapper">
        
        <RouterLink to="/" class="link">動態問卷系統</RouterLink>

    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    background-color: #2e5265;
    text-align: center;
    h2 {
        margin: 0;
        font-size: 40px;
        text-align: center;
    }
}

.link {
    text-decoration: none;
    color: white;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 1rem;
    font-size: 100px;

    &:hover {
        color: aquamarine;
    }
}
</style>