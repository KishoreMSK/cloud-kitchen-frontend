<template>
    <v-container>

        <v-row class="cart-items-container" cols="12">
            <ProductCartComponent v-for="item in itemlist" :key="item.id" :itemObject="item" />
        </v-row>

    </v-container>
</template>

<script src="../js/ProductComponent.js"></script>
<style scoped>
.cart-items-container {
    margin-top: 5%;
}
</style>