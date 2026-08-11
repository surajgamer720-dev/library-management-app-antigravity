import { getLoans } from "../../actions/loanActions"
import TransactionsClient from "./TransactionsClient"

export default async function TransactionsPage() {
  const loans = await getLoans()
  
  return <TransactionsClient initialLoans={loans} />
}
