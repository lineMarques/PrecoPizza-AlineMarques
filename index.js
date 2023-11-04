let pizzas = [];
let custos = [];

const btnIncluirPizza = document.getElementById("idBtnIncluirPizza");
const btnCalcular = document.getElementById("btnCalcular");

btnIncluirPizza.addEventListener("click", function (event) {
  event.preventDefault();

  let pizza = {
    tipo: document.getElementById("idTipoPizza").value,
    tamanho: document.getElementById("idTamanho").value,
    preco: document.getElementById("idPreco").value,
  };

  pizzas.push(pizza);

  let incluirPizza = montaTr(pizza);
  let table = document.getElementById("idTabelaPizzas");

  table.appendChild(incluirPizza);
  custoPizzas();
});

function custoPizzas() {
  pizzas.forEach(function (element, index) {
    let raio = element.tamanho / 2;
    let area = Math.PI * (raio * raio);
    element.area = area.toFixed(3);

    let custo = element.preco / area;
    element.custo = custo.toFixed(3);
  });
}

/* Inclui pizzas na tabela de pizzas */
function montaTr(pizza) {
  let pizzaTr = document.createElement("tr");
  var divTabelaPizzas = document.getElementById("divTabelaPizzas");

  divTabelaPizzas.hidden = false;
  btnCalcular.hidden = false;
  pizzaTr.appendChild(montaTd(pizza.tipo));
  pizzaTr.appendChild(montaTd(pizza.tamanho));
  pizzaTr.appendChild(montaTd(pizza.preco));
  pizzaTr.appendChild(montaTd(pizza.area));
  pizzaTr.appendChild(montaTd(pizza.custo));
  pizzaTr.appendChild(montaTd(pizza.porcentagem));

  return pizzaTr;
}

function montaTd(dado) {
  let pizzaTd = document.createElement("td");
  pizzaTd.textContent = dado;
  if(dado == 0){
    pizzaTd.textContent = "Melhor CB"
  }
  return pizzaTd;
}

btnCalcular.addEventListener("click", function () {
  let divTabCustoBeneficio = document.getElementById("divTabelaCustoBeneficio");
  let tableCusto = document.getElementById("idTabelaCusto");

  divTabCustoBeneficio.hidden = false;

  pizzas.sort(function (a, b) {
    if (a.custo > b.custo) {
      return 1;
    }
    if (a.custo < b.custo) {
      return -1;
    }
    return 0;
  });

  pizzas.forEach(function (element, index, pizzas) {

    let melhorCusto = pizzas[0].custo;
    element.porcentagem = (element.custo / melhorCusto) * 100 - 100;
    element.porcentagem.toFixed(3)

    let custoTr = montaTr(element);
    tableCusto.appendChild(custoTr);
    btnCalcular.disabled = true;

  });

  divTabelaPizzas.hidden = true;
});
