
const querys = (element) => document.querySelector(element)

/****************** FUNÇÃO - CRIAR ITEM NA VITRINE *********************/

const container_ul = querys(".container-ul")

function render_vitrine (element){

return  container_ul.insertAdjacentHTML("beforeend",
`<li class="hover-item">

        <img src=${element.img} alt=${element.nameItem}>

            <section class="section_description--vitrine">
                <h5>${element.tag}</h5>
                <h2>${element.nameItem}</h2>
                <p>${element.description}</p>
                <span>R$ ${element.value}.00</span>
                <button id="${element.id}" class="buying"> Adicionar <i class="fa-solid fa-cart-plus"></i></button>
            </section>

 </li>`

)}data.map(render_vitrine)


/******************** FUNÇÃO - CRIAR ITEM NO CARRINHO **************************/


const cart_ul = querys("#cart-item-ul")

function render_cart(element,index){     

return cart_ul.insertAdjacentHTML("beforeend",

`<li class="cart-item-li">
        <img src=${element.img}>
        <section class="cart-item-info">
        <h3>${element.nameItem}</h3>
        <p>R$${element.value},00</p>
        <h4>Quantidade: <button id="${index}" class="btn_minum">-</button><span>${element.amount}</span> <button id="${index}" class="btn_plus">+</button> </h4>        
        </section>
        <button id="${index}" class="remove btn-remove"></button>
</li>`
)}


/**************** FUNÇÃO - ADICIONAR E REMOVER ITEM DO CARRINHO *********************/


let carrinho = []
const cart_box = querys("#empty")

addEventListener("click",(event) => {       
        const get_class = event.target.className
        const get_id    = event.target.id        

        if(get_class == "buying"){

            const verification = repeated_product(carrinho,data,get_id)

            if(!verification){
            carrinho.unshift(data[get_id-1])
            cart_ul.innerHTML = ""
            carrinho.map(render_cart)

            }                       
                           
        } 

        if(get_class == "remove btn-remove"){                  
            carrinho.splice(get_id,1)
            cart_ul.innerHTML = ""
            carrinho.map(render_cart)                   
        }

        if(get_class == "btn_plus"){          
            carrinho[get_id].amount += 1
            cart_ul.innerHTML = ""
            carrinho.map(render_cart)
        } 

        if(get_class == "btn_minum" && carrinho[get_id].amount > 0){
            carrinho[get_id].amount -= 1           
            cart_ul.innerHTML = ""
            carrinho.map(render_cart)
                    
        }

        if(carrinho.length > 0){
            cart_box.classList.add("remover");
            table_div.innerHTML=""           
            tablePrice(carrinho)            
        }
        
        if(carrinho.length == 0){
            table_div.innerHTML=""
            cart_box.classList.remove("remover");        
        }
})



/****** FUNÇÃO - VERIFICA SE O PRODUTO JÁ EXISTE NO CARRINHO ANTES DE ADICIONAR NO PROPRIO CARRINHO 
 ******/


function repeated_product(product,new_product,id){
    return product.find(product => product.id == new_product[id-1].id)
}


/****************** FUNÇÃO - RENDERIZAR TABELA DE QUANTIDADE E PREÇO ******************/

const table_div  = querys(".table-div")

function tablePrice (carr){
const total_amount = carr.reduce((acc, ele) => acc + ele.amount,0)    
const total_price  = carr.reduce((acc, ele) => acc + (ele.value * ele.amount) ,0)
    
return  table_div.insertAdjacentHTML("beforeend",            
        `
        <div class="table-div">
        <section class="table-purchase-info table-hidden" id="purchase-info">            
        <p>Quantidade: <span id="quantify-cart">${total_amount}</span></p>            
        <p>Total: <span id="total-price-cart">R$${total_price}</span></p>            
        </section>
        <button class="table_div--btn item_1">FINALIZAR COMPRA</button>
        </div>        
        `           
        )
}


/******************  FUNÇÕES BÔNUS  ******************/
 
/******************  FUNÇÃO - BOTÕES SECÇÕES/HEADER  ******************/

addEventListener("click",(event) => {
    const alvo = event.target.className   

    const new_data =  data.filter(ele => ele.tag.toLowerCase() == alvo)

    if(alvo == "camisetas"){ 
        container_ul.innerHTML = ""
        new_data.map(render_vitrine)
    }if(alvo == "acessórios"){
        container_ul.innerHTML = ""
        new_data.map(render_vitrine)
    }if(alvo == "calçados"){
        container_ul.innerHTML = ""
        new_data.map(render_vitrine)
    }
    if(alvo == "todos"){
        container_ul.innerHTML = ""
        data.map(render_vitrine)
    }
   
})


/******************  FUNÇÃO - BARRA DE PESQUISA  ******************/

const input_search = querys("#input-search")
const searching = querys(".searching")

addEventListener("keypress", event => {   
    const textInput =  new RegExp(input_search.value, "i")  
    const input_searching = data.filter(element => textInput.test(element.nameItem+element.tag))

    if(input_searching.length > 0){
    container_ul.innerHTML = ""        
    input_searching.map(render_vitrine)      
    }
    if(event.key == "Enter"){
        container_ul.innerHTML = ""        
        data.map(render_vitrine)
    }   
   
})


/*********************** FUNÇÃO - SWITCH LIGHT/DARK MODE  ************************/

const link = querys("#dark-m")
const btn_switch = querys("#switch")

btn_switch.addEventListener("click", event =>{    
    const get_dark = event.target.className

    if(get_dark == "light"){
        link.href= "./assets/css/dark-mode.css"          
        btn_switch.classList.replace("light","dark")
        
    }
    if(get_dark == "dark"){
        link.href= "./assets/css/style.css"       
        btn_switch.classList.replace("dark","light")
    }
})