<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => 'K:/work/k.ai_website/grav-site/user/pages/01.home/modular.md',
    'modified' => 1774302830,
    'size' => 220,
    'data' => [
        'header' => [
            'title' => 'Landing Page',
            'menu' => 'Home',
            'onpage_menu' => false,
            'content' => [
                'items' => '@self.modular',
                'order' => [
                    'by' => 'custom',
                    'custom' => [
                        0 => '_description',
                        1 => '_teaser',
                        2 => '_news'
                    ]
                ]
            ]
        ],
        'frontmatter' => 'title: Landing Page
menu: Home
onpage_menu: false
content:
    items: \'@self.modular\'
    order:
        by: custom
        custom:
            - _description
            - _teaser
            - _news',
        'markdown' => ''
    ]
];
