# Docker

## 速度問題

MacでDockerを利用して開発する場合、ファイル読込の問題でブラウザ等の表示速度がかなり遅くなってしまう問題がある。

## 共有フォルダのマウント設定

ドキュメントルートである `/var/www/html/` ではなく、`/var/www/shared/` に共有フォルダをマウントすることにより高速化を図る


## ファイルの同期

共有フォルダ内のファイルを変更した場合、`/var/www/html/` 内に反映させなければ、変更が動作に反映されない。  
そのため、lsyncd を利用して `/var/www/shared/` と `/var/www/html/` を同期する。


lsyncd はコンテナ起動時に自動起動するので特に何もしなくてよい。