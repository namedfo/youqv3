import { ReactNode, useState } from "react"
//
import Link from "next/link"
import { useRouter } from "next/router"
// components/UI
import Avatar from "./UI/Avatar"
import Button from "./UI/Button"
import useOutside from "../hooks/useOutside"
import { level } from "utils/helping"
// utils/svg
// import Plus from '../utils/svg/plus.svg'




const Navbar = ({ }: any) => {

    const [isDropdownUser, setIsDropdownUser] = useState(false)

    const router = useRouter()

    
    // const { data, status }: any = useSession()
    const data = undefined
    const status = undefined


    const handleSignIn = () => {
        router.push('/auth')
    }

    const handleSignOut = async () => {
        try {
            // await signOut()
        } catch (error) {

        }
    }
    

    const { ref } = useOutside(setIsDropdownUser)

    return (
        <div className="flex items-center justify-between h-[50px] sm:h-[60px] py-[10px] px-[20px] w-full bg-white fixed z-50 shadow-nav">
            <span className="font-nunito hidden sm:block font-black text-4xl text-[#4971FF]" >
                <Link href="/">
                    YouQ
                </Link>
            </span>
            {/* <button>
                <Plus fill="white" width={28} height={28}  />
            </button> */}
            {status === 'authenticated' ? (
                <div ref={ref} className="relative hidden sm:block">
                    <div
                        onClick={() => setIsDropdownUser(prev => !prev)}
                        style={{
                            backgroundColor: isDropdownUser ? '#DEEBFF' : undefined
                        }}
                        className="rounded-[10px] hover:bg-[#DEEBFF] cursor-pointer flex items-center py-[7px] px-[10px]"
                    >
                        <Avatar
                            src={data?.user?.image}
                            width={32}
                            height={32}
                            isConfirmed={data?.user?.isConfirmed}
                            className="rounded-[50%]"
                        />
                        <div className="flex ml-[10px] font-montserrat flex-col justify-center leading-[16px] text-[16px]">
                            <span className="font-semibold text-[#232323]">
                                {data?.user?.name}
                            </span>
                            <span className="text-[#494949] font-medium">
                                {level[data?.user?.level]}
                            </span>
                        </div>
                    </div>

                    <DropdownUser isShow={isDropdownUser}>
                        <div className="w-full flex flex-col">
                            <Button
                                onClick={() => router.push(`/profile/${data?.user?.id}`)}
                                className="flex items-center rounded-[10px] py-[7px] px-[14px] bg-none outline-none border-none cursor-pointer text-[#232323] text-[16px] font-montserrat font-semibold hover:bg-[#F3F4FF]"
                            >
                                <span className="ml-[10px]">
                                    Мой профиль
                                </span>
                            </Button>
                            <Button
                                onClick={handleSignOut}
                                className="flex items-center rounded-[10px] py-[7px] px-[14px] bg-none outline-none border-none cursor-pointer text-[#232323] text-[16px] font-montserrat font-semibold hover:bg-[#F3F4FF]"
                            >
                                <span className="ml-[10px]">
                                    Выход
                                </span>
                            </Button>
                        </div>
                    </DropdownUser>
                </div>
            ) : (
                <button
                    onClick={handleSignIn}
                    className="bg-[#4971FF] hidden sm:block border-none cursor-pointer rounded-[17px] hover:bg-[#2851E4] font-bold font-nunito text-[20px] text-white h-auto py-[5px] px-[17px]"
                >
                    Войти
                </button>
            )}
        </div>
    )
}

type DropdownUserProps = {
    isShow: boolean
    children: ReactNode
    className?: string
}

const DropdownUser = ({
    isShow,
    children,
    className
}: DropdownUserProps) => {
    return (
        <div style={{
            display: isShow ? 'block' : 'none'
        }} className={`${className} absolute top-[60px] right-0 shadow-dropdown rounded-[8px] min-w-[220px] h-auto p-[8px] bg-white`}>
            {children}
        </div>
    )
}


export default Navbar