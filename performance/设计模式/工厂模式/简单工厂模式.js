class FruitFactory {
  create(type) {
    switch(type) {
      case '苹果':
        return new Apple()
        break;
      case '梨':
        return new Pear()
        break;
      default:
        throw new Error('暂时没有这样的水果')
    }

  }
}

class Apple{
  constructor(){
    this.fruit = '苹果'
  }
  eat() {
    console.log('吃'+this.fruit)
  }
}

class Pear{
  constructor(){
    this.fruit = '梨'
  }
  eat() {
    console.log('吃'+this.fruit)
  }
}



class User{
  eat() {
    var fruitFactory = new FruitFactory()
    var apple = fruitFactory.create('苹果')
    var pear = fruitFactory.create('梨')
    apple.eat()
    pear.eat()
  }
}


var user = new User()
user.eat()