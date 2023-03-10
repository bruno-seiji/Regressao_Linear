const confirmar = document.querySelector("#confirm_btn")
const reset = document.querySelector("#reset_btn")
const calcular = document.querySelector("#calc_btn")
const num_pares = document.querySelector("#num_pares")
const container = document.querySelector("#resultados")

var arrayX = []
var arrayY = []
var arrayY_quadrado = []
var arrayX_quadrado = []
var arrayXY = []
var a=0
var b=0
var click_calcular = 0

confirmar.addEventListener("click", () => {
    
    if (num_pares.value > 1) {
        criar_tabela()
        num_pares.setAttribute("readonly",true)
        confirmar.classList.add("hidden")
        confirmar.classList.remove("show")
        reset.classList.add("show")
        reset.classList.remove("hidden")
        calcular.classList.add("show")
        calcular.classList.remove("hidden")
    }
    else {window.alert("Utilizar no minimo 2 pares (X/Y)")}
})

calcular.addEventListener("click", ()=>{
  definir_arrays()
  definir_array_quadrados()
  definir_arrayXY()
  definir_A_B()
  click_calcular++
  if (click_calcular>1){document.querySelector("#funcao").remove()}
  const resultado = document.createElement("div")
  container.appendChild(resultado)
  resultado.setAttribute("id","funcao")
  if (a<0){resultado.innerText = 'y  =  ' + b.toFixed(3) + 'x  ' + '  ' + a.toFixed(3) }
  else {resultado.innerText = 'y  =  ' + b.toFixed(3)  + '  x  ' + '  +  ' + a.toFixed(3)  }
})

reset.addEventListener("click", () => {
  document.querySelector("table").remove()
  document.querySelector("#funcao").remove()
  click_calcular = 0
  confirmar.classList.add("show")
  confirmar.classList.remove("hidden")
  reset.classList.add("hidden")
  reset.classList.remove("show")
  calcular.classList.add("hidden")
  calcular.classList.remove("show")
  num_pares.removeAttribute("readonly",true)
})

function criar_tabela(){
  const novaTabela= document.createElement("table")
  const col1 = document.createElement ("th")
  const col2 = document.createElement ("th")
  const linha_tabela= document.createElement("tr")
  container.appendChild(novaTabela)
  novaTabela.appendChild(linha_tabela)
  linha_tabela.appendChild(col1)
  linha_tabela.appendChild(col2)
  col1.textContent = "X"
  col2.textContent = "Y"
  
  for (let i=0; i<num_pares.value; i++)
  {
    const linha_tabela= document.createElement("tr")
    novaTabela.appendChild(linha_tabela)
    for (let j=0; j<2; j++)
    {
      const col = document.createElement ("td")
      const input = document.createElement("input")
      linha_tabela.appendChild(col)
      col.appendChild(input)
      input.setAttribute("type","number")
      input.setAttribute("value","0")
    }
  }
 }

function definir_A_B(){
    b = ((num_pares.value*arrayXY[num_pares.value])-(arrayX[num_pares.value]*arrayY[num_pares.value]))/((num_pares.value*arrayX_quadrado[num_pares.value])-(arrayX[num_pares.value]*arrayX[num_pares.value]))
    a = (arrayY[num_pares.value]-(b*arrayX[num_pares.value]))/(num_pares.value)
}

function definir_arrayXY(){
  arrayXY[num_pares.value]=0
  for(let i=0; i<num_pares.value; i++){
      arrayXY[i] = arrayX[i] * arrayY[i]
      arrayXY[num_pares.value]=arrayXY[num_pares.value]+arrayXY[i]
  }
}

function definir_array_quadrados() {
  arrayY_quadrado[num_pares.value]=0
  arrayX_quadrado[num_pares.value]=0
  for(let i=0; i<num_pares.value; i++){
    arrayX_quadrado[i] = arrayX [i] * arrayX [i]
    arrayX_quadrado[num_pares.value] = arrayX_quadrado[num_pares.value]+ arrayX_quadrado[i]
    arrayY_quadrado[i] = arrayY [i] * arrayY [i]
    arrayY_quadrado[num_pares.value] = arrayY_quadrado[num_pares.value]+ arrayY_quadrado[i]
  }
}

function definir_arrays(){
  let i = 1
  let w = 0
  let e = 2
  arrayX[num_pares.value] = 0
  arrayY[num_pares.value] = 0
  while (w < num_pares.value)
  { arrayX[w] = parseInt(document.querySelectorAll("input")[i].value)
    arrayX[num_pares.value] = arrayX[num_pares.value] + parseInt(document.querySelectorAll("input")[i].value)
    arrayY[w] = parseInt(document.querySelectorAll("input")[e].value)
    arrayY[num_pares.value] = arrayY[num_pares.value] + parseInt(document.querySelectorAll("input")[e].value)
    i = i+2
    w++
    e = e+2
  }
}

