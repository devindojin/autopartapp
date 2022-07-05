<template>
    <div>
        <ul class="faq">
            <li><h5>Q. How I can overwrite the css?</h5>
            <h5 class="text-success">A. You can write n+1 priorty css</h5></li>
        </ul>
    </div>
</template>

<style scoped>
    ul.faq {
        list-style: none;
    }
</style>
<script>
    export default {
        mounted() {
            this.$emit('pagetitlechange', this.page_title);
        },
        data: function() {
            return {
                page_title: "FAQ"
            }
        }
    }
</script>
