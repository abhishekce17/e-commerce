import AccountSidebar from '@/Components/AccountSidebar'

export default async function AccountLayout({ children }) {
  return (
    <div className=" flex gap-10 justify-center h-full pb-5" >
      <AccountSidebar />
      <div className="bg-white rounded-md p-5 border border-primary-light lg:max-w-[60%] flex w-full" >
        {children}
      </div>
    </div>
  )
}