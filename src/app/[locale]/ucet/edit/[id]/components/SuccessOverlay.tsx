// src/app/[locale]/ucet/edit/[id]/components/SuccessOverlay.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const SuccessOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-green-700 px-12 py-10 rounded-2xl shadow-2xl text-center flex flex-col items-center gap-5 animate-scaleIn">
        <FontAwesomeIcon icon={faCheckCircle} className="text-7xl drop-shadow-lg" />
        <h2 className="text-3xl font-bold tracking-wide">Úspěšně uloženo!</h2>
        <p className="text-gray-600 max-w-xs">
          Váš životopis byl bezpečně uložen. Budete brzy přesměrováni zpět na přehled.
        </p>
      </div>
    </div>
  )
}

export default SuccessOverlay
