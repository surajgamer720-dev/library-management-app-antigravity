import { getMembers } from "../../actions/memberActions"
import MembersClient from "./MembersClient"

export default async function MembersPage() {
  const members = await getMembers()
  
  return <MembersClient initialMembers={members} />
}
