import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onClickOfDelete = () => {
    onDelete(id)
  }

  return (
    <li className="transaction-item-container">
      <p>{title}</p>
      <p>Rs.{amount}</p>
      <p>{type}</p>
      <button
        type="button"
        data-testid="delete"
        className="delete-button"
        onClick={onClickOfDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
