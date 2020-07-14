import Transaction from '../models/Transaction';


interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface requestDTO {
  type: 'income' | 'outcome';
  title: string,
  value: number
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {


    const GetIncome = this.transactions.filter((transactions) =>
    transactions.type == 'income')
    .reduce((initial, final) =>
    initial + final.value, 0)

    const GetOutcome = this.transactions.filter((transactions) =>
     transactions.type == 'outcome')
    .reduce((initial, final) =>
    initial + final.value, 0)

    const income = GetIncome
    const outcome = GetOutcome

    const balance = {
      income,
      outcome,
      total: (income - outcome)
    }
    return balance
  }

  public create({ title, value, type }: requestDTO): Transaction {
    const transaction = new Transaction({title, value, type})
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;


