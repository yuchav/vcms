(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-35b2"],{"/V8U":function(e,t,l){"use strict";l.r(t);var n=l("rY9o"),a={filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},data:function(){return{formInline:{user:"",region:""},list:null,listLoading:!0,centerDialogVisible:!1,form:{}}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(n.a)(this.listQuery).then(function(t){e.list=[{},{}],e.listLoading=!1})}}},i=l("KHd+"),r=Object(i.a)(a,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:""}},[l("el-input",{attrs:{placeholder:"审批人"},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}})],1),e._v(" "),l("el-form-item",{attrs:{label:""}},[l("el-select",{attrs:{placeholder:"活动区域"},model:{value:e.formInline.region,callback:function(t){e.$set(e.formInline,"region",t)},expression:"formInline.region"}},[l("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),l("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary",icon:"el-icon-search"}})],1)],1),e._v(" "),l("hr"),e._v(" "),l("br"),e._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"min-height":"500px"},attrs:{data:e.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("a",{on:{click:function(l){e.$router.push("./detail/"+t.$index)}}},[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"",width:"110"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(t){e.centerDialogVisible=!0}}},[e._v("编辑")])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"Name"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.name)+"\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"Author",width:"110",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.author))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"Pageviews",width:"110",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.pageviews)+"\n      ")]}}])}),e._v(" "),l("el-table-column",{attrs:{"class-name":"status-col",label:"Status",width:"110",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-tag",[e._v(e._s("OK"))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",prop:"created_at",label:"Display_time",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("i",{staticClass:"el-icon-time"}),e._v(" "),l("span",[e._v(e._s(t.row.display_time))])]}}])})],1),e._v(" "),l("div",{staticClass:"mt-20"},[l("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:1e3}})],1),e._v(" "),l("el-dialog",{attrs:{title:"提示",visible:e.centerDialogVisible},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"90px","label-position":"right"}},[l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"价格"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"}},[e._v("Create")]),e._v(" "),l("el-button",{on:{click:function(t){e.centerDialogVisible=!1}}},[e._v("Cancel")])],1)],1)],1)],1)},[],!1,null,null,null);r.options.__file="list.vue";t.default=r.exports},rY9o:function(e,t,l){"use strict";l.d(t,"a",function(){return a});var n=l("t3Un");function a(e){return Object(n.a)({url:"/",method:"get",params:e})}}}]);