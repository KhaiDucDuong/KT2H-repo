import { LoaderCircleIcon } from "lucide-react"

const ConversationLoader = () => {
  return (
    <div className="w-full flex justify-center m-auto"><LoaderCircleIcon className="animate-spin size-[30px] m-auto text-gray-2"/></div>
  )
}

export default ConversationLoader