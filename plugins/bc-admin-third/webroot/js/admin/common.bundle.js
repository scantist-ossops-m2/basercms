!function(e){function t(t){for(var a,c,i=t[0],s=t[1],l=t[2],u=0,h=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&h.push(r[c][0]),r[c]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);for(d&&d(t);h.length;)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={0:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=s;o.push([0,7]),n()}([function(e,t,n){"use strict";n.r(t);n(1),n(5),n(6),n(7),n(8),n(9),n(10)},,,,,function(e,t){
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */
!function(e){e.baseUrl=function(){return e("#AdminScript").attr("data-baseUrl")}}(jQuery)},function(e,t){
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */
!function(e){e.bcUtil={disabledHideMessage:!1,baseUrl:null,adminPrefix:null,init:function(t){var n=e("#AdminScript");e.bcUtil.baseUrl=n.attr("data-baseUrl"),e.bcUtil.adminPrefix=n.attr("data-adminPrefix"),void 0!==t.baseUrl&&(e.bcUtil.baseUrl=t.baseUrl),void 0!==t.adminPrefix&&(e.bcUtil.adminPrefix=t.adminPrefix)},showAlertMessage:function(t){e.bcUtil.hideMessage(),e("#BcSystemMessage").removeClass("notice-messge alert-message").addClass("alert-message").html(t),e("#BcMessageBox").fadeIn(500)},showNoticeMessage:function(t){e.bcUtil.hideMessage(),e("#BcSystemMessage").removeClass("notice-messge alert-message").addClass("notice-message").html(t),e("#BcMessageBox").fadeIn(500)},hideMessage:function(){e.bcUtil.disabledHideMessage||(e("#BcMessageBox").fadeOut(200),e("#AlertMessage").fadeOut(200),e("#MessageBox").fadeOut(200))},showLoader:function(t,n,a){switch((null==t||"none"!=t&&null==n)&&(t="over"),t){case"over":e("#Waiting").show();break;case"inner":var r=e("<div>").css({"text-align":"center"}).attr("id",a),o=e("<img>").attr("src",e.baseUrl+"/img/admin/ajax-loader.gif");r.html(o),e(n).html(r);break;case"after":o=e("<img>").attr("src",e.baseUrl+"/img/admin/ajax-loader-s.gif").attr("id",a);e(n).after(o);break;case"target":e(n).show()}},hideLoader:function(t,n,a){switch((null==t||"none"!=t&&null==n)&&(t="over"),t){case"over":e("#Waiting").hide();break;case"inner":case"after":e("#"+a).remove();break;case"target":e(n).show()}},ajax:function(t,n,a){var r,o,c;a||(a={});var i=!0;void 0!==a.loaderType&&(r=a.loaderType,delete a.loaderType),void 0!==a.loaderSelector&&(o=a.loaderSelector,delete a.loaderSelector,c=o.replace(/\./g,"").replace(/#/g,"").replace(/\s/g,"")+"loaderkey"),void 0!==a.hideLoader&&(i=a.hideLoader,delete a.loaderType);var s={url:t,type:"POST",dataType:"html",beforeSend:function(){e.bcUtil.showLoader(r,o,c)},complete:function(){i&&e.bcUtil.hideLoader(r,o,c)},error:function(t,n,a){e.bcUtil.showAjaxError("処理に失敗しました。",t,a)},success:n};return a&&e.extend(s,a),e.ajax(s)},showAjaxError:function(t,n,a){var r="";void 0!==n&&n.status&&(r="<br />("+n.status+") "),void 0!==n&&n.responseText?r+=n.responseText:void 0!==a&&(r+=a),e.bcUtil.showAlertMessage(t+r)}}}(jQuery)},function(e,t){
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */
!function(e){e.bcToken={key:null,requested:!1,requesting:!1,url:null,defaultUrl:"/baser/baser-core/bc_form/get_token?requestview=false",init:function(){this.setTokenUrl()},check:function(t,n){if(this.requesting)var a=setInterval((function(){e.bcToken.requesting||(clearInterval(a),t&&e.bcToken.execCallback(t,n))}),100);else this.key?t&&this.execCallback(t,n):this.update(n).done((function(){t&&e.bcToken.execCallback(t,n)}))},execCallback:function(t,n){var a={useUpdate:!0};n=void 0!==n?e.extend(a,n):a;var r=t();n.useUpdate&&(n.hideLoader=!0,n.loaderType="none",r?r.always((function(){e.bcToken.update(n)})):this.update(n))},update:function(t){var n={type:"GET"};return t=void 0!==t?e.extend(n,t):n,this.requesting=!0,e.bcUtil.ajax(e.baseUrl()+this.url,(function(t){e.bcToken.key=t,e.bcToken.requesting=!1,e('input[name="_csrfToken"]').val(e.bcToken.key)}),e.extend(!0,{},t))},getForm:function(t,n,a){var r=e("<form/>");r.attr("action",t).attr("method","post"),this.check((function(){r.append(e.bcToken.getHiddenToken()),n(r)}),a)},getHiddenToken:function(){return e('<input name="_csrfToken" type="hidden">').val(this.key)},submitToken:function(t){this.getForm(t,(function(t){e("body").append(t),t.submit()}),{useUpdate:!1,hideLoader:!1})},replaceLinkToSubmitToken:function(t){e(t).each((function(){if(e(this).attr("onclick")){var t=e(this).attr("onclick").match(/if \(confirm\("(.+?)"\)/);t&&(e(this).attr("data-confirm-message",t[1]),e(this).get(0).onclick="",e(this).removeAttr("onclick"))}})),e(t).click((function(){if(e(this).attr("data-confirm-message")){var t=e(this).attr("data-confirm-message");if(t=JSON.parse('"'+t+'"').replace(/\\n/g,"\n"),!confirm(t))return!1}return e.bcToken.submitToken(e(this).attr("href")),!1}))},setTokenUrl:function(e){return this.url=null!=e?e:this.defaultUrl,this}}}(jQuery)},function(e,t){
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */
!function(e){e.bcSortable={updateSortUrl:null,init:function(t){this.updateSortUrl=t.updateSortUrl;var n=e(".sort-handle"),a=e(".sort-table");n.unbind();try{e(a).sortable("destroy")}catch(e){}var r={scroll:!0,items:"tr.sortable",opacity:1,zIndex:55,containment:"body",tolerance:"pointer",distance:5,cursor:"move",handle:".sort-handle",placeholder:"ui-sortable-placeholder",revert:100,start:this.sortStartHandler,update:this.sortUpdateHandler};n.css("cursor","move"),a.sortable(r),n.click((function(e){e.stopPropagation()}))},sortStartHandler:function(t,n){e(".ui-sortable-placeholder").css("height",n.item.height())},sortUpdateHandler:function(t,n){var a=n.item,r=e(".sort-table tr.sortable").index(a)+1-a.attr("id").replace("Row",""),o=e(".sort-table"),c=e("#AlertMessage"),i=e("<form/>").hide(),s=e("<input/>").attr("type","hidden").attr("name","Sort[id]").val(a.find(".id").val()),l=e("<input/>").attr("type","hidden").attr("name","Sort[offset]").val(r);i.append(s).append(l),e.bcToken.check((function(){i.append(e.bcToken.getHiddenToken());var t=i.serialize();return i.find('input[name="_csrfToken"]').remove(),e.ajax({url:e.bcSortable.updateSortUrl,type:"POST",data:t,dataType:"text",beforeSend:function(){c.fadeOut(200),e("#flashMessage").fadeOut(200),e.bcUtil.showLoader()},success:function(t){"1"===t?o.find("tr.sortable").each((function(t,n){e(this).attr("id","Row"+(t+1))})):(o.sortable("cancel"),c.html(bcI18n.commonSortSaveFailedMessage),c.fadeIn(500))},error:function(e,t,n){var a="";a=404===e.status?"<br>"+bcI18n.commonNotFoundProgramMessage:e.responseText?"<br>"+e.responseText:"<br>"+n,o.sortable("cancel"),c.html(bcI18n.commonSortSaveFailedMessage+"("+e.status+")"+a),c.fadeIn(500)},complete:function(){e.bcUtil.hideLoader()}})}),{hideLoader:!1})}}}(jQuery)},function(e,t){function n(e){void 0!==e.attr("checked")?$(e).parent().parent().addClass("selectedrow"):$(e).parent().parent().removeClass("selectedrow")}
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS Users Community <https://basercms.net/community/>
 *
 * @copyright       Copyright (c) baserCMS Users Community
 * @link            https://basercms.net baserCMS Project
 * @since           baserCMS v 2.0.0
 * @license         https://basercms.net/license/index.html
 */
!function(e){function t(){var t=e.bcBatch.config;e(t.methodSelect).val()?e(t.executeButton).removeAttr("disabled"):e(t.executeButton).prop("disabled",!0)}e.bcBatch={config:{batchUrl:"",listTable:"#ListTable",executeButton:"#BtnApplyBatch",methodSelect:"#listtool-batch",checkAll:"#listtool-checkall",targetCheckbox:".batch-targets",alertBox:"#AlertMessage",loader:"#Waiting",flashBox:"#flashMessage"},init:function(t){return t&&e.extend(e.bcBatch.config,t),this.initList(),this},initList:function(){var a=e.bcBatch.config;e(e.bcBatch.config.executeButton).unbind(),e(e.bcBatch.config.methodSelect).unbind(),e(a.listTable+" "+a.targetCheckbox).unbind(),e(a.checkAll).unbind(),e(e.bcBatch.config.executeButton).click((function(){if(!e(a.targetCheckbox+":checked").length)return alert(bcI18n.commonSelectDataFailedMessage),!1;e(a.methodSelect).val();if(!confirm(bcI18n.batchConfirmMessage))return!1;var t=e("<form/>").append(e(a.methodSelect).clone().val(e(a.methodSelect).val()));return e(a.targetCheckbox+":checked").each((function(){var n=e(this).attr("name").replace(/ListTool\[batch_targets\]\[([0-9]*)\]/,"$1");n&&t.append(e('<input name="ListTool[batch_targets][]" type="hidden">').val(n))})),e.bcToken.check((function(){return t.append(e('<input name="_csrfToken" type="hidden">').val(e.bcToken.key)),e.ajax({url:a.batchUrl,type:"POST",data:t.serialize(),dataType:"text",beforeSend:function(){e(a.alertBox).fadeOut(200),e(a.flashBox).parent().fadeOut(200),e.bcUtil.showLoader()},success:function(n){n?location.reload():(e.bcToken.key=null,e.bcUtil.hideLoader(),t.remove(),e(a.alertBox).html(bcI18n.commonBatchExecFailedMessage),e(a.alertBox).fadeIn(500))},error:function(n,r,o){e.bcToken.key=null;var c="";c=404===n.status?"<br>"+bcI18n.commonNotFoundProgramMessage:n.responseText?"<br>"+n.responseText:"<br>"+o,e.bcUtil.hideLoader(),t.remove(),e(a.alertBox).html(bcI18n.commonBatchExecFailedMessage+"("+n.status+")"+c),e(a.alertBox).fadeIn(500)}})}),{useUpdate:!1,hideLoader:!1}),!1})),e(e.bcBatch.config.methodSelect).change(t),e(a.listTable+" tbody td").click((function(){var t=e(this).parent().find(a.targetCheckbox);return t.prop("checked")?t.prop("checked",!1):t.prop("checked",!0),n(t),!1})),e(a.listTable+" tbody td a").click((function(t){"colorbox"!==e(this).attr("rel")&&t.stopPropagation()})),e(a.listTable+" "+a.targetCheckbox).click((function(e){e.stopPropagation()})),e(a.listTable+" "+a.targetCheckbox).change((function(){n(e(this))})),e(a.checkAll).change((function(){e(this).prop("checked")?e(a.listTable+" "+a.targetCheckbox).prop("checked",!0):e(a.listTable+" "+a.targetCheckbox).prop("checked",!1),e.bcBatch.initRowSelected()})),t(),e.bcBatch.initRowSelected()},initRowSelected:function(){var t=e.bcBatch.config;e(t.listTable+" "+t.targetCheckbox).each((function(){e(this).prop("checked")?e(this).parent().parent().addClass("selectedrow"):e(this).parent().parent().removeClass("selectedrow")}))}}}(jQuery)},function(e,t){
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */
window.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector('[data-js-tmpl="AdminMenu"]'),t=document.getElementById("AdminMenu"),n=null;try{n=JSON.parse(t?t.textContent:"{}")}catch(e){window.console&&console.warn("管理メニューのデータが破損しています（JSONデータが不正です）")}if(e&&n&&n.menuList&&n.menuList.length){var a=[],r=[];n.menuList.forEach((function(e,t){"system"===e.type?r.push(e):a.push(e)})),e.hidden=!1;var o=r.some((function(e){return e.current||e.expanded})),c=new Vue({el:e,data:{systemExpanded:o,baseURL:$.baseUrl(),currentSiteId:n.currentSiteId,contentList:a,isSystemSettingPage:o,systemList:r},methods:{openSystem:function(){c.systemExpanded=!c.systemExpanded}}})}else window.console&&console.warn("データが空のため、管理メニューは表示されませんでした")}))}]);
//# sourceMappingURL=common.bundle.js.map