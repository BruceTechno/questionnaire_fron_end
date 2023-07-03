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
        <h2>Header+++</h2>
        <RouterLink to="/" class="link">Go Home喔</RouterLink>

    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    background-color: #2e5265;

    h2 {
        margin: 0;
        font-size: 50px;
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