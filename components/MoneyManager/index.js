import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyItemList: [],
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    total: 0,
    income: 0,
    expenses: 0,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  onClickDelete = id => {
    const {historyItemList} = this.state
    const updatedHistoryItemList = historyItemList.filter(
      historyItem => historyItem.id !== id,
    )
    this.setState(
      {historyItemList: updatedHistoryItemList},
      this.updateMoneyDetails,
    )
  }

  getType = () => {
    const {typeInput} = this.state
    const activeType = transactionTypeOptions.find(
      eachType => eachType.optionId === typeInput,
    )
    return activeType ? activeType.displayText : ''
  }

  updateMoneyDetails = () => {
    const {historyItemList} = this.state
    let total = 0
    let income = 0
    let expenses = 0

    historyItemList.forEach(item => {
      if (item.type === 'Income') {
        income += parseInt(item.amount)
      } else {
        expenses += parseInt(item.amount)
      }
    })

    total = income - expenses

    this.setState({total, income, expenses})
  }

  onAdd = event => {
    event.preventDefault()
    const {titleInput, amountInput} = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: this.getType(),
    }

    this.setState(
      prevState => ({
        historyItemList: [...prevState.historyItemList, newTransaction],
        titleInput: '',
        amountInput: '',
        typeInput: transactionTypeOptions[0].optionId,
      }),
      this.updateMoneyDetails,
    )
  }

  render() {
    const {
      historyItemList,
      titleInput,
      amountInput,
      typeInput,
      total,
      income,
      expenses,
    } = this.state
    return (
      <div className="bg-container">
        <div className="money-manager-header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your
            <span className="money-manager-title"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails moneyDetails={{balance: total, income, expenses}} />
        <div className="transactions-details-container">
          <div className="add-transaction-container">
            <h2>Add Transaction</h2>
            <form
              className="add-transaction-form-container"
              onSubmit={this.onAdd}
            >
              <label htmlFor="title" className="add-transaction-title">
                TITLE
              </label>
              <input
                type="text"
                className="input-container"
                id="title"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount" className="add-transaction-title">
                AMOUNT
              </label>
              <input
                type="text"
                className="input-container"
                id="amount"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="type" className="add-transaction-title">
                TYPE
              </label>
              <select
                className="input-container"
                id="type"
                value={typeInput}
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(eachTransactionItem => (
                  <option
                    key={eachTransactionItem.optionId}
                    value={eachTransactionItem.optionId}
                  >
                    {eachTransactionItem.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h2>History</h2>
            <div className="history-details-container">
              <div className="history-details-header-container">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </div>
              <ul>
                {historyItemList.map(historyItem => (
                  <TransactionItem
                    key={historyItem.id}
                    transactionDetails={historyItem}
                    onDelete={this.onClickDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
