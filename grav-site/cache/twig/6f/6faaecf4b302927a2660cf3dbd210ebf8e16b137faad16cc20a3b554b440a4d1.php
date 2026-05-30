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

/* modular/news-feed.html.twig */
class __TwigTemplate_3ea9adf6e3a46b7013491ebbbfe09049f6156441fc0fb35db4280a8013683058 extends \Twig\Template
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
        echo "<section class=\"modular-news-feed\">
    <div class=\"news-grid\">
        ";
        // line 4
        echo "        ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["page"] ?? null), "collection", []));
        foreach ($context['_seq'] as $context["_key"] => $context["news_item"]) {
            // line 5
            echo "            <article class=\"news-card\">
                <span class=\"date\">";
            // line 6
            echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["news_item"], "date", []), "Y/m/d"), "html", null, true);
            echo "</span>
                <h3><a href=\"";
            // line 7
            echo twig_escape_filter($this->env, $this->getAttribute($context["news_item"], "url", []), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["news_item"], "title", []), "html", null, true);
            echo "</a></h3>
                <p>";
            // line 8
            echo twig_escape_filter($this->env, strip_tags($this->getAttribute($context["news_item"], "summary", [0 => 120], "method")), "html", null, true);
            echo "</p>
            </article>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['news_item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 11
        echo "    </div>
</section>";
    }

    public function getTemplateName()
    {
        return "modular/news-feed.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  61 => 11,  52 => 8,  46 => 7,  42 => 6,  39 => 5,  34 => 4,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("<section class=\"modular-news-feed\">
    <div class=\"news-grid\">
        {# Loops through the Blog collection we defined in news-feed.md #}
        {% for news_item in page.collection %}
            <article class=\"news-card\">
                <span class=\"date\">{{ news_item.date|date(\"Y/m/d\") }}</span>
                <h3><a href=\"{{ news_item.url }}\">{{ news_item.title }}</a></h3>
                <p>{{ news_item.summary(120)|striptags }}</p>
            </article>
        {% endfor %}
    </div>
</section>", "modular/news-feed.html.twig", "K:\\work\\k.ai_website\\grav-site\\user\\themes\\kaspar-2026\\templates\\modular\\news-feed.html.twig");
    }
}
