# vue-swiper
Swiper component. Easy to use.

## Install
```
npm i vue-swiper -S
```

## Usage
```js
import VueSwiper from 'vue-swiper'
new Vue({
    el: 'body',
    components: {VueSwiper}
});
```
```html
<swiper v-ref:swiper :performance-mode="true">
    <div>Page 1</div>
    <div>Page 2</div>
</swiper>
```