

export default function ReservationForm() {
  return (
    <form className="w-full p-6">
        <h2 className="text-4xl mb-4 uppercase font-black">Réservation</h2>

        <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                Prénom
            </label>
            <input type="text" id="firstName" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Nom
            </label>
            <input type="text" id="lastName" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                E-mail
            </label>
            <input type="email" id="email" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Téléphone
            </label>
            <input type="tel" id="phone" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="numPeople" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de personnes
            </label>
            <input type="number" id="numPeople" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="reservationDate" className="block text-gray-700 text-sm font-bold mb-2">
                Date de réservation
            </label>
            <input type="date" id="reservationDate" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
        </div>

        <div className="mb-4">
            <label htmlFor="arrivalTime" className="block text-gray-700 text-sm font-bold mb-2">
                Heure
            </label>
            <select id="arrivalTime" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700">
                <option value="">Sélectionner une heure</option>
                {['12:00','12:30','13:00','13:30','14:00','14:30','19:00','19:30','20:00','20:30','21:00'].map((time) =>(
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none">Réserver</button>
    </form>
  )
}
