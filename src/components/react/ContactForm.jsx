// src/components/ContactForm.jsx
import React, { useState } from 'react';

// Función para simular el "delay" de Netlify Forms y evitar bots
// Adaptada de la lógica Netlify Forms standard
const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};

const ContactForm = ({ buttonHtml }) => {
    // Definir estados: 'initial', 'submitting', 'success', 'error'
    const [estado, setEstado] = useState('initial');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        mensaje: ''
    });

    // Función para manejar el cambio en los inputs (necesario en React)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función principal de envío
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstado('submitting');

        try {
            // Envío con el método required por Netlify para formularios AJAX
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({
                    "form-name": "ContactoClub", // DEBE COINCIDIR con el name del formulario "oculto"
                    ...formData,
                }),
            });

            if (response.ok) {
                setEstado('success');
            } else {
                setEstado('error');
            }

        } catch (error) {
            console.error('Error al enviar:', error);
            setEstado('error');
        }
    };

    // -----------------------------------------------------
    // Renderizado del Mensaje de Éxito (Reemplazo del Formulario)
    // -----------------------------------------------------
    if (estado === 'success') {
        return (
            <div className=" p-6 rounded-lg border-2 border-club-yellow transition duration-500 text-center">
                <h2 className="text-victoriano-lightyellow text-3xl font-extralight text-club-blue mb-4">¡Mensaje Enviado!</h2>
                <p className="text-victoriano-yellow mb-6 font-light">Agradecemos tu interés. El club responderá a tu consulta lo antes posible.</p>

                {/* Botón para resetear, usando tu estilo de botón (aunque sea HTML puro) */}
                <div className=' flex justify-center'>
                <button
                    onClick={() => setEstado('initial')}
                    className="  
                        relative
                        px-5
                        py-2
                        text-2xl
                        transition-all
                        duration-300
                        font-club
                        h-14
                        win-w-[12rem]
                        items-center
                        flex
                        justify-center
                        m-4
                        overflow-hidden
                        group

                        -skew-x-12
                        hover:cursor-pointer
                       bg-transparent
        border-2 border-victoriano-lightyellow 
        text-victoriano-lightyellow            
        hover:text-victoriano-blue
        hover:bg-victoriano-lightyellow"
                >
                    Enviar Otro Mensaje
                </button>
                </div>
            </div>
        );
    }

    // -----------------------------------------------------
    // Renderizado del Formulario
    // -----------------------------------------------------
    return (
        <form
            name="ContactoClub"
            method="POST"
            onSubmit={handleSubmit}
            className="p-6 rounded-lg"
        >
            {/* Campo oculto CLAVE para que Netlify active el endpoint */}
            <input type="hidden" name="form-name" value="ContactoClub" />

            {/* Error de Envío */}
            {estado === 'error' && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md font-body">
                    Hubo un error al enviar el formulario. Por favor, revisa tus datos e inténtalo de nuevo.
                </div>
            )}

            {/* Campos del Formulario */}
            <div className="mb-4 text-gray-100 font-sans">
                <label htmlFor="nombre" className="block text-sm font-semibold text-victoriano-yellow mb-1 font-body">Nombre Completo <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-club-yellow focus:border-club-yellow transition duration-200"
                />
            </div>

            <div className="mb-4 text-gray-100 font-sans">
                <label htmlFor="email" className="block text-sm font-semibold text-victoriano-yellow mb-1 font-body">Email <span className="text-red-500">*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-club-yellow focus:border-club-yellow transition duration-200"
                />
            </div>

            <div className="mb-4 text-gray-100 font-sans">
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-victoriano-yellow mb-1 font-body">WhatsApp (Opcional)</label>
                <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-club-yellow focus:border-club-yellow transition duration-200"
                    placeholder="Ej. 600123456"
                // pattern="[0-9]{9}" // Validar 9 dígitos, pero puede ser restrictivo internacionalmente.
                />
            </div>

            <div className="mb-6 text-gray-100  font-sans">
                <label htmlFor="mensaje" className="block text-sm font-semibold text-victoriano-yellow mb-1 font-body">Tu Consulta <span className="text-red-500">*</span></label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-club-yellow focus:border-club-yellow transition duration-200"
                ></textarea>
            </div>

            {/* Botón de Envío */}
            <div className='justify-items-end'>
                <button
                    type="submit"
                    disabled={estado === 'submitting'}
                    // Clases del botón replicadas aquí:
                    className="
                        relative
                        px-5
                        py-2
                        text-2xl
                        transition-all
                        duration-300
                        font-club
                        h-14
                        win-w-[12rem]
                        items-center
                        flex
                        justify-center
                        m-4
                        overflow-hidden
                        group

                        -skew-x-12
                        hover:cursor-pointer
                        text-victoriano-blue
                        bg-victoriano-lightyellow
                                hover:bg-victoriano-blue
                                hover:text-victoriano-lightyellow
                                border-2 border-victoriano-lightyellow "
                >
                    {estado === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </div>

        </form>
    );
};

export default ContactForm;