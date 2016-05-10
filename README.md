# vue-swiper
Swiper component. Easy to use.

## Install
```
npm i vue-swiper -S
```

## Usage
```js
import Swiper from 'vue-swiper'
new Vue({
    el: 'body',
    components: {Swiper}
});
```
```html
<swiper v-ref:swiper :performance-mode="true">
    <div>Page 1</div>
    <div>Page 2</div>
</swiper>
```

## Api
### Properties

#### performace-mode `Boolean`

Disable advance effect for better performance, defaults to `false`.

### Methods
#### next()
Go next page.

#### prev()
Go previous page.

#### setPage(`Number`)
Set current page number.

### Events
// TODO