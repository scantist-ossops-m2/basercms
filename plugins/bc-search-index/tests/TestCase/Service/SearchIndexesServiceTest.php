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

namespace BcSearchIndex\Test\TestCase\Service;

use BaserCore\Model\Table\ContentsTable;
use BcSearchIndex\Model\Table\SearchIndexesTable;
use BcSearchIndex\Service\SearchIndexesService;
use BaserCore\TestSuite\BcTestCase;
use BcSearchIndex\Test\Factory\SearchIndexFactory;
use BcSearchIndex\Test\Scenario\Service\SearchIndexesServiceScenario;
use CakephpFixtureFactories\Scenario\ScenarioAwareTrait;

/**
 * Class SearchIndexesServiceTest
 * @property SearchIndexesService $SearchIndexesService
 * @property SearchIndexesTable $SearchIndexes
 * @property ContentsTable $Contents
 */
class SearchIndexesServiceTest extends BcTestCase
{

    /**
     * Trait
     */
    use ScenarioAwareTrait;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'plugin.BaserCore.Factory/Sites',
        'plugin.BaserCore.Factory/Users',
        'plugin.BaserCore.Factory/UsersUserGroups',
        'plugin.BaserCore.Factory/UserGroups',
        'plugin.BaserCore.Factory/Contents',
        'plugin.BaserCore.Factory/ContentFolders',
        'plugin.BaserCore.Factory/Pages',
        'plugin.BaserCore.Factory/SiteConfigs',
        'plugin.BaserCore.Factory/SearchIndexes',
    ];

    /**
     * Set Up
     *
     * @return void
     */
    public function setUp(): void
    {
        $this->setFixtureTruncate();
        parent::setUp();
        $this->SearchIndexesService = new SearchIndexesService();
    }

    /**
     * Tear Down
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->SearchIndexesService);
        parent::tearDown();
    }

    /**
     * @test construct
     * @return void
     */
    public function testConstruct(){
        $this->assertTrue(isset($this->SearchIndexesService->SearchIndexes));
    }

    /**
     * Test get
     *
     * @return void
     */
    public function testGet()
    {
        SearchIndexFactory::make(['id' => 1, 'url' => '/about'])->persist();
        $searchIndex = $this->SearchIndexesService->get(1);
        $this->assertEquals('/about', $searchIndex->url);
    }

	/**
	 * 検索インデックスを再構築する
	 */
	public function testReconstruct()
	{
	    $this->loadFixtureScenario(SearchIndexesServiceScenario::class);
		$this->loginAdmin($this->getRequest());
		// 全ページ再構築
		$this->SearchIndexesService->reconstruct();
		$searchIndexesTable = $this->getTableLocator()->get('SearchIndexes');
		$this->assertEquals(3, $searchIndexesTable->find()->count());
		// 指定ディレクトリ配下再構築
		$contentsTable = $this->getTableLocator()->get('Contents');
		$content = $contentsTable->find()->where(['url' => '/service/'])->first();
		$this->SearchIndexesService->reconstruct($content->id);
		$this->assertEquals(2, $searchIndexesTable->find()->where(['url LIKE' => '/service/%'])->count());
	}

    /**
     * test changePriority
     * @return void
     */
    public function testChangePriority()
    {
        SearchIndexFactory::make(1)
            ->setField('priority', 1)
            ->setField('status', 1)
            ->persist();
        $data = $this->SearchIndexesService->getIndex([])->first();
        $expected = 10;
        $rs = $this->SearchIndexesService->changePriority($data, $expected);
        $this->assertEquals($expected, $rs['priority']);
    }

    /**
     * test delete
     * @return void
     */
    public function testDelete()
    {
        SearchIndexFactory::make(['id' => 1, 'title' => 'test data delete', 'type' => 'admin', 'site_id' => 1], 1)->persist();

        $data = $this->SearchIndexesService->get(1);
        $rs = $this->SearchIndexesService->delete(1);
        $this->assertTrue($rs);

        $searchIndexes = $this->SearchIndexesService->getIndex(['site_id' => $data['site_id'], 'keyword' => $data['title']])->first();
        $this->assertNull($searchIndexes);
    }
    /*
     * test getIndex
     * @return void
     */
    public function testGetIndex()
    {
        SearchIndexFactory::make(['title' => 'test data', 'type' => 'admin', 'site_id' => 1], 2)->persist();

        $rs = $this->SearchIndexesService->getIndex(['limit' => 1]);
        $this->assertEquals(1, $rs->all()->count());

        $rs = $this->SearchIndexesService->getIndex(['type' => 'admin', 'site_id' => 1])->first();
        $this->assertEquals('test data', $rs['title']);
    }

    /**
     * test batch
     * @return void
     */
    public function testBatch()
    {
        SearchIndexFactory::make(['id' => 1, 'title' => 'test data Batch 1', 'type' => 'admin', 'site_id' => 5], 1)->persist();
        SearchIndexFactory::make(['id' => 2, 'title' => 'test data Batch 2', 'type' => 'admin', 'site_id' => 5], 1)->persist();
        SearchIndexFactory::make(['id' => 3, 'title' => 'test data Batch 3', 'type' => 'admin', 'site_id' => 5], 1)->persist();

        $this->SearchIndexesService->batch('delete', [1, 2, 3]);

        $searchIndexes = $this->SearchIndexesService->getIndex(['site_id' => 5])->all();
        $this->assertEquals(0, count($searchIndexes));
    }

    /**
     * Test createIndexConditions
     * @dataProvider createIndexConditionsDataProvider
     */
    public function testCreateIndexConditions($isLoadScenario, $options, $expected)
    {
        if ($isLoadScenario) {
            $this->loadFixtureScenario(SearchIndexesServiceScenario::class);
        }
        $result = $this->execPrivateMethod($this->SearchIndexesService, "createIndexConditions", [$options]);
        $this->assertEquals($expected, $result);
    }

    /**
     * createIndexConditionsテストのデータプロバイダ
     * @return array
     */
    public function createIndexConditionsDataProvider(): array
    {
        return [
            // 空配列の結果テスト
            [false, [], []],
            [false, ['priority_123' => 1], []],
            // keyword(q): 検索キーワード
            [false, ['keyword' => 'test'], [
                'SearchIndexes.site_id' => 1,
                'and' => [0 => ['or' => [0 => ['SearchIndexes.title LIKE' => '%test%'], 1 => ['SearchIndexes.detail LIKE' => '%test%']]]]
            ]],
            [false, ['q' => 'test'], [
                'SearchIndexes.site_id' => 1,
                'and' => [0 => ['or' => [0 => ['SearchIndexes.title LIKE' => '%test%'], 1 => ['SearchIndexes.detail LIKE' => '%test%']]]]
            ]],
            // site_id(s): サイトID
            [false, ['site_id' => 2], ['SearchIndexes.site_id' => 2]],
            [false, ['s' => 2], ['SearchIndexes.site_id' => 2]],
            // content_id(c): コンテンツID
            [false, ['content_id' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.content_id' => 2]],
            [false, ['c' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.content_id' => 2]],
            // content_filter_id(cf): コンテンツフィルダーID
            [false, ['content_filter_id' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.content_filter_id' => 2]],
            [false, ['cf' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.content_filter_id' => 2]],
            // type: コンテンツタイプ
            [false, ['type' => 'ページ'], ['SearchIndexes.site_id' => 1, 'SearchIndexes.type' => 'ページ']],
            // model(m): モデル名（エンティティ名）
            [false, ['model' => 'Page'], ['SearchIndexes.site_id' => 1, 'SearchIndexes.model' => 'Page']],
            [false, ['m' => 'Page'], ['SearchIndexes.site_id' => 1, 'SearchIndexes.model' => 'Page']],
            // priority: 優先度
            [false, ['priority' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.priority' => 2]],
            // folder_id(f): フォルダーID
            [true, ['folder_id' => 2], ['SearchIndexes.site_id' => 1, 'SearchIndexes.rght <' => 3, 'SearchIndexes.lft >' => 2]],
        ];
    }
}
