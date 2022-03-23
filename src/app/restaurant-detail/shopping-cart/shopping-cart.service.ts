import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item.model"

export class ShoppingCartService{
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItem(item: MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        
        if(foundItem){ foundItem.quantity = foundItem.quantity + 1 
            console.log(`Item ${item.name} já existe`)}
        else{ this.items.push(new CartItem(item)) 
        console.log(`Adicionou o item ${item.name}`)}
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number{
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }
}