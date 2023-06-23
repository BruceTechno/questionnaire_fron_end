<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        fetch("http://localhost:8080/get_all_topic", {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
    },
}
   

</script>

<template>
   
</template>

<style lang="scss" scoped>
.list {
    margin: 80px;
    border-radius: 10px;
    border: 1px solid black;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: center;
    padding: 8px;
}

button {
    border: none;
    background-color: #403234;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 0 15px;
    border-radius: 10px;
    transition: 0.7s;
    cursor: pointer;
    margin: 0 20px;

    &:hover {
        background-color: #d0cfd0;
    }

    &:active {
        scale: 1.05;
    }
}
</style>