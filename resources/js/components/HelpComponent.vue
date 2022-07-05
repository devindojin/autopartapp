<template>
    <div>
        <p>Have any questions/feedback related to app. Please email us at vortexapplabs@gmail.com and we will get back to you.</p>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$emit('pagetitlechange', this.page_title);
        },
        data: function() {
            return {
                page_title: "Help"
            }
        }
    }
</script>
