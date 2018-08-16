<template>
    <div class="container">
    <navfilter></navfilter>
    <pre-sales></pre-sales>
    </div>
</template>
<script>
    import navfilter from './components/navfilter'
    import preSales from './preSales'
    export default {
        data: function() {
            return {

            }
        },
        components: {
            navfilter,
            preSales
        }
    }
</script>