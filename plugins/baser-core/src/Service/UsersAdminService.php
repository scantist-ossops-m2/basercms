<?php
/**
 * baserCMS :  Based Website Development Project <https://basercms.net>
 * Copyright (c) NPO baser foundation <https://baserfoundation.org/>
 *
 * @copyright     Copyright (c) NPO baser foundation
 * @link          https://basercms.net baserCMS Project
 * @since         5.0.0
 * @license       https://basercms.net/license/index.html MIT License
 */

namespace BaserCore\Service;

use BaserCore\Utility\BcUtil;
use BaserCore\Annotation\NoTodo;
use BaserCore\Annotation\Checked;
use BaserCore\Annotation\UnitTest;

/**
 * UsersAdminService
 */
class UsersAdminService extends UsersService implements UsersAdminServiceInterface
{

    /**
     * ログインユーザー自身のIDか確認
     * @param int $id
     * @return bool
     * @checked
     * @noTodo
     * @unitTest
     */
    public function isSelf(?int $id): bool
    {
        $loginUser = BcUtil::loginUser();
        return (!empty($id) && !empty($loginUser->id) && $loginUser->id === $id);
    }

    /**
     * 更新ができるかどうか
     * @param int $id
     * @return bool
     * @checked
     * @noTodo
     * @unitTest
     */
    public function isEditable(?int $id): bool
    {
        $user = BcUtil::loginUser();
        if (empty($id) || empty($user)) {
            return false;
        } else {
            return ($this->isSelf($id) || $user->isAdmin());
        }
    }

    /**
     * ユーザーグループが更新可能かどうか
     * @param $id
     * @return bool
     * @checked
     * @noTodo
     * @unitTest
     */
    public function isUserGroupEditable(?int $id): bool
    {
        return ($id === null || $this->isEditable($id));
    }

    /**
     * 削除ができるかどうか
     * @param int $id
     * @return bool
     * @checked
     * @noTodo
     * @unitTest
     */
    public function isDeletable(?int $id): bool
    {
        $user = BcUtil::loginUser();
        if (empty($id) || empty($user)) {
            return false;
        }
        return !$this->isSelf($id);
    }

    /**
     * 編集画面に必要なデータを取得する
     * @param int $id
     * @return array
     * @checked
     * @noTodo
     * @unitTest
     */
    public function getViewVarsForEdit(?int $id): array
    {
        return [
            'userGroupList' => $this->getList(),
            'isUserGroupEditable' => $this->isUserGroupEditable($id),
            'isDeletable' => $this->isDeletable($id)
        ];
    }

    /**
     * 新規登録画面にに必要なデータを取得する
     * @return array
     * @checked
     * @noTodo
     * @unitTest
     */
    public function getViewVarsForAdd(): array
    {
        return [
            'userGroupList' => $this->getList(),
            'isUserGroupEditable' => $this->isUserGroupEditable(null),
        ];
    }

}