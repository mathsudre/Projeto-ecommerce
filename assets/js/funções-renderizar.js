
import { data } from './database.js'



const querys = (element) => document.querySelector(element)



const container_ul = querys(".container-ul")

function render_vitrine (produto){

produto.forEach(element => {
container_ul.insertAdjacentHTML("beforeend",
`<li class="hover-item">

        <img src=${element.img} alt=${element.nameItem}>

            <section class="section_description--vitrine">
                <h5>${element.tag}</h5>
                <h2>${element.nameItem}</h2>
                <p>${element.description}</p>
                <span>R$ ${element.value}.00</span>
                <button id="${element.id}" class="buying"> Adicionar <i id="${element.id}" class="fa-solid fa-cart-plus"></i></button>
            </section>

 </li>` )})
}render_vitrine(data)


const cart_ul = querys("#cart-item-ul")

function render_cart(produto){     

produto.forEach((element, index) => {
cart_ul.insertAdjacentHTML("beforeend",

`<li class="cart-item-li">
        <img src=${element.img}>
        <section class="cart-item-info">
        <h3>${element.nameItem}</h3>
        <p>R$${element.value},00</p>
        <h4>Quantidade: <button id="${index}" class="btn_minum">-</button><span>${element.amount}</span> <button id="${index}" class="btn_plus">+</button> </h4>        
        </section>
        <button id="${index}" class="remove btn-remove"></button>
</li>`
)
 })}



export {container_ul,cart_ul,render_vitrine,render_cart}