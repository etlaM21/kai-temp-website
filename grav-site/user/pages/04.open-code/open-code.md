---
title: Open Code
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
        - '@page.children': '/blog'
    limit: 5
    filter:
        category: tutorial
---