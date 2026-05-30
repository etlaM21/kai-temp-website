<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modular.html.twig */
class __TwigTemplate_fd0264ca9b344530e59e6538b999532f954d36435e75485991ab183b7f8dfb89 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "partials/base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $this->parent = $this->loadTemplate("partials/base.html.twig", "modular.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = [])
    {
        // line 4
        echo "        ";
        // line 5
        echo "        ";
        // line 6
        echo "        
        ";
        // line 7
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["page"] ?? null), "collection", [], "method"));
        foreach ($context['_seq'] as $context["_key"] => $context["module"]) {
            // line 8
            echo "            <div id=\"";
            echo twig_escape_filter($this->env, twig_replace_filter(twig_lower_filter($this->env, (($this->getAttribute($context["module"], "menu", [], "any", true, true)) ? (_twig_default_filter($this->getAttribute($context["module"], "menu", []), $this->getAttribute($context["module"], "title", []))) : ($this->getAttribute($context["module"], "title", [])))), [" " => "-"]), "html", null, true);
            echo "\" class=\"module-section ";
            if (($this->getAttribute($context["module"], "title", []) == "Minimal Description")) {
                // line 9
                echo "        smaller
    ";
            }
            // line 10
            echo "\">
                ";
            // line 11
            echo $this->getAttribute($context["module"], "content", []);
            echo "
            </div>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['module'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
    }

    public function getTemplateName()
    {
        return "modular.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  65 => 11,  62 => 10,  58 => 9,  53 => 8,  49 => 7,  46 => 6,  44 => 5,  42 => 4,  39 => 3,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'partials/base.html.twig' %}

{% block content %}
        {# This loop goes through the _teaser, _description, and _news-events folders #}
        {# and automatically renders them using the templates inside templates/modular/ #}
        
        {% for module in page.collection() %}
            <div id=\"{{ module.menu|default(module.title)|lower|replace({' ': '-'}) }}\" class=\"module-section {% if module.title == 'Minimal Description' %}
        smaller
    {% endif %}\">
                {{ module.content|raw }}
            </div>
        {% endfor %}
{% endblock %}", "modular.html.twig", "K:\\work\\k.ai_website\\grav-site\\user\\themes\\kaspar-2026\\templates\\modular.html.twig");
    }
}
