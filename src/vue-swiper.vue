<template>
    <div class="swiper">
        <div class="swiper-wrap"
             :class="{ 'dragging': dragging }"
             :style="{transform: 'translateY(' + translateY + 'px)'}"
             @touchstart="onTouchStart"
             @mousedown="onTouchStart">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" src="./vue-swiper.less"></style>
<script type="text/babel">
    export default {
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
                this.startY = this.getPageY(e);
                this.startTranslateY = this.translateY;
                this.startTime = new Date().getTime();
                this.dragging = true;
                document.addEventListener('touchmove', this.onTouchMove);
                document.addEventListener('touchend', this.onTouchEnd);
                document.addEventListener('mousemove', this.onTouchMove);
                document.addEventListener('mouseup', this.onTouchEnd);
            },
            onTouchMove(e) {
                this.deltaY = this.getPageY(e) - this.startY;

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
                } else {
                    this.revert();
                }

                document.removeEventListener('touchmove', this.onTouchMove);
                document.removeEventListener('touchend', this.onTouchEnd);
                document.removeEventListener('mousemove', this.onTouchMove);
                document.removeEventListener('mouseup', this.onTouchEnd);
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
            revert() {
                this.setPage(this.currentPage);
            },
            setPage(page) {
                this.currentPage = page;
                this.translateY = -(this.currentPage - 1) * this.height;
            },
            getPageY(e) {
                return e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
            }
        }
    };
</script>
