/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) NPO baser foundation <https://baserfoundation.org/>
 *
 * @copyright     Copyright (c) NPO baser foundation
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       https://basercms.net/license/index.html MIT License
 */
$((function(){function e(e){switch($("#MailFieldType").val()){case"text":case"email":$("#RowSize").show(),$("#RowRows").hide(),$("#MailFieldRows").val(""),$("#RowMaxlength").show(),$("#RowSource").hide(),$("#MailFieldSource").val(""),$("#RowAutoConvert").show(),$("#RowSeparator").hide(),$("#MailFieldSeparator").val("");break;case"textarea":$("#RowSize").show(),$("#RowRows").show(),$("#RowMaxlength").hide(),$("#MailFieldMaxlength").val(""),$("#RowSource").hide(),$("#MailFieldSource").val(""),$("#RowAutoConvert").show(),$("#RowSeparator").hide(),$("#MailFieldSeparator").val("");break;case"radio":case"multi_check":$("#RowSize").hide(),$("#MailFieldSize").val(""),$("#RowRows").hide(),$("#MailFieldRows").val(""),$("#RowMaxlength").hide(),$("#MailFieldMaxlength").val(""),$("#RowSource").show(),$("#RowAutoConvert").hide(),$("#MailFieldAutoConvert").val(""),$("#RowSeparator").show();break;case"select":$("#RowSize").hide(),$("#MailFieldSize").val(""),$("#RowRows").hide(),$("#MailFieldRows").val(""),$("#RowMaxlength").hide(),$("#MailFieldMaxlength").val(""),$("#RowSource").show(),$("#RowAutoConvert").hide(),$("#MailFieldAutoConvert").val(""),$("#RowSeparator").hide(),$("#MailFieldSeparator").val("");break;case"pref":case"date_time_wareki":case"date_time_calender":case"file":$("#RowSize").hide(),$("#MailFieldSize").val(""),$("#RowRows").hide(),$("#MailFieldRows").val(""),$("#RowMaxlength").hide(),$("#MailFieldMaxlength").val(""),$("#RowSource").hide(),$("#MailFieldSource").val(""),$("#RowAutoConvert").hide(),$("#MailFieldAutoConvert").val(""),$("#RowSeparator").hide(),$("#MailFieldSeparator").val("");break;case"autozip":$("#RowSize").show(),$("#RowRows").hide(),$("#MailFieldRows").val(""),$("#RowMaxlength").show(),$("#RowSource").show(),$("#RowAutoConvert").show(),$("#MailFieldAutoConvert").val("CONVERT_HANKAKU"),$("#RowSeparator").hide(),$("#MailFieldSeparator").val("")}}$("#MailFieldType").change((function(){e($("#MailFieldType").val())})),$("#MailFieldName").change((function(){$("#MailFieldHead").val()||$("#MailFieldHead").val($("#MailFieldName").val())})),$("#BtnSave").click((function(){$.bcUtil.showLoader()})),e($("#MailFieldType").val())}));
//# sourceMappingURL=form.bundle.js.map