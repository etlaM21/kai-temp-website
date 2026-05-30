<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => 'K:/work/k.ai_website/grav-site/user/pages/06.blog/blog.md',
    'modified' => 1773693116,
    'size' => 201,
    'data' => [
        'header' => [
            'title' => 'Blog',
            'menu' => 'Blog',
            'content' => [
                'items' => [
                    0 => '@self.children'
                ],
                'limit' => 10,
                'order' => [
                    'by' => 'date',
                    'dir' => 'desc'
                ],
                'pagination' => true
            ]
        ],
        'frontmatter' => 'title: Blog
menu: Blog
content:
    items:
        - \'@self.children\'
    limit: 10
    order:
        by: date
        dir: desc
    pagination: true',
        'markdown' => '# Updates, Tutorials, and News'
    ]
];
