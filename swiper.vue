<template>
    <div class="swiper">
        <div class="swiper-wrap"
             :class="{ 'dragging': dragging }"
             :style="{transform: 'translateY(' + translateY + 'px)'}"
             @touchstart="onTouchStart">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" src="./swiper.less"></style>
<script type="text/babel">
    export default{
        props: {
            performanceMode: false
        },
        data() {
            return {
                currentPage: 1,
                childrenCount: null,
                translateY: 0,
                height: 0,
                dragging: false
            };
        },
        ready() {
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.childrenCount = this.$el.querySelectorAll('.swiper-wrap>div').length;
            this.height = this.$el.clientHeight;
        },
        methods: {
            onTouchStart(e) {
                this.startY = e.touches[0].pageY;
                this.startTranslateY = this.translateY;
                this.startTime = new Date().getTime();
                this.dragging = true;
                document.addEventListener('touchmove', this.onTouchMove);
                document.addEventListener('touchend', this.onTouchEnd);
            },
            onTouchMove(e) {
                this.deltaY = e.touches[0].pageY - this.startY;

                if (!this.performanceMode) {
                    this.translateY = this.startTranslateY + this.deltaY;
                }
            },
            onTouchEnd(e) {
                this.dragging = false;
                var isQuickAction = new Date().getTime() - this.startTime < 1000;
                if (this.deltaY < -100 || (isQuickAction && this.deltaY < -15)) {
                    this.next();
                } else if (this.deltaY > 100 || (isQuickAction && this.deltaY > 15)) {
                    this.prev();
                }
            },
            next() {
                var page = this.currentPage;
                if (this.currentPage < this.childrenCount) page++;
                this.setPage(page);
            },
            prev() {
                var page = this.currentPage;
                if (this.currentPage > 1) page--;
                this.setPage(page);
            },
            setPage(page) {
                this.currentPage = page;
                this.translateY = -(this.currentPage - 1) * this.height;
            }
        }
    };
</script>
