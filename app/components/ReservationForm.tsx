import { useForm } from "react-hook-form"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

type ReservationFormValues = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    numPeople: number,
    arrivalTime: string,
    reservationDate: string
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Le prénom est requis'),
    lastName: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Format d\'e-mail invalide').required('L\'adresse e-mail est requise'),
    phone: Yup.string().required('Le numéro de téléphone est requis'),
    numPeople: Yup.number().positive("le nombre doit être positif").integer("Le nombre doit etre un entier").required('Le nombre de personnes est requis'),
    arrivalTime: Yup.string().required('La date de réservation est requise'),
    reservationDate: Yup.string().required('L\'heure du rendez-vous est requis'),
})

export default function ReservationForm() {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ReservationFormValues>({
        resolver: yupResolver(validationSchema)
    })

    const [messages, setMessages] = useState<string | null>(null)

    const onSubmit = async (data: ReservationFormValues) => {
        try {
            const response = await fetch('/api/reservations', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if(response.ok){
                setMessages('Votre réservation a été enregistrée avec succè')
                reset()
            }else{
                setMessages(result.error || 'Une erreur est survenue lors de la réservation')
            }
        }catch(error: unknown){
            console.error(error)
            setMessages('Une erreur est survenue lors de la réservation')
        }
    }

  return (
    <form className="w-full p-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-4xl mb-4 uppercase font-black">Réservation</h2>

        {messages && <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{messages}</p>}

        <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                Prénom
            </label>
            <input {...register('firstName')} type="text" id="firstName" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.firstName && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Nom
            </label>
            <input {...register('lastName')} type="text" id="lastName" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.lastName && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                E-mail
            </label>
            <input {...register('email')} type="email" id="email" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.email && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Téléphone
            </label>
            <input {...register('phone')} type="tel" id="phone" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.phone && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="numPeople" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de personnes
            </label>
            <input {...register('numPeople')} type="number" id="numPeople" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.numPeople && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.numPeople.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="reservationDate" className="block text-gray-700 text-sm font-bold mb-2">
                Date de réservation
            </label>
            <input {...register('reservationDate')} type="date" id="reservationDate" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700" />
            {errors.reservationDate && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.reservationDate.message}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="arrivalTime" className="block text-gray-700 text-sm font-bold mb-2">
                Heure
            </label>
            <select {...register('arrivalTime')} id="arrivalTime" className="shadow-md border rounded-md w-full py-2 px-3 text-gray-700">
                <option value="">Sélectionner une heure</option>
                {['12:00','12:30','13:00','13:30','14:00','14:30','19:00','19:30','20:00','20:30','21:00'].map((time) =>(
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            {errors.arrivalTime && <p className="text-red-500 bg-red-100 p-3 rounded-md my-2">{errors.arrivalTime.message}</p>}
        </div>

        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none">Réserver</button>
    </form>
  )
}
