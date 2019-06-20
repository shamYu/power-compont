<template>
    <Spin fix v-show="$store.state.loadingShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
        </Spin>
</template>

