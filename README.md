[![npm](https://img.shields.io/npm/l/vue-swiper.svg?maxAge=2592000)](https://raw.githubusercontent.com/weilao/vue-swiper/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vue-swiper.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-swiper)
[![GitHub release](https://img.shields.io/github/release/weilao/vue-swiper.svg?maxAge=2592000)](https://github.com/weilao/vue-swiper/releases)
[![GitHub issues](https://img.shields.io/github/issues/weilao/vue-swiper.svg?maxAge=2592000)](https://github.com/weilao/vue-swiper/issues)
[![GitHub stars](https://img.shields.io/github/stars/weilao/vue-swiper.svg?style=social&label=Star&maxAge=2592000)](https://github.com/weilao/vue-swiper) 

[![NPM](https://nodei.co/npm/vue-swiper.png?downloads=true&downloadRank=true)](https://nodei.co/npm/vue-swiper/)

# vue-swiper
Swiper component. Easy to use.

## Examples
[basic demo](http://weilao.github.io/vue-swiper/demo)

[webpack ES2015 demo](http://www.webpackbin.com/4kbKGs97b)

## Install
```
npm i vue-swiper -S
```

## Usage

```js
import Vue from 'vue'
import Swiper from 'vue-swiper'

new Vue({
    el: 'body',
    components: {Swiper},
    methods: {
        onSlideChangeStart (currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd (currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        }
    }
});
```

```html
<swiper v-ref:swiper
        direction="horizontal"
        :mousewheel-control="true"
        :performance-mode="false"
        :pagination-visible="true"
        :pagination-clickable="true"
        :loop=“true”
        @slide-change-start="onSlideChangeStart"
        @slide-change-end="onSlideChangeEnd">
    <div>Page 1</div>
    <div>Page 2</div>
    <div>Page 3</div>
</swiper>
```

## Api
### Properties
| Name                 | Type      | Default      | Description                                                        |
|----------------------|-----------|--------------|--------------------------------------------------------------------|
| direction            | `String`  | `"vertical"` | Could be 'horizontal' or 'vertical' (for vertical slider).         |
| mousewheel-control   | `Boolean` | `true`       | Set to true to enable navigation through slides using mouse wheel. |
| pagination-visible   | `Boolean` | `false`      | Toggle (hide/true) pagination container visibility when click on Slider's container    |
| pagination-clickable | `Boolean` | `false`      | If true then clicking on pagination button will cause transition to appropriate slide. |
| performace-mode      | `Boolean` | `false`      | Disable advance effect for better performance.                     |
| loop                 | `Boolean` | `false`      | Set to true to enable continuous loop mode                         |
| ==================== | ========= | ============ | =================== |

### Methods
| Method            | Description              |
|-------------------|--------------------------|
| next()            | Go next page.            |
| prev()            | Go previous page.        |
| setPage(`Number`) | Set current page number. |

### Events
| Name                            | Parameters | Description                                                                                                                                                  |
|--------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| slide-change-start | `pageNumber`     | Fire in the beginning of animation to other slide (next or previous).                                                                                        |
| slide-change-end   | `pageNumber`     | Will be fired after animation to other slide (next or previous).                                                                                             |
| slide-revert-start | `pageNumber`     | Fire in the beginning of animation to revert slide (no change).                                                                                              |
| slide-revert-end   | `pageNumber`     | Will be fired after animation to revert slide (no change).                                                                                                   |
| slider-move        | `offset`         | Callback function, will be executed when user touch and move finger over Swiper and move it. Receives swiper instance and 'touchmove' event as an arguments. |
| ================== | ================ | ============================ |