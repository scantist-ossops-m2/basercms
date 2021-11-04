<?php
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) baserCMS User Community <https://basercms.net/community/>
 *
 * @copyright     Copyright (c) baserCMS User Community
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       http://basercms.net/license/index.html MIT License
 */

namespace BaserCore\Event;

use Cake\Event\Event;
use Cake\Core\Configure;
use Cake\Routing\Router;
use Cake\Utility\Inflector;
use BaserCore\Utility\BcUtil;
use BaserCore\View\BcAdminAppView;
use BaserCore\Event\BcEventListener;
use BaserCore\Utility\BcContainerTrait;
use BaserCore\Service\PermissionServiceInterface;
use BaserCore\Annotation\NoTodo;
use BaserCore\Annotation\Checked;
use BaserCore\Annotation\UnitTest;
/**
 * Class BcContentsEventListener
 *
 * baserCMS Contents Event Listeners
 *
 * 階層コンテンツと連携したフォーム画面を表示する為のイベント
 * BcContentsComponent でコントロールされる
 *
 * @package Baser.Event
 */
class BcContentsEventListener extends BcEventListener
{

    /**
     * BcContainerTrait
     */
    use BcContainerTrait;

    /**
     * Implemented Events
     *
     * @return array
     * @checked
     * @noTodo
     * @unitTest
     */
    public function implementedEvents(): array
    {
        return [
            'Helper.Form.beforeCreate' => ['callable' => 'formBeforeCreate'],
            'Helper.Form.afterCreate' => ['callable' => 'formAfterCreate'],
            'Helper.Form.afterSubmit' => ['callable' => 'formAfterSubmit']
        ];
    }

    /**
     * Form Before Create
     *
     * @param Event $event
     * @checked
     * @noTodo
     * @unitTest
     */
    public function formBeforeCreate(Event $event)
    {
        if (!BcUtil::isAdminSystem()) {
            return;
        }
        $event->setData('options', ['type' => 'file']);
    }

    /**
     * Form After Create
     *
     * @param Event $event
     * @return string
     * @checked
     * @noTodo
     * @unitTest
     */
    public function formAfterCreate(Event $event)
    {
        if (!BcUtil::isAdminSystem()) {
            return;
        }
        $View = $event->getSubject();
        if ($event->getData('id') == 'FavoriteAdminEditForm' || $event->getData('id') == 'PermissionAdminEditForm') {
            return;
        }
        if (!preg_match('/(AdminEditForm|AdminEditAliasForm)$/', $event->getData('id'))) {
            return;
        }
        return $event->getData('out') . "\n" . $View->element('content_fields');
    }

    /**
     * Form After Submit
     *
     * フォームの保存ボタンの前後に、一覧、プレビュー、削除ボタン、その他のエレメントを配置する
     * プレビューを配置する場合は、コンテンツの設定にて、preview を true にする
     *
     * @param Event $event
     * @return string
     * @checked
     * @unitTest
     */
    public function formAfterSubmit(Event $event)
    {
        $preOut = $event->getData('out');

        if (!BcUtil::isAdminSystem()) {
            return $preOut;
        }
        /**  @var BcAdminAppView $View*/
        $View = $event->getSubject();
        $data = $View->getRequest()->getData();
        if (!preg_match('/(AdminEditForm|AdminEditAliasForm)$/', $event->getData('id'))) {
            return $preOut;
        }
        $content = $data['Content'] ?? array_column($data, 'content')[0]; // Contentエンティティ or 関連エンティティ
        $setting = Configure::read('BcContents.items.' . $content['plugin'] . '.' . $content['type']);
        $isAvailablePreview = (!empty($setting['preview']) && $content['type'] != 'ContentFolder');
        $path = BcUtil::getPrefix() . "/" . Inflector::dasherize($event->getSubject()->getPlugin()) . '/contents/delete';
        $isAvailableDelete = true;
        // TODO: user取得まだなので、一旦falseでform先にする
        // $isAvailableDelete = (empty($content['site_root']) && $this->getService(PermissionServiceInterface::class)->check($path, $View->get('user')->user_group));

        $newOut = $event->setData('out', implode("\n", [
            $View->element('content_options'),
            $View->element('content_actions', [
                'isAvailablePreview' => $isAvailablePreview,
                'isAvailableDelete' => $isAvailableDelete,
                'currentAction' => $preOut,
                'isAlias' => ($content['alias_id'])
            ]),
            $View->element('content_related'),
            $View->element('content_info')
        ]));
        return $event->getData('out');
    }

}