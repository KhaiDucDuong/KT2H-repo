import { Skeleton } from '@/components/ui/skeleton'
import { EllipsisVerticalIcon, MessageCircleIcon } from 'lucide-react'
import React from 'react'
import CustomButton from '../CustomButton'

const FriendListDisplayLoading = () => {
  return (
    <section
    className="w-[96%] h-[72px]
  px-[14px] self-center flex flex-row justify-between cursor-pointer relative">
    <div className="w-[calc(100%-28px)] h-[1px] absolute border-t-[1px] border-dark-1"></div>
    <div className="flex flex-row">
      <div className="self-center">
        <Skeleton
          className="rounded-full mr-[10px] size-[50px]"
        />
      </div>
      <div className="self-center">
        <Skeleton className="size-[100px] h-[1em] min-w-[15%]  mb-2"/>
        <Skeleton className="size-[100px] h-[1em] w-[50%]  mb-2"/>
      </div>
    </div>
    <div className="self-center flex flex-row">
        <CustomButton
          isHovered={false}
          iconComponent={MessageCircleIcon}
          text="Message"
          hoverColor="white"
          filled={true}
          onClick={() => {}}
        />
        <div className="w-[15px]"></div>
        <CustomButton
          isHovered={false}
          iconComponent={EllipsisVerticalIcon}
          text="More"
          hoverColor="white"
          filled={false}
          onClick={() => {}}
        />
      </div>
  </section>
  )
}

export default FriendListDisplayLoading