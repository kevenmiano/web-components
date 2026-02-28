class Carro {

  constructor({ marca, modelo, ano }) {
    Object.assign(this, { marca, modelo, ano });
  }

  acelerar() {
    console.log('acelerando');
  }

  frear() {
    console.log('freando');
  }

  buzinar() {
    console.log('buzinando');
  }

  ligar() {
    console.log('ligando');
  }

  desligar() {
    console.log('desligando');
  }
}

class Ferrari extends Carro {
  constructor({ marca, modelo, ano }) {
    super({ marca, modelo, ano });
  }

  get marca() {
    return this.marca;
  }

  get modelo() {
    return this.modelo;
  }

  get ano() {
    return this.ano;
  }

}


class Mustang extends Carro {
  constructor({ ano, marca, modelo }) {
    super(marca, modelo, ano);
  }
}


class Porsche extends Carro {
  constructor({ marca, modelo, ano }) {
    super(marca, modelo, ano);
  }
}


const ferrari = new Ferrari({ ano: 2020, marca: 'Ferrari', modelo: 'F8 Tributo', });
