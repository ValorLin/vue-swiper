<template>
    <div class="swiper">
        <div class="swiper-wrap"
             v-el:swiper-wrap
             :class="{ 'dragging': dragging }"
             :style="{transform: 'translateY(' + translateY + 'px)'}"
             @touchstart="_onTouchStart"
             @mousedown="_onTouchStart"
             @transitionend="_onTransitionEnd">
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
                lastPage: 1,
                childrenCount: null,
                translateY: 0,
                height: 0,
                dragging: false
            };
        },
        ready() {
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            this.childrenCount = this.$el.querySelectorAll('.swiper-wrap>div').length;
        },
        methods: {
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
                this.lastPage = this.currentPage;
                this.currentPage = page;
                this.translateY = -(this.currentPage - 1) * this.height;
                this._onTransitionStart();
            },
            _onTouchStart(e) {
                this.startY = this._getPageY(e);
                this.height = this.$el.clientHeight;
                this.startTranslateY = this.translateY;
                this.startTime = new Date().getTime();
                this.dragging = true;
                document.addEventListener('touchmove', this._onTouchMove);
                document.addEventListener('touchend', this._onTouchEnd);
                document.addEventListener('mousemove', this._onTouchMove);
                document.addEventListener('mouseup', this._onTouchEnd);
            },
            _onTouchMove(e) {
                this.deltaY = this._getPageY(e) - this.startY;

                if (!this.performanceMode) {
                    this.translateY = this.startTranslateY + this.deltaY;
                }
            },
            _onTouchEnd(e) {
                this.dragging = false;
                var isQuickAction = new Date().getTime() - this.startTime < 1000;
                if (this.deltaY < -100 || (isQuickAction && this.deltaY < -15)) {
                    this.next();
                } else if (this.deltaY > 100 || (isQuickAction && this.deltaY > 15)) {
                    this.prev();
                } else {
                    this._revert();
                }

                document.removeEventListener('touchmove', this._onTouchMove);
                document.removeEventListener('touchend', this._onTouchEnd);
                document.removeEventListener('mousemove', this._onTouchMove);
                document.removeEventListener('mouseup', this._onTouchEnd);
            },
            _revert() {
                this.setPage(this.currentPage);
            },
            _getPageY(e) {
                return e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
            },
            _onTransitionStart() {
                if (this.lastPage !== this.currentPage) {
                    this.$emit('slide-change-start', this.currentPage);
                }
            },
            _onTransitionEnd() {
                if (this.lastPage !== this.currentPage) {
                    this.$emit('slide-change-end', this.currentPage);
                }
            }
        }
    };
</script>
