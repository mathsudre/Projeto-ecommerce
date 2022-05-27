
const querys = (element) => document.querySelector(element)
const query_id = (element) => document.getElementById(element)

import { container_ul,cart_ul,render_vitrine,render_cart } from './funções-renderizar.js'
import { data } from './database.js'


let carrinho = []
const cart_box = querys("#empty")

addEventListener("click",(event) => {       
        const get_class = event.target.className
        const get_id    = event.target.id        
        
        if(get_class == "buying" || get_class == "fa-solid fa-cart-plus"){
            const verification = repeated_product(carrinho,data,get_id)

            if(!verification){
            carrinho.unshift(data[get_id-1])
            cart_ul.innerHTML = ""
            render_cart(carrinho)

            }                       
                           
        } 

        if(get_class == "remove btn-remove"){                  
            carrinho.splice(get_id,1)
            cart_ul.innerHTML = ""
            render_cart(carrinho)                   
        }

        if(get_class == "btn_plus"){          
            carrinho[get_id].amount += 1
            cart_ul.innerHTML = ""
            render_cart(carrinho)
        } 

        if(get_class == "btn_minum" && carrinho[get_id].amount > 0){
            carrinho[get_id].amount -= 1           
            cart_ul.innerHTML = ""
            render_cart(carrinho)
                    
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



function repeated_product(product,new_product,id){
    return product.find(product => product.id == new_product[id-1].id)
}



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



addEventListener("click",(event) => {
    const alvo = event.target.className   

    const new_data =  data.filter(ele => ele.tag.toLowerCase() == alvo)

    if(alvo == "camisetas"){ 
        container_ul.innerHTML = ""
        render_vitrine(new_data)
    }

    if(alvo == "acessórios"){
        container_ul.innerHTML = ""
        render_vitrine(new_data)
    }

    if(alvo == "calçados"){
        container_ul.innerHTML = ""
        render_vitrine(new_data)
    }
    
    if(alvo == "todos"){
        container_ul.innerHTML = ""
        render_vitrine(data)
    }
   
})




const input_search = querys(".input-search")
//const searching = querys(".searching")

addEventListener("keypress", event => {
      
    const textInput =  new RegExp(input_search.value, "i")  
    const input_searching = data.filter(element => textInput.test(element.nameItem+element.tag))

    if(input_searching.length > 0){
        container_ul.innerHTML = ""        
        render_vitrine(input_searching)      
    }

    if(event.key == "Enter"){
        container_ul.innerHTML = ""        
        render_vitrine(data)
    }   
   
})




const link = query_id("dark_m")
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