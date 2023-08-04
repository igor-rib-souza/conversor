import axios from 'axios';
import * as readline from 'readline';

class CurrencyConverter {
  private from: string;
  private to: string;
  private amount: number;

  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  public async convert() {
    try {
      const response = await axios.get(`https://api.exchangerate.host/convert`, {
        params: {
          from: this.from,
          to: this.to,
          amount: this.amount
        }
      });

      const data = response.data;
      
      if (data.success) {
        console.log(`O valor convertido é: ${data.result.toFixed(2)}.\nTaxa: ${data.info.rate.toFixed(6)}.`);
      } else {
        console.log('Falha na conversão, tente novamente.');
      }

    } catch (error) {
      console.error('Error communicating with the API:', error);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Moeda origem: ', (from) => {
  rl.question('Moeda destino: ', (to) => {
    rl.question('Valor: ', (amount) => {
      const converter = new CurrencyConverter(from, to, parseFloat(amount));
      converter.convert();

      rl.close();
    });
  });
});
