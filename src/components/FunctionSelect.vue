<script>
export default {

    props: ["member", "title"]
}
</script>

<template>
    <div class="fuctionBox">
        
        <div class="fuction-group">
            <h2>{{ title }}</h2>
            <RouterLink v-for="item in member" :key="item" class="category-link" :class="{local:location ===  item.index}" v-bind:to="item.to">{{ item.name }}
            </RouterLink>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.fuctionBox {
    width: 300px;
    height: 100vh;
    .fuction-group {
        padding: 2rem;
        .category-link {
            display: block;
            text-decoration: none;
            color: rgb(70, 70, 70);
            transition: 0.7s;
            &:hover{
                color:rgb(1, 1, 1) ;
                scale: 1.05;
            }
        }
    }
}
.local{
        color: #FF4858!important;
        font-size: 20px;
        font-weight: bold; 
       
    }
</style>