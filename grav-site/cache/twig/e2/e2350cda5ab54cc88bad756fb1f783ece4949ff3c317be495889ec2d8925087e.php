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

/* performing-arts.html.twig */
class __TwigTemplate_30c97c8bda4926b66347cbff4b84dbf52552fe6a080dd22b9262d4c19b65942b extends \Twig\Template
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
        $this->parent = $this->loadTemplate("partials/base.html.twig", "performing-arts.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = [])
    {
        // line 4
        echo "    <div class=\"performing-arts-wrapper\">
        <h1>";
        // line 5
        echo twig_escape_filter($this->env, $this->getAttribute(($context["page"] ?? null), "title", []), "html", null, true);
        echo "</h1>
        
        <section class=\"vision\">
            <h2>Our Vision</h2>
            ";
        // line 9
        echo $this->env->getExtension('Grav\Common\Twig\Extension\GravExtension')->markdownFunction($context, $this->getAttribute($this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "content_sections", []), "vision", []));
        echo "
        </section>

        <section class=\"process\">
            <h2>Our Process</h2>
            ";
        // line 14
        echo $this->env->getExtension('Grav\Common\Twig\Extension\GravExtension')->markdownFunction($context, $this->getAttribute($this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "content_sections", []), "process", []));
        echo "
        </section>

        <section class=\"lessons-learned\">
            <h2>Lessons Learned</h2>
            ";
        // line 19
        echo $this->env->getExtension('Grav\Common\Twig\Extension\GravExtension')->markdownFunction($context, $this->getAttribute($this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "content_sections", []), "lessons_learned", []));
        echo "
        </section>

        <section class=\"related-projects\">
            <h2>Related Projects</h2>
            ";
        // line 24
        echo $this->env->getExtension('Grav\Common\Twig\Extension\GravExtension')->markdownFunction($context, $this->getAttribute($this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "content_sections", []), "related_projects", []));
        echo "
        </section>
    </div>
";
    }

    public function getTemplateName()
    {
        return "performing-arts.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  76 => 24,  68 => 19,  60 => 14,  52 => 9,  45 => 5,  42 => 4,  39 => 3,  29 => 1,);
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
    <div class=\"performing-arts-wrapper\">
        <h1>{{ page.title }}</h1>
        
        <section class=\"vision\">
            <h2>Our Vision</h2>
            {{ page.header.content_sections.vision|markdown }}
        </section>

        <section class=\"process\">
            <h2>Our Process</h2>
            {{ page.header.content_sections.process|markdown }}
        </section>

        <section class=\"lessons-learned\">
            <h2>Lessons Learned</h2>
            {{ page.header.content_sections.lessons_learned|markdown }}
        </section>

        <section class=\"related-projects\">
            <h2>Related Projects</h2>
            {{ page.header.content_sections.related_projects|markdown }}
        </section>
    </div>
{% endblock %}", "performing-arts.html.twig", "K:\\work\\k.ai_website\\grav-site\\user\\themes\\kaspar-2026\\templates\\performing-arts.html.twig");
    }
}
