<template>
    <div class="swiper"
         :class="[direction, {'dragging': dragging}]">
        <div class="swiper-wrap"
             v-el:swiper-wrap
             :style="{'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)'}"
             @touchstart="_onTouchStart"
             @mousedown="_onTouchStart"
             @transitionend="_onTransitionEnd">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" src="./vue-swiper.less"></style>
<script type="text/babel">
    const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';

    export default {
        props: {
            direction: {
                type: String,
                default: VERTICAL,
                validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
            },
            performanceMode: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentPage: 1,
                lastPage: 1,
                translateX: 0,
                translateY: 0,
                startTranslateX: 0,
                startTranslateY: 0,
                width: 0,
                height: 0,
                delta: 0,
                childrenCount: null,
                dragging: false,
                startPos: null
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
                var n = -(this.currentPage - 1);
                if (this.isHorizontal()) {
                    this.translateX = n * this.width;
                } else {
                    this.translateY = n * this.height;
                }
                this._onTransitionStart();
            },
            isHorizontal() {
                return this.direction === HORIZONTAL;
            },
            isVertical() {
                return this.direction === VERTICAL;
            },
            _onTouchStart(e) {
                this.startPos = this._getTouchPos(e);
                this.delta = 0;
                this.width = this.$el.clientWidth;
                this.height = this.$el.clientHeight;
                this.startTranslateX = this.translateX;
                this.startTranslateY = this.translateY;
                this.startTime = new Date().getTime();
                this.dragging = true;
                document.addEventListener('touchmove', this._onTouchMove);
                document.addEventListener('touchend', this._onTouchEnd);
                document.addEventListener('mousemove', this._onTouchMove);
                document.addEventListener('mouseup', this._onTouchEnd);
            },
            _onTouchMove(e) {
                this.delta = this._getTouchPos(e) - this.startPos;

                if (!this.performanceMode) {
                    if (this.isHorizontal()) {
                        this.translateX = this.startTranslateX + this.delta;
                    } else {
                        this.translateY = this.startTranslateY + this.delta;
                    }
                }
            },
            _onTouchEnd(e) {
                this.dragging = false;
                var isQuickAction = new Date().getTime() - this.startTime < 1000;
                if (this.delta < -100 || (isQuickAction && this.delta < -15)) {
                    this.next();
                } else if (this.delta > 100 || (isQuickAction && this.delta > 15)) {
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
            _getTouchPos(e) {
                var key = this.isHorizontal() ? 'pageX' : 'pageY';
                return e.changedTouches ? e.changedTouches[0][key] : e[key];
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
