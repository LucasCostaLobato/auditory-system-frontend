No .jsx, quando uso

<div className="nomeQualquer">
  ...
</div>

Estarei usando o estilo definido na classe "nomeQualquer" dentro do arquivo .css importado no .jsx.

-----

<h1> ... </h1>, <h2> ... </h2> até <h6> ... </h6> são hierarquias de títulos (headings) pré-definidas de HTML, assim como <p> ... </p> é uma hierarquia de parágrafo em HTLM.

Mas para criar um novo estilo de parágrafo, devo usar algo como no .jsx

<p className="intro">
  Este é um parágrafo introdutório, com texto maior.
</p>

<p className="destaque">
  Este é um parágrafo de destaque, com cor diferente.
</p>

<p>
  E este é um parágrafo comum.
</p>

e definir no meu css

p {
  font-size: 1rem;
  color: #333;
}

p.intro {
  font-size: 1.2rem;
  font-weight: 500;
}

p.destaque {
  color: darkblue;
  background-color: #eef;
  padding: 8px;
  border-radius: 6px;
}