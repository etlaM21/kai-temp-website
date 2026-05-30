<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => 'K:/work/k.ai_website/grav-site/user/pages/04.open-code/open-code.md',
    'modified' => 1773695864,
    'size' => 446,
    'data' => [
        'header' => [
            'title' => 'Open Code',
            'menu' => 'Open Code',
            'content_sections' => [
                'k_ai' => 'Details about the K.ai infrastructure or models.
',
                'code' => 'Repositories, GitHub links, and core codebase info.
',
                'documentation' => 'How to use, deploy, and contribute to the code.
'
            ],
            'content' => [
                'items' => [
                    0 => [
                        '@page.children' => '/blog'
                    ]
                ],
                'limit' => 5,
                'filter' => [
                    'category' => 'tutorial'
                ]
            ]
        ],
        'frontmatter' => 'title: Open Code
menu: Open Code
content_sections:
  k_ai: |
    Details about the K.ai infrastructure or models.
  code: |
    Repositories, GitHub links, and core codebase info.
  documentation: |
    How to use, deploy, and contribute to the code.
# This collection fetches Blog posts categorized as "tutorial"
content:
    items:
        - \'@page.children\': \'/blog\'
    limit: 5
    filter:
        category: tutorial',
        'markdown' => ''
    ]
];
