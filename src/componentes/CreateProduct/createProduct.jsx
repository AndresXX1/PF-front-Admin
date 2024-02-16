import * as React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import './create.css';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { newHotel } from '../../redux/Action/action';

export const formContext = React.createContext();

export default function NewService() {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const dispatch = useDispatch();

  const styles = {
    autocomplete: {
      width: '40%',
      marginBottom: '10px',
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
      },
      '& .MuiOutlinedInput-input': {
        color: '#000',
      },
      backgroundColor: 'white',
    },
  };

  const { register, formState: { errors }, watch, reset, setValue, handleSubmit } = useForm();

  const seasons = [
    { value: 'Verano', label: 'Verano' },
    { value: 'Invierno', label: 'Invierno' },
    { value: 'Primavera', label: 'Primavera' },
    { value: 'Otoño', label: 'Otoño' }
  ];

  const locations = [
    'El Bolsón, Provincia de Río Negro',
    'Villa Pehuenia, Provincia de Neuquén',
    // Otras ubicaciones...
  ];

  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const paragraphRef = React.useRef();

  React.useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: "ds4blfuip",
        uploadPreset: "ml_default"
      }, function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Imagen subida exitosamente:", result.info.secure_url);
          setImages(prevImages => [...prevImages, result.info.secure_url]);
          paragraphRef.current.textContent = `Imágenes subidas: ${images.length + 1}`;
        } else {
          console.error("Error al subir la imagen:", error);
        }
      });
    }
  }, []);

  const onSubmit = (data) => {
    const seasonParser = data.season.map(item => item.value);
    const dataForSubmit = {
      ...data,
      season: seasonParser
    };
    dispatch(newHotel(dataForSubmit));
    reset();
    setImages([]);
    paragraphRef.current.textContent = `Imágenes subidas: ${images.length}`;
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, null);
    });
    setOpen(true);
  };

  const handleKeyPressPr = (event) => {
    if (!/[0-9]/.test(event.key) || event.target.value.length >= 6) {
      event.preventDefault();
    }
  };

  const handleKeyPressRooms = (event) => {
    if (!/[0-9]/.test(event.key) || event.target.value.length >= 2) {
      event.preventDefault();
    }
  };

  const selectedSeasons = watch('season', []);

  const handleSeasonChange = (selectedOptions) => {
    setValue('season', selectedOptions);
  };

  return (
    <div className="viewport">
      <div className="container">
        <h3>Formulario de alta de servicios de hospedaje:</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Indique las estaciones del año idóneas para el alquiler de este servicio de hospedaje:</label>
          <br />
          <Select
            isMulti
            options={seasons}
            {...register('season', { required: true })}
            value={selectedSeasons}
            onChange={handleSeasonChange}
            placeholder="Selecciona las estaciones"
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: 'black'
              }),
              control: (provided, state) => ({
                ...provided,
                width: '40%'
              }),
              menu: (provided, state) => ({
                ...provided,
                width: '40%'
              })
            }}
          />
          <br />
          {errors.season?.type === 'required' && <p className="error">**Campo requerido**</p>}
          <br />

          <label>Título de la publicación:</label>
          <br />
          <input type='text' {...register('name', { required: true, maxlength: 50 })}></input>
          <br />
          {errors.name?.type === 'required' && <p className="error">Ingrese un título para su publicación</p>}
          <br />

          <label>Indique la localidad donde se ubica el servicio a publicar:</label>
          <br />
          <Autocomplete
            {...register('location', { required: true })}
            options={locations}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            style={styles.autocomplete}
          />
          <br />
          {errors.location?.type === 'required' && <p className="error">**Campo requerido**</p>}
          <br />

          <label>Cantidad de habitaciones disponibles:</label>
          <br />
          <input type='number' min='1' max='99' onKeyDown={handleKeyPressRooms} {...register('rooms', { required: true })}></input>
          <br />
          {errors.rooms?.type === 'required' && <p className="error">**Campo requerido**</p>}
          <br />

          <label>Precio por noche (en pesos):</label>
          <br />
          <input type='number' min='1' max='999999' onKeyDown={handleKeyPressPr} {...register('price', { required: true })}></input>
          <br />
          {errors.price?.type === 'required' && <p className="error">**Campo requerido**</p>}
          <br />

          <label>Descripción del servicio:</label>
          <br />
          <textarea rows="6" cols="40" {...register('description', { required: true })}></textarea>
          <br />
          {errors.description?.type === 'required' && <p className="error">**Campo requerido**</p>}
          <br />

          <label>Imagenes del servicio:</label>
          <br />
          <button type="button" onClick={() => widgetRef.current.open()}>Subir Imagen</button>
          <p ref={paragraphRef}></p>
          <br />

          <button type="submit">Crear servicio</button>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="¡El hospedaje ha sido creado exitosamente!"
        action={(
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        )}
      />
    </div>
  );
}