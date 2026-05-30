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

/* partials/navigation.html.twig */
class __TwigTemplate_1ef5f6f38c1087245a9cffdff6b367c62baffa3e5ab9fccaad655af37e049995 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        echo "<ul class=\"nav-list\">
    ";
        // line 3
        echo "    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute(($context["pages"] ?? null), "children", []), "visible", []));
        foreach ($context['_seq'] as $context["_key"] => $context["p"]) {
            // line 4
            echo "        
        ";
            // line 6
            echo "        ";
            $context["current_page"] = ((($this->getAttribute($context["p"], "active", []) || $this->getAttribute($context["p"], "activeChild", []))) ? ("active") : (""));
            // line 7
            echo "        
        <li class=\"";
            // line 8
            echo twig_escape_filter($this->env, ($context["current_page"] ?? null), "html", null, true);
            echo "\">
            ";
            // line 10
            echo "            <a href=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($context["p"], "url", []), "html", null, true);
            echo "\">.";
            echo twig_escape_filter($this->env, twig_replace_filter(twig_lower_filter($this->env, (($this->getAttribute($context["p"], "menu", [], "any", true, true)) ? (_twig_default_filter($this->getAttribute($context["p"], "menu", []), $this->getAttribute($context["p"], "title", []))) : ($this->getAttribute($context["p"], "title", [])))), [" " => "-"]), "html", null, true);
            echo "</a>
        </li>
        
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['p'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 14
        echo "</ul>";
    }

    public function getTemplateName()
    {
        return "partials/navigation.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  64 => 14,  51 => 10,  47 => 8,  44 => 7,  41 => 6,  38 => 4,  33 => 3,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("<ul class=\"nav-list\">
    {# Loop through all top-level pages that are marked as visible (have a number prefix) #}
    {% for p in pages.children.visible %}
        
        {# Check if the current page is active to add a CSS class for styling #}
        {% set current_page = (p.active or p.activeChild) ? 'active' : '' %}
        
        <li class=\"{{ current_page }}\">
            {# Use page.menu if it exists in frontmatter (like we set up earlier), otherwise fallback to page.title #}
            <a href=\"{{ p.url }}\">.{{ p.menu|default(p.title)|lower|replace({' ': '-'}) }}</a>
        </li>
        
    {% endfor %}
</ul>", "partials/navigation.html.twig", "K:\\work\\k.ai_website\\grav-site\\user\\themes\\kaspar-2026\\templates\\partials\\navigation.html.twig");
    }
}
