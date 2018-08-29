## paginantion
1. native

   ```javascript
   let page = new pagination({
       container: '',//容器类名/id
       current: 1,//当前页数
       pageSize: 10,//每页显示数据个数
       total: 0,//数据总数
       onChange: null,//当分页变化时的回调函数
       preText: '上一页',//下一页的替代文字，支持html
       nextText: '下一页',//上一页的替代文字，支持html
       hideOnSinglePage: true,//当只有一页时是否显示
       pageCount: 5,//页码按钮分数量，超过该值时会折叠，大于等于 5 且小于等于 21 的奇数
   })
   ```

2. vue

   `components/pagination/pagination.vue`

   |      props       |               说明               |   类型   | 默认  |
   | :--------------: | :------------------------------: | :------: | :---: |
   |     current      |       当前页数，支持.sync        |  Number  |   1   |
   |     pageSize     |         每页显示数据个数         |  Number  |  10   |
   |      total       |             数据总数             |  Number  |   0   |
   |      change      |      当分页变化时的回调函数      | Function | null  |
   |     preText      |         下一页的替代文字         |  String  |       |
   |     nextText     |         上一页的替代文字         |  String  |       |
   | hideOnSinglePage |       当只有一页时是否显示       | Boolean  | false |
   |    pageCount     | 页码按钮分数量，超过该值时会折叠 |  Number  |   5   |

   ​

3. react