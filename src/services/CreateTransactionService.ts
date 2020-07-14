import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface requestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';

}


class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: requestDTO): Transaction {

    const verifyTransaction = this.transactionsRepository.getBalance()


    if(type == 'outcome' && verifyTransaction.total < value){
      throw Error('Error insufficient value!!')
    }


   const Transaction = this.transactionsRepository.create({title, value, type})
   return Transaction
  }
}

export default CreateTransactionService;
