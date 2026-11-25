
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative w-20 h-20 rounded-full border-4 border-white">
        <div className="absolute w-20 h-20 -inset-1 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    </div>
  )
}

export default Loader
