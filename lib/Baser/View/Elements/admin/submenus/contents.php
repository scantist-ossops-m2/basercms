<?php
/**
 * [ADMIN] ダッシュボードメニュー
 *
 * baserCMS :  Based Website Development Project <http://basercms.net>
 * Copyright 2008 - 2014, baserCMS Users Community <http://sites.google.com/site/baserusers/>
 *
 * @copyright		Copyright 2008 - 2014, baserCMS Users Community
 * @link			http://basercms.net baserCMS Project
 * @package			Baser.View
 * @since			baserCMS v 0.1.0
 * @license			http://basercms.net/license/index.html
 */
?>


<tr>
	<th>検索インデックスメニュー</th>
	<td>
		<ul class="cleafix">
			<li><?php $this->BcBaser->link('コンテンツ一覧', array('controller' => 'contents', 'action' => 'index')) ?></li>
			<li><?php $this->BcBaser->link('コンテンツ登録', array('controller' => 'contents', 'action' => 'add')) ?></li>
		</ul>
	</td>
</tr>
