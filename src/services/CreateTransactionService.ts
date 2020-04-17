import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: Request): Transaction {
    if (type === 'income' && value < 0.01) {
      throw Error('Invalide Value');
    } else if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total - value < 0) {
        throw Error('There is no balance for this operation');
      }
    } else if (title === '') {
      throw Error('Operation needs a title');
    }

    return this.transactionsRepository.create({ value, type, title });
  }
}

export default CreateTransactionService;
