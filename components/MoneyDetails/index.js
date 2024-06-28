import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {balance, income, expenses} = moneyDetails

  return (
    <div className="money-details-container">
      <div className="your-balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-details-icon"
        />
        <div className="details">
          <p className="money-details-title">Your Balance</p>
          <p className="money-details-value" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="your-income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="money-details-icon"
        />
        <div className="details">
          <p className="money-details-title">Your Income</p>
          <p className="money-details-value" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="your-expense-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="money-details-icon"
        />
        <div className="details">
          <p className="money-details-title">Your Expenses</p>
          <p className="money-details-value" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
