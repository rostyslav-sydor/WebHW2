/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */


class Ingridient {
    constructor(name, amount){
        this.name = name;
        this.amount = amount
    }
}


class Bolognese extends Dish {
    constructor() {
        super(10);
        this.ingridients = [new Ingridient('spaghetti', 1),
                            new Ingridient('meat', 1),
                            new Ingridient('tomato', 1)];
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.ingridients = [new Ingridient('potato', 1)];
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.ingridients = [new Ingridient('meat', 1)];
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(7);
        this.ingridients = [new Ingridient('meat', 1),
                            new Ingridient('potato', 1)];
    }
}

class Kitchen {
    constructor() {
        this.fridge = new Array;
        this.orders = new Array;
    }
    
    addToFridge(ingridients) {
        this.fridge.push(...ingridients);
    }

    checkProducts(dish){
        // check if enough products
        for(var ingridient of dish.ingridients){
            var index = this.fridge.findIndex((elem) => elem.name === ingridient.name);
            if(this.fridge[index].amount < ingridient.amount){
                return false;
            }
        }
        return true;
    }

    order(dish) {
        if(this.checkProducts(dish)){
            // remove ingridients
            for(var ingridient of dish.ingridients){
                var index = this.fridge.findIndex((elem) => elem.name === ingridient.name);
                this.fridge[index].amount -= ingridient.amount;
            }
            this.orders.push(dish);
        } else throw new Error("Not enough ingridients");
        
    }

    async cookFastestOrder() {
        var index = this.orders.findIndex( (ord) => ord.cookingTime === Math.min.apply(0, this.orders.map((o) => o.cookingTime)));
        var fastest = this.orders[index];
        console.log(fastest);
        this.orders.splice(index, 1);
        return fastest.cook();
    }

    async cookAllOrders(){
        var orders = [];
        for(var myorders of this.orders){
            console.log(myorders);
            orders.push(await myorders.cook());
        }
        this.orders = [];
        return orders;
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
