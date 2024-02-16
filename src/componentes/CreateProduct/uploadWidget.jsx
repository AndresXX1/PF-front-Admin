import { useEffect, useRef, useState, useContext } from 'react';
import { formContext } from './createProduct';

const UploadWidget = () => {
    const [images, setImages] = useState([]);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const paragraphRef = useRef();
    const { setValue } = useContext(formContext);

    useEffect(() => {
        // Inicializa Cloudinary si no está presente
        if (!window.cloudinary) {
            const script = document.createElement('script');
            script.src = 'http://widget.cloudinary.com/v2.0/global/all.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                cloudinaryRef.current = window.cloudinary;
                initializeWidget();
            };
        } else {
            cloudinaryRef.current = window.cloudinary;
            initializeWidget();
        }
    }, []);

    const initializeWidget = () => {
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "ds4blfuip",
            uploadPreset: "ml_default"
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                console.log("Imagen subida exitosamente:", result.info.secure_url);
                setImages([...images, result.info.secure_url]);
                console.log('Estas son las url de las imagenes:', images);
                setValue('images', images);
                paragraphRef.current.textContent = `Imágenes subidas: ${images.length}`;
            } else {
                console.error("Error al subir la imagen:", error);
            }
        });
    };

    return (
        <>
            <button style={{ marginLeft: '80px' }} onClick={(event) => {
                event.preventDefault();
                widgetRef.current.open();
            }}>
                Subir imágenes
            </button>
            <br />
            <br />
            <p ref={paragraphRef} style={{ marginLeft: '60px', color: 'black' }}>Imágenes subidas: {images.length}</p>
        </>
    );
};

export default UploadWidget;