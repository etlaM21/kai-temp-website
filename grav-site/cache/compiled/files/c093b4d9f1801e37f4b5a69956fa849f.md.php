<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => 'K:/work/k.ai_website/grav-site/user/pages/01.home/_news-events/news-feed.md',
    'modified' => 1773692948,
    'size' => 214,
    'data' => [
        'header' => [
            'title' => 'News & Events',
            'content' => [
                'items' => [
                    0 => [
                        '@page.children' => '/blog'
                    ]
                ],
                'limit' => 3,
                'order' => [
                    'by' => 'date',
                    'dir' => 'desc'
                ],
                'filter' => [
                    'category' => 'news'
                ]
            ]
        ],
        'frontmatter' => 'title: News & Events
content:
    items:
        - \'@page.children\': \'/blog\'
    limit: 3
    order:
        by: date
        dir: desc
    filter:
        category: news',
        'markdown' => '## Latest News & Events'
    ]
];
