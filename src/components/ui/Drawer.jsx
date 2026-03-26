import { XMarkIcon } from "@heroicons/react/24/outline";

function Drawer({ isOpen, title, onClose, children, width = "w-[480px]" }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/30 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${width}
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b px-5 h-16">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="h-[calc(100%-64px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

export default Drawer;