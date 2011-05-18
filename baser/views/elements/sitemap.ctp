<?php
/* SVN FILE: $Id$ */
/**
 * [PUBLISH] サイトマップ
 * 
 * カテゴリの階層構造を表現する為、再帰呼び出しを行う
 * $baser->sitemap() で呼び出す
 * 
 * PHP versions 4 and 5
 *
 * BaserCMS :  Based Website Development Project <http://basercms.net>
 * Copyright 2008 - 2011, Catchup, Inc.
 *								9-5 nagao 3-chome, fukuoka-shi 
 *								fukuoka, Japan 814-0123
 *
 * @copyright		Copyright 2008 - 2011, Catchup, Inc.
 * @link			http://basercms.net BaserCMS Project
 * @package			baser.views
 * @since			Baser v 0.1.0
 * @version			$Revision$
 * @modifiedby		$LastChangedBy$
 * @lastmodified	$Date$
 * @license			http://basercms.net/license/index.html
 */
if(!isset($recursive)) {
	$recursive = 1;
}
?>
<ul class="sitemap ul-level-<?php echo $recursive ?>">
<?php if(isset($pageList['pageCategories'])): ?>
	<?php foreach($pageList['pageCategories'] as $pageCategories): ?>
	<li class="sitemap-page li-level-<?php echo $recursive ?>">
		<?php if(!empty($pageCategories['PageCategory']['url'])): ?>
			<?php $baser->link($pageCategories['PageCategory']['title'], $pageCategories['PageCategory']['url']) ?>
		<?php else: ?>
			<?php echo $pageCategories['PageCategory']['title'] ?>
		<?php endif ?>
		<?php if(isset($pageCategories['children'])): ?>
			<?php $baser->element('sitemap', array('pageList' => $pageCategories['children'], 'recursive' => $recursive+1)) ?>
		<?php endif ?>
	</li>
	<?php endforeach ?>
<?php endif ?>
<?php if(isset($pageList['pages'])): ?>
	<?php foreach($pageList['pages'] as $page): ?>
		<?php if($page['Page']['title']): ?>
	<li class="sitemap-category li-level-<?php echo $recursive ?>"><?php $baser->link($page['Page']['title'], $page['Page']['url']) ?></li>
		<?php endif ?>
	<?php endforeach; ?>
<?php endif ?>
</ul>