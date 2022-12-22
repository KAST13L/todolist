
export const Footer = () => {
    return (
        <div className="bg-gray-900 p-12">
            <div className="mb-4">
                <span className="uppercase font-bold text-sm text-zinc-500">
                    Контакти
                </span>
            </div>
            <div className="mb-8">
                <ul>
                    <a href={'mailto:smykdav@gmail.com'}>smykdav@gmail.com</a>
                </ul>
            </div>
            <hr className="relative left-[-3rem] w-[calc(100%_+_6rem)] border-zinc-500 mb-8"/>
            <div>
                <span className="text-xl font-semibold text-white">
                    To Do List
                </span>
            </div>
        </div>
    )
}